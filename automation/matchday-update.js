#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const core = require('./matchday-core');

const ROOT = path.join(__dirname, '..');
const FIXTURES_PATH = path.join(ROOT, 'src/data/fixtures.js');
const STANDINGS_PATH = path.join(ROOT, 'src/data/standings.js');
const SQUAD_PATH = path.join(ROOT, 'src/data/squad.js');
const STATE_PATH = path.join(__dirname, 'matchday-state.json');
const API_KEY = process.env.ANTHROPIC_API_KEY;
if (!API_KEY) throw new Error('ANTHROPIC_API_KEY is required');

const COMPETITIONS = {
  'Premier League': 'eng.1',
  'Carabao Cup': 'eng.league_cup',
  'Emirates FA Cup': 'eng.fa',
  Friendly: 'club.friendly',
};

function ymd(iso) { return iso.slice(0, 10).replaceAll('-', ''); }
function compactEvent(event) {
  const competition = event.competitions && event.competitions[0];
  return {
    id: event.id,
    date: event.date,
    status: event.status,
    competitors: competition && competition.competitors,
    details: competition && competition.details,
  };
}

async function espnJson(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`ESPN ${response.status}: ${url}`);
  return response.json();
}

function isTottenhamEvent(event, opponent) {
  const teams = event.competitions?.[0]?.competitors?.map(c => c.team?.displayName || '') || [];
  return teams.some(t => /Tottenham Hotspur/i.test(t)) && teams.some(t => t.toLowerCase().includes(opponent.split(' ')[0].toLowerCase()));
}

async function findFinalEvent(fixture) {
  const slug = COMPETITIONS[fixture.competition] || (fixture.section === 'CUPS' ? 'eng.league_cup' : null);
  if (!slug) return null;
  const data = await espnJson(`https://site.api.espn.com/apis/site/v2/sports/soccer/${slug}/scoreboard?dates=${ymd(fixture.date)}`);
  const event = (data.events || []).find(e => isTottenhamEvent(e, fixture.opponent));
  if (!event || event.status?.type?.completed !== true) return null;
  const summary = await espnJson(`https://site.api.espn.com/apis/site/v2/sports/soccer/${slug}/summary?event=${event.id}`);
  let standings = null;
  if (fixture.competition === 'Premier League') {
    standings = await espnJson('https://site.api.espn.com/apis/v2/sports/soccer/eng.1/standings?season=2026');
  }
  return { event: compactEvent(event), summary, standings };
}

async function askClaude(fixture, evidence, currentStandings, currentSquad) {
  const prompt = `Reconcile one completed Tottenham match for a fan dashboard. Use ONLY the supplied ESPN structured evidence. Never infer a player appearance, goal, assist, injury, score or table number that is absent. Return JSON only.

Fixture expected: ${JSON.stringify(fixture)}
Evidence: ${JSON.stringify(evidence)}
Current standings.js: ${currentStandings}
Current squad.js: ${currentSquad}

Required shape:
{"verified":true,"reason":"","result":{"spurs":0,"opponent":0,"home":true,"dateLabel":"28 Aug","homeCode":"TOT","awayCode":"NEW","scorers":"Name; Name ×2"},"standings":[{"team":"Tottenham Hotspur","w":0,"d":0,"l":0,"gf":0,"ga":0,"gd":0,"pts":0}],"players":[{"name":"Full name","appearance":1,"goals":0,"assists":0}],"injuryNotes":["verified post-match injury or suspension note"],"sourceEventId":"..."}

Rules: verified=false if the event is not final, teams do not match, or evidence conflicts. For Premier League, standings must contain all 20 clubs from evidence; for cups/friendlies return []. Include only Tottenham players explicitly present in lineups/statistics. appearance is 1 or 0 for this match. Use Tottenham-perspective score. Do not include transfer rumours.`;
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': API_KEY, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: 6000, messages: [{ role: 'user', content: prompt }] }),
  });
  if (!response.ok) throw new Error(`Claude API ${response.status}: ${await response.text()}`);
  const body = await response.json();
  const text = body.content.map(x => x.text || '').join('').replace(/```json|```/g, '').trim();
  return JSON.parse(text);
}

function existingArray(source, name) {
  const match = source.match(new RegExp(`export const ${name} = \\[([\\s\\S]*?)\\s*\\];`));
  if (!match) return [];
  return [...match[1].matchAll(/\{([^{}]+)\}/g)].map(m => {
    const o = {};
    for (const pair of m[1].matchAll(/(\w+):(?:\"([^\"]*)\"|(\d+))/g)) o[pair[1]] = pair[2] ?? Number(pair[3]);
    return o;
  });
}

function validate(reconciliation, fixture, evidence) {
  if (!reconciliation.verified) return false;
  const r = reconciliation.result;
  if (!r || !Number.isInteger(r.spurs) || !Number.isInteger(r.opponent) || r.spurs < 0 || r.opponent < 0) return false;
  if (fixture.competition === 'Premier League' && reconciliation.standings.length !== 20) return false;
  if (String(reconciliation.sourceEventId) !== String(evidence.event.id)) return false;
  return reconciliation.players.every(p => [0, 1].includes(p.appearance) && Number.isInteger(p.goals) && Number.isInteger(p.assists));
}

(async () => {
  const state = core.readState(STATE_PATH);
  const fixtureSource = fs.readFileSync(FIXTURES_PATH, 'utf8');
  const due = core.dueFixtures(fixtureSource, state);
  if (!due.length) return console.log('No fixture has reached kickoff + 2 hours.');

  for (const fixture of due) {
    const evidence = await findFinalEvent(fixture);
    if (!evidence) { console.log(`Pending final evidence: ${fixture.opponent}`); continue; }
    const standingsSource = fs.readFileSync(STANDINGS_PATH, 'utf8');
    const squadSource = fs.readFileSync(SQUAD_PATH, 'utf8');
    const result = await askClaude(fixture, evidence, standingsSource, squadSource);
    if (!validate(result, fixture, evidence)) { console.log(`Reconciliation refused: ${fixture.opponent} — ${result.reason || 'invalid data'}`); continue; }

    let nextFixtures = fs.readFileSync(FIXTURES_PATH, 'utf8');
    nextFixtures = core.applyFixtureScore(nextFixtures, fixture, result.result);
    fs.writeFileSync(FIXTURES_PATH, nextFixtures);

    let nextStandings = standingsSource;
    if (result.standings.length === 20) nextStandings = core.replaceExportedArray(nextStandings, 'STANDINGS', core.renderStandings(result.standings));
    let last5 = existingArray(nextStandings, 'LAST5');
    const score = `${result.result.spurs}-${result.result.opponent}`;
    const outcome = result.result.spurs > result.result.opponent ? 'W' : result.result.spurs < result.result.opponent ? 'L' : 'D';
    last5 = last5.filter(row => !(
      row.date === result.result.dateLabel &&
      row.home === result.result.homeCode &&
      row.away === result.result.awayCode
    ));
    last5.unshift({ date: result.result.dateLabel, home: result.result.homeCode, away: result.result.awayCode, score, r: outcome, scorer: result.result.scorers || '' });
    nextStandings = core.replaceExportedArray(nextStandings, 'LAST5', core.renderLastFive(last5));
    const scorers = existingArray(nextStandings, 'SCORERS');
    for (const p of result.players) {
      let row = scorers.find(s => s.name === p.name);
      if (!row) { row = { name: p.name, g: 0, a: 0, apps: 0 }; scorers.push(row); }
      row.g += p.goals; row.a += p.assists; row.apps += p.appearance;
    }
    nextStandings = core.replaceExportedArray(nextStandings, 'SCORERS', core.renderScorers(scorers));
    fs.writeFileSync(STANDINGS_PATH, nextStandings);
    fs.writeFileSync(SQUAD_PATH, core.updateSquad(squadSource, result.players));

    state.processed = [...new Set([...(state.processed || []), core.fixtureKey(fixture)])];
    state.lastProcessed = { fixture: core.fixtureKey(fixture), eventId: result.sourceEventId, at: new Date().toISOString(), injuryNotes: result.injuryNotes || [] };
    fs.writeFileSync(STATE_PATH, `${JSON.stringify(state, null, 2)}\n`);
    console.log(`Updated completed match: ${fixture.opponent} ${score}`);
  }
})().catch(error => { console.error(error); process.exit(1); });
