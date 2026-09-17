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

// --- Every real match reviewed so far has a valid `goals` field -----------
for (const match of realMatches) {
  const { valid, issues } = matchEvents.validateGoalEvents(match);
  assert.ok(valid, `MW${match.mw} goals should be structurally valid: ${issues.join('; ')}`);
  assert.ok(Array.isArray(match.goals), `MW${match.mw} should have been reviewed (goals field present)`);
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

  // A genuine, honest discovery from real data: Kayode's goal is reported
  // at minute 45 ("45+", first-half stoppage), and Tottenham made two
  // half-time substitutions also recorded at minute 45 in the appearance
  // schema (Gallagher/Bergvall off, Fernandes/Bentancur on). Football
  // convention says a first-half stoppage-time goal necessarily precedes
  // half-time substitutions (which happen during the actual break) — but
  // the current on-pitch foundation has no period-aware resolution logic,
  // only minute equality, so it correctly reports this as ambiguous rather
  // than silently assuming either XI. This is documented in the checklist
  // as a candidate small enhancement for a later packet (resolve H1-minute-45
  // vs. HT-minute-45 using the `period` field), not fixed here.
  const kayodeGoal = goals.find(g => g.scorer === 'Michael Kayode');
  const kayodeResult = onPitch.getPlayersOnPitchAtGoal(match, kayodeGoal);
  assert.ok(kayodeResult.ambiguous.includes('Conor Gallagher'));
  assert.ok(kayodeResult.ambiguous.includes('Lucas Bergvall'));
  assert.ok(kayodeResult.ambiguous.includes('Mateus Fernandes'));
  assert.ok(kayodeResult.ambiguous.includes('Rodrigo Bentancur'));
  assert.ok(kayodeResult.issues.some(i => i.includes('ambiguous')));
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
