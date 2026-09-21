const assert = require('assert');
const fs = require('fs');
const vm = require('vm');
const path = require('path');

// Same concatenated-load pattern as test-defensive-combinations.js:
// midfieldInfluence.js imports from onPitch.js, matchEvents.js AND
// defensiveCombinations.js via real `import` statements, matching how
// build.js bundles src/.
function loadModules(relativePaths, exportNames) {
  const source = relativePaths.map(p => fs.readFileSync(path.join(__dirname, p), 'utf8')).join('\n');
  const stripped = source
    .replace(/^import\s+.*?from\s+['"][^'"]+['"]\s*;?\s*$/gm, '')
    .replace(/^export\s+/gm, '');
  const context = { Map, Set, Number, Array };
  vm.runInNewContext(`${stripped}\nthis.__mod={${exportNames.join(',')}};`, context);
  return context.__mod;
}

const mod = loadModules(
  ['../src/data/onPitch.js', '../src/data/matchEvents.js', '../src/data/defensiveCombinations.js', '../src/data/midfieldInfluence.js', '../src/data/seasonStats.js'],
  [
    'LEAGUE_MATCHES', 'isCentralMidfieldPlayer', 'getMatchMidfieldSpells',
    'resolveGoalCentralMidfieldCombination', 'getMidfieldUnitStats',
    'getMatchMidfieldDefensiveSpells', 'getMidfieldDefensiveCombinationStats',
    'SAMPLE_MINUTES_FLOOR', 'SAMPLE_MATCHES_FLOOR',
  ],
);
const realMatches = mod.LEAGUE_MATCHES;

function makeStarter(player, off = 90) {
  return { player, started: true, on: 0, off };
}
function makeSub(player, on, off = 90) {
  return { player, started: false, on, off };
}

// --- 1. Unchanged midfield unit for a full match (single spell) -----------
{
  const appearances = [
    makeStarter('Antonín Kinsky'),
    makeStarter('Marcos Senesi'), makeStarter('Jan Paul van Hecke'), makeStarter('Andy Robertson'), makeStarter('Pedro Porro'),
    makeStarter('Sandro Tonali'), makeStarter('Rodrigo Bentancur'),
    ...Array.from({ length: 4 }, (_, i) => makeStarter(`Fwd ${i + 1}`)),
  ];
  const match = { mw: 8001, appearances, unused: [], goals: [] };
  const spells = mod.getMatchMidfieldSpells(match);
  assert.equal(spells.length, 1, 'no central-midfield substitution should mean exactly one spell');
  assert.equal(spells[0].minutes, 90);
  assert.deepEqual(spells[0].players.slice().sort(), ['Rodrigo Bentancur', 'Sandro Tonali'].sort());
}

// --- 2. Midfield substitution splitting a spell (real MW4: Bentancur off/
//        Bergvall on at 63) -------------------------------------------------
{
  const mw4 = realMatches.find(m => m.mw === 4);
  assert.ok(mw4);
  const spells = mod.getMatchMidfieldSpells(mw4);
  assert.equal(spells.length, 2, 'MW4 has one central-midfield substitution (Bentancur -> Bergvall at 63), so exactly two spells');
  assert.equal(spells[0].start, 0);
  assert.equal(spells[0].end, 63);
  assert.equal(spells[0].minutes, 63);
  assert.ok(spells[0].players.includes('Rodrigo Bentancur'));
  assert.ok(!spells[0].players.includes('Lucas Bergvall'));
  assert.equal(spells[1].start, 63);
  assert.equal(spells[1].end, 90);
  assert.equal(spells[1].minutes, 27);
  assert.ok(spells[1].players.includes('Lucas Bergvall'));
  assert.ok(!spells[1].players.includes('Rodrigo Bentancur'));
  assert.equal(spells[0].minutes + spells[1].minutes, 90, 'spells must partition the full match');
}

// --- 3. Defensive substitution splitting a midfield+defence shared spell,
//        with the midfield unit itself unchanged (real MW1: Gray -> Udogie
//        at 86 is a defensive-only change; the midfield unit stays
//        Tonali+Bentancur across it) -----------------------------------------
{
  const mw1 = realMatches.find(m => m.mw === 1);
  const merged = mod.getMatchMidfieldDefensiveSpells(mw1);
  const touching86 = merged.filter(seg => seg.start === 86 || seg.end === 86);
  assert.ok(touching86.length === 2, 'the defensive substitution at minute 86 must still create a merged-segment boundary there');
  const before = merged.find(seg => seg.start === 45 && seg.end === 86);
  const after = merged.find(seg => seg.start === 86 && seg.end === 90);
  assert.ok(before && after, 'expected merged segments [45,86) and [86,90)');
  assert.deepEqual(before.bPlayers.slice().sort(), ['Rodrigo Bentancur', 'Sandro Tonali'].sort());
  assert.deepEqual(after.bPlayers.slice().sort(), ['Rodrigo Bentancur', 'Sandro Tonali'].sort(), 'midfield unit must be unchanged across the defensive-only substitution');
  assert.notEqual(before.aPlayers.slice().sort().join(','), after.aPlayers.slice().sort().join(','), 'defensive unit must differ across its own substitution boundary');
}

// --- 4. Simultaneous/shared interval calculation: a merged segment's minutes
//        equal the overlap of its two source spells, across the whole match -
{
  const mw2 = realMatches.find(m => m.mw === 2);
  const merged = mod.getMatchMidfieldDefensiveSpells(mw2);
  const totalMinutes = merged.reduce((sum, seg) => sum + seg.minutes, 0);
  assert.equal(totalMinutes, 90, 'merged midfield+defence segments must exactly partition the match');
  // MW2's defensive boundary (68) and midfield boundary (75) are both real
  // and distinct, so the merge must produce three segments, not two.
  assert.equal(merged.length, 3, 'two independent substitution minutes (68 defensive, 75 midfield) must yield three merged segments');
}

// --- 5. Clean-sheet minutes contribute with zero conceded, not excluded ----
{
  const { units } = mod.getMidfieldUnitStats(realMatches.filter(m => m.mw === 3 || m.mw === 4));
  assert.ok(units.length > 0);
  assert.ok(units.every(u => u.goalsConceded === 0), 'the two goalless matches must show zero goals conceded for every midfield unit');
  assert.equal(units.reduce((sum, u) => sum + u.minutes, 0), 180, 'two full goalless matches must contribute 180 combined minutes');

  const { combinations } = mod.getMidfieldDefensiveCombinationStats(realMatches.filter(m => m.mw === 3 || m.mw === 4));
  assert.ok(combinations.length > 0);
  assert.ok(combinations.every(c => c.goalsConceded === 0));
  assert.equal(combinations.reduce((sum, c) => sum + c.minutes, 0), 180);
}

// --- 6. A goal is attributed only to the midfield unit actually present
//        (real MW1 Kayode 45+ goal: Gallagher/Bergvall — departing exactly at
//        half time — are credited; Bentancur, entering exactly then, is not)
{
  const mw1 = realMatches.find(m => m.mw === 1);
  const kayodeGoal = mw1.goals.find(g => g.scorer === 'Michael Kayode');
  const resolution = mod.resolveGoalCentralMidfieldCombination(mw1, kayodeGoal);
  assert.equal(resolution.resolved, true, 'Kayode\'s 45+ goal must resolve for central midfield via the half-time boundary rule');
  assert.deepEqual(resolution.players.slice().sort(), ['Conor Gallagher', 'Lucas Bergvall', 'Sandro Tonali'].sort());
  assert.ok(!resolution.players.includes('Rodrigo Bentancur'), 'the incoming half-time substitute must not be retroactively credited with a first-half goal');

  // All three of MW1's goals (12', 33', 45') must land on this same unit —
  // none on the post-half-time Tonali+Bentancur unit.
  const { units } = mod.getMidfieldUnitStats([mw1]);
  const preHalfUnit = units.find(u => u.players.length === 3 && ['Conor Gallagher', 'Lucas Bergvall', 'Sandro Tonali'].every(p => u.players.includes(p)));
  const postHalfUnit = units.find(u => u.players.length === 2 && ['Rodrigo Bentancur', 'Sandro Tonali'].every(p => u.players.includes(p)));
  assert.ok(preHalfUnit && postHalfUnit);
  assert.equal(preHalfUnit.goalsConceded, 3);
  assert.equal(postHalfUnit.goalsConceded, 0);
}

// --- 7. Identical combinations aggregate independent of player ordering ----
// (real data: Bentancur+Tonali recur across all five matches to date; also
// proven synthetically with reversed appearance order. MW5's goals are
// unresolved — see test-match-events.js — so goalsConceded is unaffected
// by MW5 even though minutes/matches include it.)
{
  const { units } = mod.getMidfieldUnitStats(realMatches);
  const bentancurTonali = units.find(u => u.players.length === 2 && ['Rodrigo Bentancur', 'Sandro Tonali'].every(p => u.players.includes(p)));
  assert.ok(bentancurTonali, 'Bentancur+Tonali unit must exist and merge across matches regardless of player order within each spell');
  assert.equal(bentancurTonali.matches, 5);
  assert.equal(bentancurTonali.minutes, 274);
  assert.equal(bentancurTonali.goalsConceded, 2);
  assert.equal(bentancurTonali.smallSample, false, 'Bentancur+Tonali has now crossed both sample floors (270 minutes, 3 matches) — first midfield unit to do so');

  const matchA = { mw: 9001, appearances: [makeStarter('Sandro Tonali'), makeStarter('Rodrigo Bentancur'), ...Array.from({ length: 9 }, (_, i) => makeStarter(`Filler ${i}`))], unused: [], goals: [] };
  const matchB = { mw: 9002, appearances: [makeStarter('Rodrigo Bentancur'), makeStarter('Sandro Tonali'), ...Array.from({ length: 9 }, (_, i) => makeStarter(`Filler ${i}`))], unused: [], goals: [] };
  const { units: synthUnits } = mod.getMidfieldUnitStats([matchA, matchB]);
  const matching = synthUnits.filter(u => u.players.length === 2 && ['Sandro Tonali', 'Rodrigo Bentancur'].every(p => u.players.includes(p)));
  assert.equal(matching.length, 1, 'identical two-player set in different appearance order must be a single unit row');
  assert.equal(matching[0].minutes, 180);
  assert.equal(matching[0].matches, 2);
}

// --- 8. Match-scoped role override: Archie Gray (squad.js CM) is excluded
//        from central midfield in every real match he played, because he is
//        already resolved as defensive-outfield there ----------------------
{
  assert.equal(mod.isCentralMidfieldPlayer('Archie Gray', 1), false, 'Gray must not be double-counted as central midfield in MW1 (defensive override applies)');
  assert.equal(mod.isCentralMidfieldPlayer('Archie Gray', 2), false);
  assert.equal(mod.isCentralMidfieldPlayer('Archie Gray', 4), false);
  realMatches.forEach(match => {
    const spells = mod.getMatchMidfieldSpells(match);
    spells.forEach(spell => {
      assert.ok(!spell.players.includes('Archie Gray'), `Gray must never appear in a central-midfield spell (MW${match.mw})`);
    });
  });
  // A generic match-scoped override still works when evidenced: a synthetic
  // player recognized as central midfield only in the matchweek its
  // override lists.
  assert.equal(mod.isCentralMidfieldPlayer('Synthetic Player', 42), false, 'a player with no squad position and no override must never be treated as central midfield');
}

// --- 9. Malformed / incomplete evidence degrades safely, never throws ------
{
  assert.doesNotThrow(() => mod.getMidfieldUnitStats(null));
  assert.doesNotThrow(() => mod.getMidfieldUnitStats(undefined));
  assert.doesNotThrow(() => mod.getMidfieldUnitStats('not-an-array'));
  assert.deepEqual(mod.getMidfieldUnitStats(null).units, []);
  assert.deepEqual(mod.getMidfieldUnitStats(null).unresolvedGoals, []);
  assert.doesNotThrow(() => mod.getMidfieldDefensiveCombinationStats(null));
  assert.deepEqual(mod.getMidfieldDefensiveCombinationStats(null).combinations, []);

  const brokenMatches = [
    null,
    undefined,
    { mw: 9101 },
    { mw: 9102, appearances: 'not-an-array', goals: [] },
    { mw: 9103, appearances: [], goals: 'not-an-array' },
    { mw: 9104, appearances: [{ player: 'Ghost', started: false }], goals: [{ team: 'opponent' /* missing minute */ }] },
  ];
  let unitResult;
  let combinedResult;
  assert.doesNotThrow(() => { unitResult = mod.getMidfieldUnitStats(brokenMatches); });
  assert.doesNotThrow(() => { combinedResult = mod.getMidfieldDefensiveCombinationStats(brokenMatches); });
  assert.deepEqual(unitResult.units, []);
  assert.deepEqual(combinedResult.combinations, []);

  assert.doesNotThrow(() => mod.getMatchMidfieldSpells(null));
  assert.doesNotThrow(() => mod.getMatchMidfieldSpells(undefined));
  assert.deepEqual(mod.getMatchMidfieldSpells(null), []);
  assert.doesNotThrow(() => mod.getMatchMidfieldDefensiveSpells(null));
  assert.deepEqual(mod.getMatchMidfieldDefensiveSpells(null), []);
  assert.doesNotThrow(() => mod.resolveGoalCentralMidfieldCombination({ mw: 9105 }, { team: 'opponent' }));
}

// --- Cross-check: real dataset invariants ----------------------------------
// Five real matches now (MW1-5). MW5's goals are unresolved (undefined),
// so getGoalEvents(mw5) === [] and it contributes 0 to every goal-based
// total below by design — never fabricated, never silently excluded from
// the minutes/matches totals. See test-match-events.js for the explicit
// reviewed-vs-pending check.
{
  const { units, unresolvedGoals: unitUnresolved } = mod.getMidfieldUnitStats(realMatches);
  assert.equal(unitUnresolved.length, 0, 'none of the real matches should have an unresolved midfield-unit goal attribution');
  const unitMinutes = units.reduce((sum, u) => sum + u.minutes, 0);
  assert.equal(unitMinutes, realMatches.length * 90, 'midfield-unit minutes must partition every match\'s full 90 minutes exactly once');
  const unitGC = units.reduce((sum, u) => sum + u.goalsConceded, 0);
  const totalRealOpponentGoals = realMatches.reduce((sum, m) => sum + (m.goals || []).filter(g => g.team === 'opponent').length, 0);
  assert.equal(totalRealOpponentGoals, 5, 'all 5 reviewed opponent goals are from MW1-4; MW5 (unresolved) contributes 0, not the 3 Villa actually scored');
  assert.equal(unitGC, totalRealOpponentGoals, 'every opponent goal must be attributed to exactly one midfield unit');
  assert.equal(units.filter(u => u.smallSample === false).length, 1, 'exactly one midfield unit (Bentancur+Tonali) has crossed both sample floors so far');

  const { combinations, unresolvedGoals: combinedUnresolved } = mod.getMidfieldDefensiveCombinationStats(realMatches);
  assert.equal(combinedUnresolved.length, 0, 'none of the real matches should have an unresolved midfield+defence goal attribution');
  const combinedMinutes = combinations.reduce((sum, c) => sum + c.minutes, 0);
  assert.equal(combinedMinutes, realMatches.length * 90, 'midfield+defence combination minutes must partition every match\'s full 90 minutes exactly once');
  const combinedGC = combinations.reduce((sum, c) => sum + c.goalsConceded, 0);
  assert.equal(combinedGC, totalRealOpponentGoals, 'every opponent goal must be attributed to exactly one midfield+defence combination');
  assert.ok(combinations.every(c => c.smallSample === true), 'every midfield+defence combination is still small-sample (no combined row has crossed both floors yet)');
  assert.equal(combinations.length, 14, 'five matches, each split into merged segments by independent defensive/midfield substitutions, now yield fourteen distinct combined rows');
}

console.log('midfield-influence tests passed');
