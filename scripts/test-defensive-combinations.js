const assert = require('assert');
const fs = require('fs');
const vm = require('vm');
const path = require('path');

// This module depends on onPitch.js and matchEvents.js via real `import`
// statements (matching how build.js bundles src/), so — unlike
// test-onpitch.js and test-match-events.js, whose modules have no
// cross-file imports — the three files must be loaded concatenated into one
// context, the same way build.js's readModule() strips import/export lines
// before joining files in dependency order.
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
  ['../src/data/onPitch.js', '../src/data/matchEvents.js', '../src/data/defensiveCombinations.js', '../src/data/seasonStats.js'],
  [
    'LEAGUE_MATCHES', 'isDefensiveOutfieldPlayer', 'getMatchDefensiveSpells',
    'resolveGoalDefensiveCombination', 'getDefensiveCombinationStats',
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

// --- 1. Full-match unchanged combination (single spell) --------------------
{
  const appearances = [
    makeStarter('GK 1'),
    makeStarter('CB A'), makeStarter('CB B'), makeStarter('LB A'), makeStarter('RB A'),
    ...Array.from({ length: 7 }, (_, i) => makeStarter(`Mid/Fwd ${i + 1}`)),
  ];
  const match = { mw: 8001, appearances, unused: [], goals: [] };
  const defenders = new Set(['CB A', 'CB B', 'LB A', 'RB A']);
  const isDef = (player, mw) => defenders.has(player);
  // Substitute the real whitelist check for this synthetic test via a tiny
  // local re-check on the actual exported function's behaviour instead:
  // simplest is to reuse the real function against real whitelisted names,
  // so this case is exercised with genuine SQUAD_POSITION_DEFENDERS names.
  const realAppearances = [
    makeStarter('Antonín Kinsky'),
    makeStarter('Marcos Senesi'), makeStarter('Jan Paul van Hecke'),
    makeStarter('Andy Robertson'), makeStarter('Pedro Porro'),
    ...Array.from({ length: 6 }, (_, i) => makeStarter(`Mid/Fwd ${i + 1}`)),
  ];
  const realMatch = { mw: 8001, appearances: realAppearances, unused: [], goals: [] };
  const spells = mod.getMatchDefensiveSpells(realMatch);
  assert.equal(spells.length, 1, 'no defensive substitution should mean exactly one spell');
  assert.equal(spells[0].minutes, 90);
  assert.deepEqual(spells[0].players.slice().sort(), ['Andy Robertson', 'Jan Paul van Hecke', 'Marcos Senesi', 'Pedro Porro'].sort());
}

// --- 2. Substitution creating two spells (real MW3 data) -------------------
{
  const mw3 = realMatches.find(m => m.mw === 3);
  assert.ok(mw3);
  const spells = mod.getMatchDefensiveSpells(mw3);
  // Udogie (LB) off at 61, Robertson (LB) on at 61 — a defensive-outfield
  // substitution that must split the match into exactly two spells.
  assert.equal(spells.length, 2, 'MW3 has one defensive substitution (Udogie -> Robertson at 61), so exactly two spells');
  assert.equal(spells[0].start, 0);
  assert.equal(spells[0].end, 61);
  assert.equal(spells[0].minutes, 61);
  assert.ok(spells[0].players.includes('Destiny Udogie'));
  assert.ok(!spells[0].players.includes('Andy Robertson'));
  assert.equal(spells[1].start, 61);
  assert.equal(spells[1].end, 90);
  assert.equal(spells[1].minutes, 29);
  assert.ok(spells[1].players.includes('Andy Robertson'));
  assert.ok(!spells[1].players.includes('Destiny Udogie'));
  assert.equal(spells[0].minutes + spells[1].minutes, 90, 'spells must partition the full match');
}

// --- 3. Identical combination aggregates across matches regardless of order,
//        AND regardless of player array order within a single computation --
{
  const { combinations } = mod.getDefensiveCombinationStats(realMatches);
  // Porro + van de Ven + van Hecke + Udogie appears in both MW2's second
  // spell (68-90, 22 min) and MW3's first spell (0-61, 61 min) — real data
  // that exercises cross-match aggregation of an identical combination.
  const merged = combinations.find(c =>
    c.players.length === 4 &&
    ['Pedro Porro', 'Micky van de Ven', 'Jan Paul van Hecke', 'Destiny Udogie'].every(p => c.players.includes(p)));
  assert.ok(merged, 'expected the Porro/van de Ven/van Hecke/Udogie combination to be merged across MW2 and MW3');
  assert.equal(merged.matches, 2);
  assert.equal(merged.minutes, 83);
  assert.equal(merged.goalsConceded, 1);

  // Player-array order must never create a duplicate identity: the same four
  // names in a different order must combine into a single row, not two.
  const synthA = { mw: 9001, appearances: [makeStarter('Antonín Kinsky'), makeStarter('Marcos Senesi'), makeStarter('Jan Paul van Hecke'), makeStarter('Andy Robertson'), makeStarter('Pedro Porro'), ...Array.from({ length: 6 }, (_, i) => makeStarter(`Mid ${i}`))], unused: [], goals: [] };
  const synthB = { mw: 9002, appearances: [makeStarter('Pedro Porro'), makeStarter('Andy Robertson'), makeStarter('Jan Paul van Hecke'), makeStarter('Marcos Senesi'), makeStarter('Antonín Kinsky'), ...Array.from({ length: 6 }, (_, i) => makeStarter(`Mid ${i}`))], unused: [], goals: [] };
  const { combinations: synthCombos } = mod.getDefensiveCombinationStats([synthA, synthB]);
  const matching = synthCombos.filter(c => c.players.length === 4 && ['Marcos Senesi', 'Jan Paul van Hecke', 'Andy Robertson', 'Pedro Porro'].every(p => c.players.includes(p)));
  assert.equal(matching.length, 1, 'identical combination in different source order must not create duplicate rows');
  assert.equal(matching[0].minutes, 180);
  assert.equal(matching[0].matches, 2);
}

// --- 4. Clean-sheet match contributes zero-conceded minutes, not excluded --
{
  const { combinations } = mod.getDefensiveCombinationStats(realMatches);
  const mw4Combo = combinations.find(c => c.players.length === 4 && ['Andy Robertson', 'Archie Gray', 'Jan Paul van Hecke', 'Micky van de Ven'].every(p => c.players.includes(p)));
  assert.ok(mw4Combo, 'MW4 (0-0) first-spell combination must still appear in the results');
  assert.equal(mw4Combo.goalsConceded, 0);
  assert.equal(mw4Combo.minutes, 85);
  assert.equal(mw4Combo.gcPer90, 0);
  // Every combination drawn only from the two goalless matches (MW3, MW4)
  // must show zero goals conceded, never treated as "unavailable".
  const { combinations: goallessOnly } = mod.getDefensiveCombinationStats(realMatches.filter(m => m.mw === 3 || m.mw === 4));
  assert.ok(goallessOnly.length > 0);
  assert.ok(goallessOnly.every(c => c.goalsConceded === 0));
  assert.equal(goallessOnly.reduce((sum, c) => sum + c.minutes, 0), 180, 'two full goalless matches must contribute 180 combined minutes');
}

// --- 5. A goal is charged only to the combination actually on the pitch ----
{
  const mw1 = realMatches.find(m => m.mw === 1);
  const kayodeGoal = mw1.goals.find(g => g.scorer === 'Michael Kayode');
  const resolution = mod.resolveGoalDefensiveCombination(mw1, kayodeGoal);
  assert.equal(resolution.resolved, true, 'Kayode\'s 45+ goal must resolve cleanly for the defensive line (no defender changes at minute 45 in MW1)');
  assert.deepEqual(resolution.players.slice().sort(), ['Andy Robertson', 'Archie Gray', 'Jan Paul van Hecke', 'Marcos Senesi'].sort());
  // Udogie replaced Gray at 86 — the post-86 combination must NOT be charged
  // with any of MW1's three goals (all scored before minute 45).
  const { combinations } = mod.getDefensiveCombinationStats(realMatches);
  const postSubCombo = combinations.find(c => c.players.length === 4 && c.players.includes('Destiny Udogie') && c.players.includes('Marcos Senesi'));
  assert.ok(postSubCombo);
  assert.equal(postSubCombo.goalsConceded, 0, 'the combination that only existed from minute 86 must not be charged with an earlier goal');
}

// --- 6. First-half stoppage goal vs. half-time substitution: incoming HT
//        subs must not be retroactively placed on the pitch for it ---------
{
  // MW1's real half-time substitutions (Gallagher/Bergvall off, Fernandes/
  // Bentancur on, all at minute 45) are midfielders, not defenders, so they
  // don't touch this module's output directly — but the underlying
  // onPitch.js fix this depends on is proven here with a synthetic
  // defensive-outfield half-time substitution, which is the scenario that
  // would actually change a defensive combination if it occurred.
  const match = {
    mw: 9003,
    appearances: [
      makeStarter('Antonín Kinsky'),
      makeStarter('Marcos Senesi'), makeStarter('Jan Paul van Hecke'), makeStarter('Andy Robertson'),
      makeStarter('Pedro Porro', 45), // starting RB, subbed off exactly at half time
      ...Array.from({ length: 6 }, (_, i) => makeStarter(`Mid ${i}`)),
      makeSub('Destiny Udogie', 45), // incoming RB cover, on exactly at half time
    ],
    unused: [],
    goals: [{ team: 'opponent', scorer: 'Test Scorer', assist: null, minute: 45, stoppage: null, period: 'H1', order: null, source: 'https://example.com/test' }],
  };
  const resolution = mod.resolveGoalDefensiveCombination(match, match.goals[0]);
  assert.equal(resolution.resolved, true, 'a first-half goal at the half-time boundary must resolve, not stay ambiguous');
  assert.ok(resolution.players.includes('Pedro Porro'), 'the departing half-time player was on the pitch for the entire first half');
  assert.ok(!resolution.players.includes('Destiny Udogie'), 'the incoming half-time substitute must not be retroactively credited with a first-half goal');

  // Guard: the same coincidence WITHOUT an explicit H1 period must still be
  // reported as ambiguous — nothing is inferred when period is absent.
  const noPeriodGoal = { team: 'opponent', scorer: 'Test Scorer', assist: null, minute: 45, stoppage: null, period: null, order: null, source: 'https://example.com/test' };
  const noPeriodResolution = mod.resolveGoalDefensiveCombination(match, noPeriodGoal);
  assert.equal(noPeriodResolution.resolved, false, 'without a period field, the half-time coincidence must remain ambiguous, not resolved');
}

// --- 7. Player ordering never creates duplicate combination identities -----
// (also covered by test 3's synthCombos check; this asserts the key
// function directly for absolute clarity)
{
  const spellA = { players: ['Zed', 'Alpha', 'Mike'] };
  const spellB = { players: ['Alpha', 'Mike', 'Zed'] };
  // There is no exported combinationKey, so this is verified through the
  // public aggregation surface: two matches with the same three names in
  // different appearance order must merge into a single combination row.
  const matchA = { mw: 9004, appearances: [makeStarter('Marcos Senesi'), makeStarter('Jan Paul van Hecke'), makeStarter('Andy Robertson'), ...Array.from({ length: 8 }, (_, i) => makeStarter(`Filler ${i}`))], unused: [], goals: [] };
  const matchB = { mw: 9005, appearances: [makeStarter('Andy Robertson'), makeStarter('Marcos Senesi'), makeStarter('Jan Paul van Hecke'), ...Array.from({ length: 8 }, (_, i) => makeStarter(`Filler ${i}`))], unused: [], goals: [] };
  const { combinations } = mod.getDefensiveCombinationStats([matchA, matchB]);
  const threePlayerCombos = combinations.filter(c => c.players.length === 3);
  assert.equal(threePlayerCombos.length, 1, 'identical three-player set in different appearance order must be a single combination');
  assert.equal(threePlayerCombos[0].matches, 2);
}

// --- 8. Malformed / incomplete evidence degrades safely, never throws ------
{
  assert.doesNotThrow(() => mod.getDefensiveCombinationStats(null));
  assert.doesNotThrow(() => mod.getDefensiveCombinationStats(undefined));
  assert.doesNotThrow(() => mod.getDefensiveCombinationStats('not-an-array'));
  assert.deepEqual(mod.getDefensiveCombinationStats(null).combinations, []);
  assert.deepEqual(mod.getDefensiveCombinationStats(null).unresolvedGoals, []);

  const brokenMatches = [
    null,
    undefined,
    { mw: 9101 }, // no appearances at all
    { mw: 9102, appearances: 'not-an-array', goals: [] },
    { mw: 9103, appearances: [], goals: 'not-an-array' },
    { mw: 9104, appearances: [{ player: 'Ghost', started: false }], goals: [{ team: 'opponent' /* missing minute */ }] },
  ];
  let result;
  assert.doesNotThrow(() => { result = mod.getDefensiveCombinationStats(brokenMatches); });
  assert.deepEqual(result.combinations, []);

  assert.doesNotThrow(() => mod.getMatchDefensiveSpells(null));
  assert.doesNotThrow(() => mod.getMatchDefensiveSpells(undefined));
  assert.deepEqual(mod.getMatchDefensiveSpells(null), []);
  assert.doesNotThrow(() => mod.resolveGoalDefensiveCombination({ mw: 9105 }, { team: 'opponent' }));
}

// --- Cross-check: real dataset invariants ----------------------------------
{
  const { combinations, unresolvedGoals } = mod.getDefensiveCombinationStats(realMatches);
  assert.equal(unresolvedGoals.length, 0, 'none of the four real matches should have an unresolved defensive goal attribution');
  const totalMinutes = combinations.reduce((sum, c) => sum + c.minutes, 0);
  assert.equal(totalMinutes, realMatches.length * 90, 'combination minutes must partition every match\'s full 90 minutes exactly once');
  const totalGC = combinations.reduce((sum, c) => sum + c.goalsConceded, 0);
  const totalRealOpponentGoals = realMatches.reduce((sum, m) => sum + (m.goals || []).filter(g => g.team === 'opponent').length, 0);
  assert.equal(totalGC, totalRealOpponentGoals, 'every opponent goal must be attributed to exactly one combination');
  assert.equal(totalRealOpponentGoals, 5);
  // With only four completed matches, every combination is a small sample —
  // none should be silently hidden, and none should be shown as if reliable.
  assert.ok(combinations.every(c => c.smallSample === true), 'every combination from four matches must be flagged small-sample');
  assert.ok(combinations.length > 0, 'combinations must not be hidden just because they are small-sample');
}

console.log('defensive-combinations tests passed');
