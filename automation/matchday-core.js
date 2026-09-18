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
        eliminated: /eliminated:true/.test(body),
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
    return !f.eliminated && Number.isFinite(kickoff) &&
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

// Season Stats V2.5 — minimal role/squad reconciliation (Part 5).
//
// Not a transfer-management system and not an inference engine: it only
// answers "does this appearance's player have a squad.js entry to match
// against?" using the same last-name matching `updateSquad` already uses
// to credit apps/goals. A player with no match is NOT dropped from the
// match's `appearances` (historical truth is untouched) — this only
// produces a warning so a human can add a match-specific combination-module
// override (the same reviewed pattern already used for Richarlison and
// Mikey Moore), never an automatic classification.
function detectUnknownPlayers(appearances, squadSource) {
  return (appearances || [])
    .map(p => p.player)
    .filter(Boolean)
    .filter(name => {
      const last = name.trim().split(/\s+/).pop().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return !new RegExp(`\\{name:\"[^\"]*${last}[^\"]*\"`, 'i').test(squadSource || '');
    });
}

function resultFromEvidence(evidence) {
  const competitors = evidence.event?.competitors || [];
  const spurs = competitors.find(c => /Tottenham Hotspur/i.test(c.team?.displayName || ''));
  const opponent = competitors.find(c => !/Tottenham Hotspur/i.test(c.team?.displayName || ''));
  if (!spurs || !opponent) throw new Error('Tottenham result missing from structured evidence');
  return { spurs: Number(spurs.score), opponent: Number(opponent.score) };
}

// Season Stats V2.5 — automated goal-event extraction (18 September 2026).
//
// Reuses the exact same evidence stream the already-proven substitution
// extraction reads (`evidence.summary.commentary`), never a new source.
// Never invents a scorer, assist, minute, stoppage digit, period or team —
// every field comes only from matched text/structured sub-fields, exactly
// like the existing substitution parser.
//
// Safety design (the "unknown must never become zero" invariant): the
// extracted goal count, split by team, is cross-checked against the
// independently-reliable authoritative final score (already used and
// trusted by `resultFromEvidence`). Only an EXACT match for both teams
// counts as `status: 'reconciled'` — anything else is `'unresolved'`
// (evidence present but doesn't safely add up) or `'unavailable'`
// (the evidence stream itself is missing, e.g. ESPN has pruned the
// match's commentary/play-by-play after enough time has passed — observed
// directly against a real ~4-week-old fixture during this packet's audit).
// Neither case ever produces an empty `goals: []` — that shape is reserved
// for a genuinely reconciled scoreless match, where the evidence stream
// was present and simply contained no goal events, consistent with a 0-0
// final score.
function extractGoalEvents(evidence, finalScore) {
  const commentary = evidence.summary?.commentary;
  if (!Array.isArray(commentary)) {
    return {
      status: 'unavailable',
      goals: null,
      reason: 'evidence.summary.commentary is missing or not an array — no play-by-play evidence available to extract goal events from (ESPN appears to prune this field for older fixtures).',
    };
  }

  const teamName = name => (/Tottenham Hotspur/i.test(name || '') ? 'spurs' : 'opponent');
  const sourceUrl = `https://www.espn.com/soccer/match/_/gameId/${evidence.event?.id}`;
  const goals = [];
  const problems = [];

  const goalEvents = commentary.filter(event => /^\s*Goal!/i.test(event?.text || ''));
  for (const event of goalEvents) {
    const text = event.text || '';
    // ESPN's "Goal!" commentary convention names the SCORING team first
    // ("Goal!  <scoring team> <score>, <other team> <score>. ..."), and the
    // final-score recap that follows means both team names are often
    // present in the same line -- so whichever name occurs EARLIEST in the
    // text is the scorer, never just "whichever team name appears".
    const withPosition = (evidence.event?.competitors || [])
      .map(c => ({ competitor: c, index: text.indexOf(c.team?.displayName || '\uffff') }))
      .filter(entry => entry.index >= 0)
      .sort((a, b) => a.index - b.index);
    const scoringTeam = withPosition[0]?.competitor;
    if (!scoringTeam) {
      problems.push(`Could not identify which team scored from: "${text}"`);
      continue;
    }
    const rawSeconds = event.time?.value ?? event.play?.clock?.value;
    const minuteRaw = Number(rawSeconds) / 60;
    if (!Number.isFinite(minuteRaw)) {
      problems.push(`No usable minute/clock value for: "${text}"`);
      continue;
    }
    const minute = Math.min(90, Math.ceil(minuteRaw));
    const stoppageMatch = text.match(/(?:^|\D)(\d{2,3})\s*\+\s*(\d+)/);
    const scorer = event.play?.participants?.[0]?.athlete?.displayName || null;
    const assistParticipant = event.play?.participants?.[1]?.athlete?.displayName || null;
    const assist = /assist/i.test(text) ? assistParticipant : null;
    goals.push({
      team: teamName(scoringTeam.team?.displayName),
      scorer,
      assist,
      minute,
      stoppage: stoppageMatch ? Number(stoppageMatch[2]) : null,
      period: minute <= 45 ? 'H1' : 'H2',
      order: null,
      source: sourceUrl,
    });
  }

  if (problems.length > 0) {
    return { status: 'unresolved', goals: null, reason: `Goal evidence present but not safely parseable: ${problems.join('; ')}` };
  }

  const extractedSpurs = goals.filter(g => g.team === 'spurs').length;
  const extractedOpponent = goals.filter(g => g.team === 'opponent').length;
  if (extractedSpurs !== finalScore.spurs || extractedOpponent !== finalScore.opponent) {
    return {
      status: 'unresolved',
      goals: null,
      reason: `Extracted goal events (spurs ${extractedSpurs}, opponent ${extractedOpponent}) do not match the authoritative final score (spurs ${finalScore.spurs}, opponent ${finalScore.opponent}) — evidence is incomplete or ambiguous, not counted as verified.`,
    };
  }

  return { status: 'reconciled', goals, reason: null };
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

  const score = resultFromEvidence(evidence);
  const goalReconciliation = extractGoalEvents(evidence, score);

  const match = {
    mw: fixture.mw,
    opponent: fixture.opponent,
    venue: fixture.venue,
    date: fixture.date,
    score,
    sourceEventId: String(evidence.event.id),
    sources: [`https://www.espn.com/soccer/match/_/gameId/${evidence.event.id}`],
    appearances,
    unused: roster.filter(p => !p.starter && !p.subbedIn).map(p => p.athlete?.displayName).filter(Boolean),
  };
  // Only an exact, cross-checked reconciliation ever attaches `goals` here.
  // 'unavailable'/'unresolved' leave it undefined — the existing manual
  // review workflow (see seasonStats.js) remains the source of truth for
  // that match until reviewed, exactly as it does today.
  if (goalReconciliation.status === 'reconciled') {
    validateGoalEvidence(goalReconciliation.goals);
    match.goals = goalReconciliation.goals;
  }
  // Transient, never persisted: upsertLeagueMatch strips this before
  // writing seasonStats.js. Carried here only so the caller (the Matchday
  // orchestration script) can log/surface the reconciliation outcome per
  // Part 3's "surface the reconciliation problem" requirement.
  match.goalReconciliation = { status: goalReconciliation.status, reason: goalReconciliation.reason };
  validateLeagueMatch(match);
  return match;
}

// Mirrors src/data/matchEvents.js's validateGoalEvents structural rules.
// Duplicated deliberately (small, self-contained) rather than requiring an
// ES module from this CommonJS automation script — the same reason
// automation/ has never imported src/data directly (see test-matchday.js's
// source-text + vm loading pattern for why). Keep both in sync by hand if
// the schema ever changes.
function validateGoalEvidence(goals) {
  if (!Array.isArray(goals)) throw new Error('goals is present but not an array');
  goals.forEach((goal, index) => {
    const label = `goals[${index}]`;
    if (!goal || typeof goal !== 'object') throw new Error(`${label}: missing or not an object`);
    if (goal.team !== 'spurs' && goal.team !== 'opponent') throw new Error(`${label}: team must be 'spurs' or 'opponent'`);
    if (!Number.isFinite(goal.minute) || goal.minute < 0) throw new Error(`${label}: minute is not a valid number`);
    if (goal.stoppage !== null && !Number.isFinite(goal.stoppage)) throw new Error(`${label}: stoppage must be a finite number or null`);
    if (goal.period !== 'H1' && goal.period !== 'H2') throw new Error(`${label}: period must be 'H1' or 'H2'`);
    if (goal.order !== null && !Number.isFinite(goal.order)) throw new Error(`${label}: order must be a finite number or null`);
    if (!goal.source) throw new Error(`${label}: missing source`);
  });
  return true;
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

// Diffs automated goal evidence against already-reviewed evidence for the
// same match, for Part 8's reconciliation report — never used to decide
// what gets written; purely descriptive so a discrepancy can be surfaced
// without ever silently overwriting reviewed data.
function compareGoalEvidence(reviewedGoals, automatedGoals) {
  if (!Array.isArray(reviewedGoals) || !Array.isArray(automatedGoals)) return null;
  const key = g => `${g.team}|${g.scorer || '?'}|${g.assist || '?'}|${g.minute}|${g.stoppage ?? '?'}`;
  const reviewedKeys = reviewedGoals.map(key).sort();
  const automatedKeys = automatedGoals.map(key).sort();
  const identical = JSON.stringify(reviewedKeys) === JSON.stringify(automatedKeys);
  return { identical, reviewed: reviewedKeys, automated: automatedKeys };
}

function upsertLeagueMatch(source, incoming) {
  // Strip the transient reconciliation status before any validation or
  // persistence — it is caller-facing metadata (see leagueMatchFromEvidence),
  // never part of the LEAGUE_MATCHES schema.
  const { goalReconciliation, ...record } = incoming;
  validateLeagueMatch(record);
  const matches = getLeagueMatches(source);
  const index = matches.findIndex(match => match.mw === record.mw);
  if (index >= 0) {
    // Never let automated goal evidence silently replace evidence that has
    // already been reviewed for this match (Part 8) — whether the existing
    // `goals` is a populated array (reviewed, goals found) or an empty
    // array (reviewed, genuinely scoreless). Only a match with NO `goals`
    // field yet (never reviewed) can receive automated evidence.
    const next = { ...record };
    if (matches[index].goals !== undefined) next.goals = matches[index].goals;
    matches[index] = next;
  } else {
    matches.push(record);
  }
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
  compareGoalEvidence,
  dueFixtures,
  extractGoalEvents,
  fixtureKey,
  calculatePlayerUsage,
  detectUnknownPlayers,
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
  validateGoalEvidence,
  validateLeagueMatch,
};
