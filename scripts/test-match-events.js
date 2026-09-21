const assert = require('assert');
const fs = require('fs');
const vm = require('vm');
const path = require('path');

// src/data files are ESM (bundled for the browser by build.js) — loaded the
// same way scripts/test-onpitch.js and scripts/test-matchday.js load them.
function loadEsModule(relativePath, exportNames) {
  const source = fs.readFileSync(path.join(__dirname, relativePath), 'utf8');
  const context = { Map, Set, Number, Array };
  vm.runInNewContext(`${source.replace(/^export\s+/gm, '')}\nthis.__mod={${exportNames.join(',')}};`, context);
  return context.__mod;
}

const matchEvents = loadEsModule('../src/data/matchEvents.js', [
  'validateGoalEvents', 'getGoalEvents', 'splitGoalsByTeam',
]);
const onPitch = loadEsModule('../src/data/onPitch.js', [
  'getPlayersOnPitchAtGoal',
]);
const season = loadEsModule('../src/data/seasonStats.js', ['LEAGUE_MATCHES']);
const realMatches = season.LEAGUE_MATCHES;

// --- Every match's `goals` field, present or not, is structurally valid ---
// (validateGoalEvents treats an absent `goals` field as valid — "not yet
// reviewed" is a data-completeness question for the checklist, not a
// structural error — so this only checks shape, never presence.)
for (const match of realMatches) {
  const { valid, issues } = matchEvents.validateGoalEvents(match);
  assert.ok(valid, `MW${match.mw} goals should be structurally valid: ${issues.join('; ')}`);
}

// --- Reviewed vs pending matches are distinguished explicitly, not just
//     structurally valid — this is what stops a genuinely-unreviewed match
//     from silently being read as "goalless" ------------------------------
{
  const reviewedMws = [1, 2, 3, 4];
  const pendingMws = [5]; // MW5 (Aston Villa): goal-commentary evidence
                          // unavailable at reconciliation time — left
                          // unresolved on purpose, never fabricated.
  for (const mw of reviewedMws) {
    const match = realMatches.find(m => m.mw === mw);
    assert.ok(match, `MW${mw} should exist in LEAGUE_MATCHES`);
    assert.ok(Array.isArray(match.goals), `MW${mw} should have been reviewed (goals field present)`);
  }
  for (const mw of pendingMws) {
    const match = realMatches.find(m => m.mw === mw);
    assert.ok(match, `MW${mw} should exist in LEAGUE_MATCHES`);
    assert.equal(match.goals, undefined, `MW${mw} goal evidence is not yet reliably reconciled — must stay unresolved (undefined), never fabricated or backfilled as empty`);
  }
  // Any match beyond the known reviewed/pending sets above needs this test
  // updated deliberately, not silently assumed goalless or reviewed.
  const knownMws = new Set([...reviewedMws, ...pendingMws]);
  for (const match of realMatches) {
    assert.ok(knownMws.has(match.mw), `MW${match.mw} is not accounted for in this test's reviewed/pending lists — update the lists before trusting this suite`);
  }
}

// --- Genuinely goalless matches are represented as an empty array, not
//     merely "not yet backfilled" ------------------------------------------
{
  const forest = realMatches.find(m => m.mw === 3);
  const everton = realMatches.find(m => m.mw === 4);
  assert.deepEqual(matchEvents.getGoalEvents(forest), []);
  assert.deepEqual(matchEvents.getGoalEvents(everton), []);
}

// --- MW1 Brentford 3-0: three sourced opponent goals -----------------------
{
  const match = realMatches.find(m => m.mw === 1);
  const goals = matchEvents.getGoalEvents(match);
  assert.equal(goals.length, 3);
  assert.ok(goals.every(g => g.team === 'opponent'));
  assert.ok(goals.every(g => g.source));
  const { spurs, opponent } = matchEvents.splitGoalsByTeam(match);
  assert.equal(spurs.length, 0);
  assert.equal(opponent.length, 3);

  // The Kayode goal is stoppage time with no exact digit in the source —
  // must be represented honestly (stoppage: null), never guessed.
  const kayode = goals.find(g => g.scorer === 'Michael Kayode');
  assert.ok(kayode);
  assert.equal(kayode.minute, 45);
  assert.equal(kayode.stoppage, null);
  assert.equal(kayode.period, 'H1');
  assert.equal(kayode.assist, null, 'ambiguous multi-contributor buildup must not guess a single assist');

  // End-to-end: real goal data composes with the V2.1 on-pitch foundation.
  // At minute 12 the full Brentford-facing Spurs XI was on the pitch (no
  // subs yet); this only checks composition works, not who "should" have
  // stopped it.
  const earlyGoal = goals.find(g => g.minute === 12);
  const { onPitch: onPitchAtEarlyGoal, ambiguous, issues } = onPitch.getPlayersOnPitchAtGoal(match, earlyGoal);
  assert.equal(onPitchAtEarlyGoal.length, 11);
  assert.deepEqual(ambiguous, []);
  assert.equal(issues.length, 0);

  // The 12' and 33' goals precede any substitution in this match, so both
  // are unambiguous.
  [12, 33].forEach(minute => {
    const goal = goals.find(g => g.minute === minute);
    const result = onPitch.getPlayersOnPitchAtGoal(match, goal);
    assert.deepEqual(result.ambiguous, [], `MW1 minute ${minute} should not be ambiguous`);
  });

  // Resolved finding (Season Stats V2.2 Defensive Combinations V1, 18
  // September 2026): Kayode's goal is reported at minute 45 ("45+",
  // first-half stoppage, period H1), coinciding with two half-time
  // substitutions also recorded at minute 45 (Gallagher/Bergvall off,
  // Fernandes/Bentancur on). onPitch.js now resolves this deterministically
  // using the goal's explicit `period: 'H1'` together with the project's own
  // documented minute convention (a half-time substitution takes effect at
  // the start of the second half) — not an invented event order. See
  // scripts/test-onpitch.js's half-time-boundary tests for the general case;
  // this is the real record that surfaced it.
  const kayodeGoal = goals.find(g => g.scorer === 'Michael Kayode');
  const kayodeResult = onPitch.getPlayersOnPitchAtGoal(match, kayodeGoal);
  assert.deepEqual(kayodeResult.ambiguous, [], 'the half-time coincidence now resolves deterministically rather than staying ambiguous');
  assert.ok(kayodeResult.onPitch.includes('Conor Gallagher'), 'played the entire first half, so was on the pitch for a first-half goal');
  assert.ok(kayodeResult.onPitch.includes('Lucas Bergvall'), 'played the entire first half, so was on the pitch for a first-half goal');
  assert.ok(!kayodeResult.onPitch.includes('Mateus Fernandes'), 'a half-time introduction plays no part of the first half');
  assert.ok(!kayodeResult.onPitch.includes('Rodrigo Bentancur'), 'a half-time introduction plays no part of the first half');
  assert.equal(kayodeResult.issues.length, 0);
}

// --- MW2 Newcastle 0-2: two sourced opponent goals -------------------------
{
  const match = realMatches.find(m => m.mw === 2);
  const goals = matchEvents.getGoalEvents(match);
  assert.equal(goals.length, 2);
  assert.ok(goals.every(g => g.team === 'opponent'));
  const minutes = goals.map(g => g.minute).sort((a, b) => a - b);
  assert.deepEqual(minutes, [62, 72]);

  // Neither goal minute (62, 72) coincides with a Spurs substitution minute
  // in this match (68, 75), so attribution should be unambiguous.
  goals.forEach(goal => {
    const result = onPitch.getPlayersOnPitchAtGoal(match, goal);
    assert.deepEqual(result.ambiguous, [], `MW2 minute ${goal.minute} should not be ambiguous`);
    assert.equal(result.onPitch.length, 11);
  });

  // The 72' goal came after Sandro Tonali left at 75'? No — Tonali is still
  // on at 72 (he leaves at 75), so he must be on the pitch for it.
  const secondGoal = goals.find(g => g.minute === 72);
  const { onPitch: rosterAt72 } = onPitch.getPlayersOnPitchAtGoal(match, secondGoal);
  assert.ok(rosterAt72.includes('Sandro Tonali'));
}

// --- Malformed goals data is rejected, not silently accepted --------------
{
  const badTeam = { mw: 950, appearances: [], goals: [{ team: 'home', minute: 10, source: 'x' }] };
  assert.equal(matchEvents.validateGoalEvents(badTeam).valid, false);

  const missingMinute = { mw: 951, appearances: [], goals: [{ team: 'spurs', source: 'x' }] };
  assert.equal(matchEvents.validateGoalEvents(missingMinute).valid, false);

  const missingSource = { mw: 952, appearances: [], goals: [{ team: 'spurs', minute: 10 }] };
  assert.equal(matchEvents.validateGoalEvents(missingSource).valid, false);

  const badPeriod = { mw: 953, appearances: [], goals: [{ team: 'spurs', minute: 10, source: 'x', period: 'first-half' }] };
  assert.equal(matchEvents.validateGoalEvents(badPeriod).valid, false);

  const nonArrayGoals = { mw: 954, appearances: [], goals: 'not-an-array' };
  assert.equal(matchEvents.validateGoalEvents(nonArrayGoals).valid, false);
  assert.deepEqual(matchEvents.getGoalEvents(nonArrayGoals), []);

  // A match with no `goals` field at all is structurally valid (it simply
  // hasn't been reviewed) but getGoalEvents must still degrade safely.
  const unreviewed = { mw: 955, appearances: [] };
  assert.equal(matchEvents.validateGoalEvents(unreviewed).valid, true);
  assert.deepEqual(matchEvents.getGoalEvents(unreviewed), []);

  assert.doesNotThrow(() => matchEvents.getGoalEvents(null));
  assert.doesNotThrow(() => matchEvents.getGoalEvents(undefined));
  assert.doesNotThrow(() => matchEvents.validateGoalEvents(null));
}

// --- A well-formed goal with real ordering evidence is accepted -----------
{
  const withOrder = {
    mw: 956,
    appearances: [],
    goals: [{ team: 'spurs', scorer: 'Player A', assist: null, minute: 70, stoppage: null, period: 'H2', order: 4200, source: 'https://example.com' }],
  };
  assert.equal(matchEvents.validateGoalEvents(withOrder).valid, true);
}

console.log('match-events tests passed');
