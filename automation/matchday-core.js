const fs = require('fs');

const MATCH_WINDOW_MS = 14 * 24 * 60 * 60 * 1000;
const AFTER_KICKOFF_MS = 2 * 60 * 60 * 1000;

function fixtureSections(source) {
  const names = ['PRESEASON', 'PREMIER_LEAGUE_SCHEDULE', 'CUPS'];
  return names.flatMap(name => {
    const match = source.match(new RegExp(`export const ${name} = \\[([\\s\\S]*?)\\n\\];`));
    if (!match) return [];
    return [...match[1].matchAll(/\{([^{}]+)\}/g)].map(row => {
      const body = row[1];
      const value = key => (body.match(new RegExp(`${key}:\"([^\"]*)\"`)) || [])[1];
      const mw = Number((body.match(/mw:(\d+)/) || [])[1]) || null;
      return {
        section: name === 'PREMIER_LEAGUE_SCHEDULE' ? 'PREMIER_LEAGUE' : name,
        mw,
        opponent: value('opponent'),
        date: value('date'),
        competition: value('comp') || (name === 'PREMIER_LEAGUE_SCHEDULE' ? 'Premier League' : name === 'PRESEASON' ? 'Friendly' : 'Cup'),
      };
    });
  });
}

function dueFixtures(source, state, now = new Date()) {
  const done = new Set(state.processed || []);
  const nowMs = now.getTime();
  return fixtureSections(source).filter(f => {
    const kickoff = ukLocalTimeMs(f.date);
    const key = fixtureKey(f);
    return Number.isFinite(kickoff) &&
      nowMs >= kickoff + AFTER_KICKOFF_MS &&
      nowMs - kickoff <= MATCH_WINDOW_MS &&
      !done.has(key);
  });
}

function ukLocalTimeMs(isoWithoutZone) {
  // Confirmed fixtures may carry an explicit UTC offset/Z so browsers,
  // GitHub Actions and Singapore viewers all count down to one instant.
  if (/[zZ]$|[+-]\d{2}:\d{2}$/.test(isoWithoutZone)) return Date.parse(isoWithoutZone);
  const match = isoWithoutZone.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/);
  if (!match) return NaN;
  const [, year, month, day, hour, minute, second] = match.map(Number);
  const provisional = Date.UTC(year, month - 1, day, hour, minute, second);
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date(provisional));
  const p = Object.fromEntries(parts.map(x => [x.type, x.value]));
  const represented = Date.UTC(Number(p.year), Number(p.month) - 1, Number(p.day), Number(p.hour), Number(p.minute), Number(p.second));
  return provisional - (represented - provisional);
}

function fixtureKey(fixture) {
  return `${fixture.date}|${fixture.opponent}|${fixture.competition}`;
}

function replaceExportedArray(source, name, rows) {
  const replacement = `export const ${name} = [\n${rows.join('\n')}\n];`;
  const re = new RegExp(`export const ${name} = \\[([\\s\\S]*?)\\s*\\];`);
  if (!re.test(source)) throw new Error(`Missing exported array: ${name}`);
  return source.replace(re, replacement);
}

function js(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

function applyFixtureScore(source, fixture, result) {
  const escapedOpponent = fixture.opponent.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const escapedDate = fixture.date.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`(\\{[^{}]*opponent:\"${escapedOpponent}\"[^{}]*date:\"${escapedDate}\"[^{}]*score:)(?:null|\"[^\"]*\")`);
  if (!re.test(source)) throw new Error(`Fixture row not found: ${fixture.opponent} ${fixture.date}`);
  return source.replace(re, `$1${js(`${result.spurs}-${result.opponent}`)}`);
}

function renderStandings(rows) {
  return rows.map((r, index) =>
    `  {pos:${index + 1},team:${js(r.team)},w:${r.w},d:${r.d},l:${r.l},gf:${r.gf},ga:${r.ga},gd:${r.gd},pts:${r.pts}${r.team === 'Tottenham Hotspur' ? ',isSpurs:true' : ''}},`
  );
}

function renderLastFive(rows) {
  return rows.slice(0, 5).map(r =>
    `  {date:${js(r.date)},home:${js(r.home)},away:${js(r.away)},score:${js(r.score)},r:${js(r.r)},scorer:${js(r.scorer || '')}},`
  );
}

function renderScorers(rows) {
  return rows.filter(r => r.g > 0 || r.a > 0).sort((a, b) => (b.g - a.g) || (b.a - a.a) || a.name.localeCompare(b.name)).map(r =>
    `  {name:${js(r.name)},g:${r.g},a:${r.a},apps:${r.apps}},`
  );
}

function updateSquad(source, players) {
  let next = source;
  for (const p of players) {
    const last = p.name.trim().split(/\s+/).pop().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`(\\{name:\"[^\"]*${last}[^\"]*\"[^{}]*?apps:)(\\d+)(,\\s*g:)(\\d+)`, 'i');
    const match = next.match(re);
    if (!match) continue;
    next = next.replace(re, (_, a, apps, g, goals) => `${a}${Number(apps) + Number(p.appearance || 0)}${g}${Number(goals) + Number(p.goals || 0)}`);
  }
  return next;
}

function resultFromEvidence(evidence) {
  const competitors = evidence.event?.competitors || [];
  const spurs = competitors.find(c => /Tottenham Hotspur/i.test(c.team?.displayName || ''));
  const opponent = competitors.find(c => !/Tottenham Hotspur/i.test(c.team?.displayName || ''));
  if (!spurs || !opponent) throw new Error('Tottenham result missing from structured evidence');
  return { spurs: Number(spurs.score), opponent: Number(opponent.score) };
}

function leagueMatchFromEvidence(fixture, evidence) {
  if (fixture.competition !== 'Premier League') return null;
  const roster = evidence.summary?.rosters?.find(r => /Tottenham Hotspur/i.test(r.team?.displayName || ''))?.roster;
  if (!Array.isArray(roster)) throw new Error('Tottenham roster missing from structured evidence');

  const appearances = roster.filter(p => p.starter || p.subbedIn).map(p => ({
    player: p.athlete?.displayName,
    started: !!p.starter,
    on: p.starter ? 0 : null,
    off: 90,
  }));
  const byName = new Map(appearances.map(p => [p.player, p]));
  const substitutionEvents = (evidence.summary?.commentary || []).filter(event =>
    /Substitution, Tottenham Hotspur/i.test(event.text || '') && event.play?.participants?.length >= 2
  );
  substitutionEvents.forEach(event => {
    const minute = Math.min(90, Math.ceil(Number(event.time?.value ?? event.play?.clock?.value) / 60));
    const incoming = event.play.participants[0]?.athlete?.displayName;
    const outgoing = event.play.participants[1]?.athlete?.displayName;
    if (!Number.isInteger(minute) || !byName.has(incoming) || !byName.has(outgoing)) {
      throw new Error(`Incomplete substitution evidence: ${event.text || 'unknown event'}`);
    }
    byName.get(incoming).on = minute;
    byName.get(outgoing).off = minute;
  });

  const match = {
    mw: fixture.mw,
    opponent: fixture.opponent,
    venue: fixture.venue,
    date: fixture.date,
    score: resultFromEvidence(evidence),
    sourceEventId: String(evidence.event.id),
    sources: [`https://www.espn.com/soccer/match/_/gameId/${evidence.event.id}`],
    appearances,
    unused: roster.filter(p => !p.starter && !p.subbedIn).map(p => p.athlete?.displayName).filter(Boolean),
  };
  validateLeagueMatch(match);
  return match;
}

function validateLeagueMatch(match) {
  if (!Number.isInteger(match.mw) || match.mw < 1 || match.mw > 38) throw new Error('Invalid Premier League matchweek');
  if (!Number.isInteger(match.score?.spurs) || !Number.isInteger(match.score?.opponent)) throw new Error('Invalid Premier League score');
  if (match.appearances.filter(p => p.started).length !== 11) throw new Error('Premier League match must have exactly 11 starters');
  const names = new Set();
  for (const p of match.appearances) {
    if (!p.player || names.has(p.player)) throw new Error(`Duplicate or missing player appearance: ${p.player || 'unknown'}`);
    names.add(p.player);
    if (!Number.isInteger(p.on) || !Number.isInteger(p.off) || p.on < 0 || p.off > 90 || p.off < p.on) {
      throw new Error(`Invalid minute range for ${p.player}`);
    }
    if (p.started !== (p.on === 0)) throw new Error(`Start/minute mismatch for ${p.player}`);
  }
  const totalMinutes = match.appearances.reduce((sum, p) => sum + p.off - p.on, 0);
  if (totalMinutes !== 990) throw new Error(`Premier League player minutes total ${totalMinutes}, expected 990`);
  if ((match.unused || []).some(name => names.has(name))) throw new Error('Unused substitute also counted as an appearance');
  return true;
}

function getLeagueMatches(source) {
  const match = source.match(/export const LEAGUE_MATCHES = (\[[\s\S]*?\n\]);/);
  if (!match) throw new Error('Missing LEAGUE_MATCHES array');
  return Function(`"use strict"; return (${match[1]});`)();
}

function renderLeagueMatches(matches) {
  return JSON.stringify(matches, null, 2).replace(/</g, '\\u003c');
}

function upsertLeagueMatch(source, incoming) {
  validateLeagueMatch(incoming);
  const matches = getLeagueMatches(source);
  const index = matches.findIndex(match => match.mw === incoming.mw);
  if (index >= 0) matches[index] = incoming;
  else matches.push(incoming);
  matches.sort((a, b) => a.mw - b.mw);
  const rendered = renderLeagueMatches(matches);
  return source.replace(/export const LEAGUE_MATCHES = \[[\s\S]*?\n\];/, `export const LEAGUE_MATCHES = ${rendered};`);
}

function calculatePlayerUsage(matches) {
  const players = new Map();
  for (const match of matches) {
    const outcome = match.score.spurs > match.score.opponent ? 'w' : match.score.spurs < match.score.opponent ? 'l' : 'd';
    for (const appearance of match.appearances) {
      const row = players.get(appearance.player) || { player: appearance.player, apps: 0, starts: 0, subApps: 0, minutes: 0, w: 0, d: 0, l: 0 };
      row.apps += 1;
      row.starts += appearance.started ? 1 : 0;
      row.subApps += appearance.started ? 0 : 1;
      row.minutes += appearance.off - appearance.on;
      row[outcome] += 1;
      players.set(appearance.player, row);
    }
  }
  return [...players.values()];
}

function readState(path) {
  if (!fs.existsSync(path)) return { processed: [] };
  return JSON.parse(fs.readFileSync(path, 'utf8'));
}

module.exports = {
  AFTER_KICKOFF_MS,
  applyFixtureScore,
  dueFixtures,
  fixtureKey,
  calculatePlayerUsage,
  getLeagueMatches,
  leagueMatchFromEvidence,
  readState,
  renderLastFive,
  renderScorers,
  renderStandings,
  replaceExportedArray,
  ukLocalTimeMs,
  updateSquad,
  upsertLeagueMatch,
  validateLeagueMatch,
};
