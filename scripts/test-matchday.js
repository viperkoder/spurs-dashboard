const assert = require('assert');
const core = require('../automation/matchday-core');
const { validateStandings } = require('../automation/league-table-update');

const fixtures = `export const PREMIER_LEAGUE_SCHEDULE = [
  {mw:1, opponent:"Brentford", venue:"A", date:"2026-08-22T17:30:00"},
];`;

// August is BST: 17:30 UK kickoff is 16:30 UTC; eligibility begins 18:30 UTC.
assert.equal(core.ukLocalTimeMs('2026-08-22T17:30:00'), Date.parse('2026-08-22T16:30:00Z'));
assert.equal(core.ukLocalTimeMs('2026-08-29T16:30:00Z'), Date.parse('2026-08-29T16:30:00Z'));
assert.equal(core.dueFixtures(fixtures, { processed: [] }, new Date('2026-08-22T18:29:59Z')).length, 0);
assert.equal(core.dueFixtures(fixtures, { processed: [] }, new Date('2026-08-22T18:30:00Z')).length, 1);
const due = core.dueFixtures(fixtures, { processed: [] }, new Date('2026-08-22T18:30:00Z'))[0];
assert.equal(core.dueFixtures(fixtures, { processed: [core.fixtureKey(due)] }, new Date('2026-08-22T18:30:00Z')).length, 0);
const cupFixtures = `export const CUPS = [
  {comp:"Carabao Cup", opponent:"Charlton Athletic", venue:"H", date:"2026-08-26T18:45:00Z", score:null},
];`;
const cupDue = core.dueFixtures(cupFixtures, { processed: [] }, new Date('2026-08-26T21:00:00Z'))[0];
assert.match(core.applyFixtureScore(cupFixtures, cupDue, { spurs: 2, opponent: 1 }), /score:"2-1"/);
assert.equal(core.dueFixtures(cupFixtures.replace('score:null', 'score:null,eliminated:true'), { processed: [] }, new Date('2026-08-26T21:00:00Z')).length, 0);

const standings = core.renderStandings([{ team: 'Tottenham Hotspur', w: 1, d: 0, l: 0, gf: 2, ga: 1, gd: 1, pts: 3 }]);
assert.match(standings[0], /isSpurs:true/);
assert.match(core.replaceExportedArray('export const SCORERS = [];', 'SCORERS', ['  {name:"M. Tel",g:1,a:0,apps:1},']), /M\. Tel/);

const squad = 'export const SQUAD = [\n  {name:"M. Tel", pos:"LW", apps:0, g:0},\n];';
assert.match(core.updateSquad(squad, [{ name: 'Mathys Tel', appearance: 1, goals: 2 }]), /apps:1, g:2/);

const fs = require('fs');
const vm = require('vm');
const seasonStatsSource = fs.readFileSync(require('path').join(__dirname, '../src/data/seasonStats.js'), 'utf8');
const seasonContext = { Map };
vm.runInNewContext(`${seasonStatsSource.replace(/^export\s+/gm, '')}\nthis.__season={LEAGUE_MATCHES,getLeagueSummary,getPlayerUsage,withLeagueResults};`, seasonContext);
const currentMatches = seasonContext.__season.LEAGUE_MATCHES;
currentMatches.forEach(core.validateLeagueMatch);
assert.equal(seasonContext.__season.getPlayerUsage(currentMatches).reduce((sum,p)=>sum+p.minutes,0),currentMatches.length*990);
const liveUsage = seasonContext.__season.getPlayerUsage(currentMatches);
liveUsage.forEach(player => {
  assert.equal(player.apps, player.starts + player.subApps);
  assert.equal(player.apps, player.w + player.d + player.l);
});
assert.equal(currentMatches.reduce((sum,match)=>sum+match.appearances.filter(p=>p.started).length,0),currentMatches.length*11);
assert.equal(seasonContext.__season.getLeagueSummary(currentMatches).played,currentMatches.length);
// Re-ingesting a real audited match must replace it, never append or count it
// twice. Verify both a legitimate missing-match backfill and an unchanged rerun.
const latest = currentMatches[currentMatches.length-1];
if (latest) {
  const withoutLatest = core.replaceExportedArray(seasonStatsSource, 'LEAGUE_MATCHES', [JSON.stringify(currentMatches.slice(0,-1)).slice(1,-1)]);
  const backfilled = core.upsertLeagueMatch(withoutLatest,latest);
  assert.deepEqual(core.getLeagueMatches(backfilled),core.getLeagueMatches(seasonStatsSource));
  assert.equal(core.upsertLeagueMatch(backfilled,latest),backfilled);
}
// Keep the original audited three-match regression sample stable as the
// live season advances; synthetic rollover tests must not append MD4 twice.
const matches = currentMatches.slice(0,3);
const usage = seasonContext.__season.getPlayerUsage(matches);
assert.equal(matches.length, 3);
assert.deepEqual(JSON.parse(JSON.stringify(seasonContext.__season.getLeagueSummary(matches))), { played: 3, w: 0, d: 1, l: 2, points: 1 });
assert.equal(matches.reduce((sum, match) => sum + match.appearances.filter(p => p.started).length, 0), 33);
assert.equal(matches.reduce((sum, match) => sum + match.appearances.reduce((mins, p) => mins + p.off - p.on, 0), 0), 2970);
assert.equal(usage.length, 22);
usage.forEach(player => assert.equal(player.apps, player.starts + player.subApps));
assert.deepEqual(JSON.parse(JSON.stringify(usage.find(player => player.player === 'Antonín Kinsky'))), { player: 'Antonín Kinsky', apps: 3, starts: 3, subApps: 0, minutes: 270, w: 0, d: 1, l: 2 });
for (const match of matches) for (const unused of match.unused) {
  const expectedApps = matches.filter(candidate => candidate.appearances.some(p => p.player === unused)).length;
  assert.equal(usage.find(player => player.player === unused)?.apps || 0, expectedApps);
}

const synthetic = {
  mw:4, opponent:'Everton', venue:'H', date:'2026-09-12T17:30:00+01:00',
  score:{spurs:2,opponent:0}, sourceEventId:'synthetic', sources:['test'],
  appearances:[...matches[2].appearances.map(p => ({...p}))], unused:[...matches[2].unused],
};
core.validateLeagueMatch(synthetic);
const rolled = seasonContext.__season.getPlayerUsage([...matches, synthetic]);
const rolledKinsky = rolled.find(player => player.player === 'Antonín Kinsky');
assert.deepEqual(JSON.parse(JSON.stringify(rolledKinsky)), { player: 'Antonín Kinsky', apps: 4, starts: 4, subApps: 0, minutes: 360, w: 1, d: 1, l: 2 });
assert.equal(seasonContext.__season.withLeagueResults([{mw:4}], [...matches, synthetic])[0].score, '2-0');
const regressionSource = core.replaceExportedArray(seasonStatsSource, 'LEAGUE_MATCHES', [JSON.stringify(matches).slice(1,-1)]);
const upserted = core.getLeagueMatches(core.upsertLeagueMatch(regressionSource, synthetic));
assert.equal(upserted.length, 4);
assert.equal(upserted.find(match => match.mw === 4).score.spurs, 2);

const evidenceRoster = Array.from({length:11}, (_,index) => ({
  athlete:{displayName:`Starter ${index + 1}`}, starter:true, subbedIn:false,
}));
evidenceRoster.push({athlete:{displayName:'Sub One'},starter:false,subbedIn:true});
evidenceRoster.push({athlete:{displayName:'Unused One'},starter:false,subbedIn:false});
const extracted = core.leagueMatchFromEvidence(
  {mw:4,opponent:'Everton',venue:'H',date:'2026-09-12T17:30:00+01:00',competition:'Premier League'},
  {
    event:{id:'synthetic-event',competitors:[
      {team:{displayName:'Tottenham Hotspur'},score:'2'},
      {team:{displayName:'Everton'},score:'0'},
    ]},
    summary:{
      rosters:[{team:{displayName:'Tottenham Hotspur'},roster:evidenceRoster}],
      commentary:[{
        text:'Substitution, Tottenham Hotspur. Sub One replaces Starter 11.',
        time:{value:3600},
        play:{participants:[{athlete:{displayName:'Sub One'}},{athlete:{displayName:'Starter 11'}}]},
      }],
    },
  }
);
assert.equal(extracted.appearances.find(p => p.player === 'Starter 11').off, 60);
assert.equal(extracted.appearances.find(p => p.player === 'Sub One').on, 60);
assert.deepEqual(extracted.unused, ['Unused One']);

const clubs = Array.from({ length: 20 }, (_, i) => ({
  team: i === 19 ? 'Tottenham Hotspur' : `Club ${i + 1}`,
  rank: i + 1, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0,
}));
const tableSource = `export const STANDINGS = [\n${clubs.map(c => `  {team:"${c.team}"},`).join('\n')}\n];`;
assert.doesNotThrow(() => validateStandings(clubs, tableSource));
assert.throws(() => validateStandings(clubs.slice(0, 19), tableSource), /20 clubs/);
// ---------------------------------------------------------------------------
// Season Stats V2.5 — automated goal-event ingestion (Parts 2/3/4/5/6/7).
// ---------------------------------------------------------------------------

// A simple, self-contained 11-starters-only roster for the goal-ingestion
// tests below — no subs, so tests that don't care about substitutions don't
// also need to supply a matching substitution commentary event.
const goalTestRoster = Array.from({ length: 11 }, (_, index) => ({
  athlete: { displayName: `Starter ${index + 1}` }, starter: true, subbedIn: false,
}));

function syntheticEvidence({ commentary, spursScore = 1, opponentScore = 0, roster = goalTestRoster } = {}) {
  return {
    event: {
      id: 'v25-synthetic',
      competitors: [
        { team: { displayName: 'Tottenham Hotspur' }, score: String(spursScore) },
        { team: { displayName: 'Everton' }, score: String(opponentScore) },
      ],
    },
    summary: {
      rosters: [{ team: { displayName: 'Tottenham Hotspur' }, roster }],
      commentary,
    },
  };
}

// PART 7 — genuine 0-0: commentary present, no goal-prefixed entries, score
// 0-0 -> a verified zero, not an absent/unknown result.
{
  const evidence = syntheticEvidence({ commentary: [], spursScore: 0, opponentScore: 0 });
  const match = core.leagueMatchFromEvidence(
    { mw: 4, opponent: 'Everton', venue: 'H', date: '2026-09-12T17:30:00+01:00', competition: 'Premier League' },
    evidence
  );
  assert.equal(match.goalReconciliation.status, 'reconciled');
  assert.deepEqual(match.goals, []);
}

// PART 7 — valid goal with assist + a stoppage-time goal (45+2), unresolved
// left implicit via exact-count cross-check.
//
// V2.5 CORRECTION (independent review, 18 September 2026) — ROOT CAUSE:
// "45+2'" means regulation minute 45, stoppage 2, period H1. The original
// implementation derived `minute` from the raw elapsed-clock seconds
// (2820s = 47 minutes) for EVERY goal including stoppage-time ones, so a
// 45+2 goal was normalized to `{ minute: 47, period: 'H2' }` — silently
// crossing the half-time boundary. That is what this assertion block would
// have observed before the fix (documented here, not re-derived, since the
// buggy code path no longer exists to run): `match.goals[1]` would equal
// `{ minute: 47, stoppage: 2, period: 'H2', ... }`. The fix makes the
// source's own "45+2" notation authoritative for the base regulation
// minute — never re-derived from clock seconds — so it now resolves
// correctly below.
{
  const commentary = [
    {
      text: 'Goal!  Tottenham Hotspur 1, Everton 0. Starter 9 right footed shot. Assisted by Starter 8.',
      time: { value: 2820 }, // 47th minute
      play: { participants: [{ athlete: { displayName: 'Starter 9' } }, { athlete: { displayName: 'Starter 8' } }] },
    },
    {
      text: 'Goal!  Tottenham Hotspur 2, Everton 0. Sub One header (45+2\').',
      time: { value: 2820 }, // clock reads 47 minutes elapsed — must NOT drive minute/period
      play: { participants: [{ athlete: { displayName: 'Sub One' } }] },
    },
  ];
  const evidence = syntheticEvidence({ commentary, spursScore: 2, opponentScore: 0 });
  const match = core.leagueMatchFromEvidence(
    { mw: 4, opponent: 'Everton', venue: 'H', date: '2026-09-12T17:30:00+01:00', competition: 'Premier League' },
    evidence
  );
  assert.equal(match.goalReconciliation.status, 'reconciled');
  assert.equal(match.goals.length, 2);
  assert.equal(match.goals[0].scorer, 'Starter 9');
  assert.equal(match.goals[0].assist, 'Starter 8');
  // AFTER the fix: 45+2 -> minute 45, stoppage 2, period H1 (never 47/H2).
  assert.equal(match.goals[1].minute, 45, '45+2 must resolve to regulation minute 45, not 47');
  assert.equal(match.goals[1].stoppage, 2);
  assert.equal(match.goals[1].period, 'H1', '45+2 must stay period H1 — this is the exact blocker independent review found');
}

// PART 7 — second-half added time (90+N) must remain minute 90 / H2, and
// the 45+N fix above must not have disturbed it.
{
  const commentary = [{
    text: 'Goal!  Tottenham Hotspur 1, Everton 0. Starter 9 tap-in (90+6\').',
    time: { value: 5760 }, // 96 minutes elapsed clock
    play: { participants: [{ athlete: { displayName: 'Starter 9' } }] },
  }];
  const evidence = syntheticEvidence({ commentary, spursScore: 1, opponentScore: 0 });
  const match = core.leagueMatchFromEvidence(
    { mw: 4, opponent: 'Everton', venue: 'H', date: '2026-09-12T17:30:00+01:00', competition: 'Premier League' },
    evidence
  );
  assert.equal(match.goals[0].minute, 90);
  assert.equal(match.goals[0].stoppage, 6);
  assert.equal(match.goals[0].period, 'H2');
}

// PART 7/HALF-TIME ATTRIBUTION — the actual downstream consequence of the
// blocker: a genuine half-time substitution (Player A off at 45, Player B
// on at 45) must attribute a 45+2 goal to Player A's (pre-half-time) unit,
// never Player B's (post-half-time) unit. Run through the real pipeline —
// automated extraction (leagueMatchFromEvidence) feeding the shared
// on-pitch/goal-attribution machinery every combination module consumes
// (proven once here; Defensive/Midfield/Attacking all call the same
// getPlayersOnPitchAtGoal/resolveHalfTimeBoundary functions in onPitch.js,
// which this packet did not touch — only the automation's minute/period
// computation was wrong).
{
  const loadModules = (relativePaths, exportNames) => {
    const source = relativePaths
      .map(p => fs.readFileSync(require('path').join(__dirname, p), 'utf8'))
      .join('\n');
    const stripped = source
      .replace(/^import\s+.*?from\s+['"][^'"]+['"]\s*;?\s*$/gm, '')
      .replace(/^export\s+/gm, '');
    const context = { Map, Set, Number, Array };
    vm.runInNewContext(`${stripped}\nthis.__mod={${exportNames.join(',')}};`, context);
    return context.__mod;
  };
  const { getPlayersOnPitchAtGoal } = loadModules(
    ['../src/data/onPitch.js'],
    ['getPlayersOnPitchAtGoal']
  );

  const halfTimeRoster = [
    ...Array.from({ length: 10 }, (_, i) => ({ athlete: { displayName: `Ever Present ${i + 1}` }, starter: true, subbedIn: false })),
    { athlete: { displayName: 'Player A' }, starter: true, subbedIn: false }, // off at half-time
    { athlete: { displayName: 'Player B' }, starter: false, subbedIn: true }, // on at half-time
  ];
  const commentary = [
    {
      text: 'Substitution, Tottenham Hotspur. Player B replaces Player A.',
      time: { value: 2700 }, // 45th minute
      play: { participants: [{ athlete: { displayName: 'Player B' } }, { athlete: { displayName: 'Player A' } }] },
    },
    {
      text: 'Goal!  Tottenham Hotspur 1, Everton 0. Ever Present 1 header (45+2\'). Assisted by Ever Present 2.',
      time: { value: 2820 },
      play: { participants: [{ athlete: { displayName: 'Ever Present 1' } }, { athlete: { displayName: 'Ever Present 2' } }] },
    },
  ];
  const evidence = syntheticEvidence({ commentary, spursScore: 1, opponentScore: 0, roster: halfTimeRoster });
  const match = core.leagueMatchFromEvidence(
    { mw: 4, opponent: 'Everton', venue: 'H', date: '2026-09-12T17:30:00+01:00', competition: 'Premier League' },
    evidence
  );
  assert.equal(match.goalReconciliation.status, 'reconciled');
  const goal = match.goals[0];
  assert.equal(goal.minute, 45);
  assert.equal(goal.period, 'H1');
  const { onPitch, ambiguous } = getPlayersOnPitchAtGoal(match, goal);
  assert.deepEqual(ambiguous, [], 'the half-time boundary must resolve deterministically, not fall back to ambiguous');
  assert.ok(onPitch.includes('Player A'), 'Player A (off exactly at half-time) played the whole first half and must be credited for the 45+2 goal');
  assert.ok(!onPitch.includes('Player B'), 'Player B (on exactly at half-time) played no part of the first half and must NOT be credited for the 45+2 goal');
}

// PART 7 — goal with no assist: text has no "Assist" keyword -> assist null,
// never guessed from the second participant.
{
  const commentary = [{
    text: 'Goal!  Tottenham Hotspur 1, Everton 0. Starter 9 tap-in.',
    time: { value: 1800 },
    play: { participants: [{ athlete: { displayName: 'Starter 9' } }] },
  }];
  const evidence = syntheticEvidence({ commentary, spursScore: 1, opponentScore: 0 });
  const match = core.leagueMatchFromEvidence(
    { mw: 4, opponent: 'Everton', venue: 'H', date: '2026-09-12T17:30:00+01:00', competition: 'Premier League' },
    evidence
  );
  assert.equal(match.goals[0].assist, null);
}

// PART 3/7 — invariant under test: UNKNOWN MUST NOT BECOME ZERO.
// (a) goal source unavailable: no commentary field at all.
{
  const evidence = syntheticEvidence({ commentary: undefined, spursScore: 0, opponentScore: 0 });
  delete evidence.summary.commentary;
  const match = core.leagueMatchFromEvidence(
    { mw: 4, opponent: 'Everton', venue: 'H', date: '2026-09-12T17:30:00+01:00', competition: 'Premier League' },
    evidence
  );
  assert.equal(match.goalReconciliation.status, 'unavailable');
  assert.equal(match.goals, undefined, 'unavailable evidence must never become goals: []');
}
// (b) incomplete/malformed evidence: extracted count does not match the
// authoritative final score.
{
  const commentary = [{
    text: 'Goal!  Tottenham Hotspur 1, Everton 0. Starter 9 tap-in.',
    time: { value: 1800 },
    play: { participants: [{ athlete: { displayName: 'Starter 9' } }] },
  }];
  const evidence = syntheticEvidence({ commentary, spursScore: 2, opponentScore: 0 });
  const match = core.leagueMatchFromEvidence(
    { mw: 4, opponent: 'Everton', venue: 'H', date: '2026-09-12T17:30:00+01:00', competition: 'Premier League' },
    evidence
  );
  assert.equal(match.goalReconciliation.status, 'unresolved');
  assert.equal(match.goals, undefined, 'unresolved evidence must never become goals: []');
}
// (c) malformed upstream event: a goal-prefixed entry naming no recognized team.
{
  const commentary = [{
    text: 'Goal!  Somewhere else entirely.',
    time: { value: 1800 },
    play: { participants: [] },
  }];
  const evidence = syntheticEvidence({ commentary, spursScore: 1, opponentScore: 0 });
  const match = core.leagueMatchFromEvidence(
    { mw: 4, opponent: 'Everton', venue: 'H', date: '2026-09-12T17:30:00+01:00', competition: 'Premier League' },
    evidence
  );
  assert.equal(match.goalReconciliation.status, 'unresolved');
}

// PART 4 — idempotency: running the automated goal ingestion twice against
// the same completed match must not duplicate or drift, AND must never let
// automated re-extraction overwrite already-reviewed evidence for a match
// that has since been manually reviewed (Part 8 protection).
{
  const commentary = [{
    text: 'Goal!  Tottenham Hotspur 1, Everton 0. Starter 9 tap-in. Assisted by Starter 8.',
    time: { value: 1800 },
    play: { participants: [{ athlete: { displayName: 'Starter 9' } }, { athlete: { displayName: 'Starter 8' } }] },
  }];
  const evidence = syntheticEvidence({ commentary, spursScore: 1, opponentScore: 0 });
  const fixture = { mw: 4, opponent: 'Everton', venue: 'H', date: '2026-09-12T17:30:00+01:00', competition: 'Premier League' };
  const firstMatch = core.leagueMatchFromEvidence(fixture, evidence);
  const base = core.replaceExportedArray(seasonStatsSource, 'LEAGUE_MATCHES', [JSON.stringify(matches).slice(1, -1)]);
  const afterFirst = core.upsertLeagueMatch(base, firstMatch);
  const secondMatch = core.leagueMatchFromEvidence(fixture, evidence);
  const afterSecond = core.upsertLeagueMatch(afterFirst, secondMatch);
  assert.equal(afterSecond, afterFirst, 're-running the same completed match must be byte-identical (idempotent)');
  assert.deepEqual(core.getLeagueMatches(afterFirst).find(m => m.mw === 4).goals, firstMatch.goals);

  // Now simulate a human review that overrides the automated goals (e.g. a
  // more precise manually-sourced record) — a third automated re-run must
  // NOT clobber it.
  const reviewed = core.getLeagueMatches(afterFirst);
  reviewed.find(m => m.mw === 4).goals = [{ team: 'spurs', scorer: 'Manually Reviewed Player', assist: null, minute: 30, stoppage: null, period: 'H1', order: null, source: 'https://example.com/reviewed' }];
  const reviewedSource = core.replaceExportedArray(seasonStatsSource, 'LEAGUE_MATCHES', [JSON.stringify(reviewed).slice(1, -1)]);
  const thirdMatch = core.leagueMatchFromEvidence(fixture, evidence);
  const afterThird = core.upsertLeagueMatch(reviewedSource, thirdMatch);
  assert.deepEqual(core.getLeagueMatches(afterThird).find(m => m.mw === 4).goals, reviewed.find(m => m.mw === 4).goals, 'reviewed goal evidence must never be silently overwritten by automated extraction');
}

// PART 5 — unknown-player detection: warns without dropping the appearance.
{
  const squadSnippet = 'export const SQUAD = [\n  {name:"Starter 1", pos:"CB", apps:0, g:0},\n];';
  const unknown = core.detectUnknownPlayers([{ player: 'Starter 1' }, { player: 'Completely Unknown Player' }], squadSnippet);
  assert.deepEqual(unknown, ['Completely Unknown Player']);
  assert.deepEqual(core.detectUnknownPlayers([], squadSnippet), []);
}

// PART 6 — next-match readiness: one normal Matchday reconciliation (with a
// Spurs goal, an opponent goal, starters, subs) flows through automatically
// to Player Usage AND to the generic Season Stats data the combination
// modules consume, with no module-specific code changes. Does not hard-code
// any particular real result — this is entirely synthetic.
{
  const commentary = [
    {
      text: 'Substitution, Tottenham Hotspur. Sub One replaces Starter 11.',
      time: { value: 3600 },
      play: { participants: [{ athlete: { displayName: 'Sub One' } }, { athlete: { displayName: 'Starter 11' } }] },
    },
    {
      text: 'Goal!  Tottenham Hotspur 1, Everton 1. Starter 9 tap-in. Assisted by Starter 8.',
      time: { value: 1800 },
      play: { participants: [{ athlete: { displayName: 'Starter 9' } }, { athlete: { displayName: 'Starter 8' } }] },
    },
    {
      text: 'Goal!  Everton 1, Tottenham Hotspur 1. Opposition Player finish.',
      time: { value: 900 },
      play: { participants: [{ athlete: { displayName: 'Opposition Player' } }] },
    },
  ];
  const evidence = syntheticEvidence({ commentary, spursScore: 1, opponentScore: 1, roster: evidenceRoster });
  const fixture = { mw: 4, opponent: 'Everton', venue: 'H', date: '2026-09-12T17:30:00+01:00', competition: 'Premier League' };
  const nextMatch = core.leagueMatchFromEvidence(fixture, evidence);
  assert.equal(nextMatch.goalReconciliation.status, 'reconciled');
  const base = core.replaceExportedArray(seasonStatsSource, 'LEAGUE_MATCHES', [JSON.stringify(matches).slice(1, -1)]);
  const nextSource = core.upsertLeagueMatch(base, nextMatch);
  const nextMatches = core.getLeagueMatches(nextSource);
  assert.equal(nextMatches.length, 4);
  const inserted = nextMatches.find(m => m.mw === 4);
  assert.equal(inserted.goals.length, 2);
  // Generic Player Usage must include the new match without any edit.
  const nextUsage = seasonContext.__season.getPlayerUsage(nextMatches);
  const starter9Usage = nextUsage.find(p => p.player === 'Starter 9');
  assert.equal(starter9Usage.apps, matches.filter(m => m.appearances.some(p => p.player === 'Starter 9')).length + 1);
}

console.log('matchday tests passed');
