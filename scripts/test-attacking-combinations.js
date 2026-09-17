const assert = require('assert');
const fs = require('fs');
const vm = require('vm');
const path = require('path');

// Same concatenated-load pattern as test-defensive-combinations.js /
// test-midfield-influence.js: attackingCombinations.js imports from
// onPitch.js and matchEvents.js via real `import` statements, matching how
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
  ['../src/data/onPitch.js', '../src/data/matchEvents.js', '../src/data/defensiveCombinations.js', '../src/data/attackingCombinations.js', '../src/data/seasonStats.js'],
  [
    'LEAGUE_MATCHES', 'isAttackingPlayer', 'getMatchAttackingSpells',
    'resolveGoalAttackingCombination', 'getAttackingCombinationStats',
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

// --- 1. Unchanged attacking unit for a full match (single spell) ----------
{
  const appearances = [
    makeStarter('Antonín Kinsky'),
    ...Array.from({ length: 6 }, (_, i) => makeStarter(`Def/Mid ${i + 1}`)),
    makeStarter('Mathys Tel'), makeStarter('Omar Marmoush'), makeStarter('Sávio'), makeStarter('Dominic Solanke'),
  ];
  const match = { mw: 8001, appearances, unused: [], goals: [] };
  const spells = mod.getMatchAttackingSpells(match);
  assert.equal(spells.length, 1, 'no attacking substitution should mean exactly one spell');
  assert.equal(spells[0].minutes, 90);
  assert.deepEqual(spells[0].players.slice().sort(), ['Dominic Solanke', 'Mathys Tel', 'Omar Marmoush', 'Sávio'].sort());
}

// --- 2. Attacking substitution splitting the spell (real MW1: Richarlison
//        and Mikey Moore off, Maddison and Solanke on, at 68) -------------
{
  const mw1 = realMatches.find(m => m.mw === 1);
  const spells = mod.getMatchAttackingSpells(mw1);
  // Boundaries at 45 (Fernandes on) and 68 (Richarlison/Moore off,
  // Maddison/Solanke on) — three spells.
  assert.equal(spells.length, 3, 'MW1 has attacking substitutions at 45 and 68, so exactly three spells');
  assert.equal(spells[0].start, 0);
  assert.equal(spells[0].end, 45);
  assert.deepEqual(spells[0].players.slice().sort(), ['Mathys Tel', 'Mikey Moore', 'Richarlison'].sort());
  assert.equal(spells[1].start, 45);
  assert.equal(spells[1].end, 68);
  assert.deepEqual(spells[1].players.slice().sort(), ['Mateus Fernandes', 'Mathys Tel', 'Mikey Moore', 'Richarlison'].sort());
  assert.equal(spells[2].start, 68);
  assert.equal(spells[2].end, 90);
  assert.deepEqual(spells[2].players.slice().sort(), ['Dominic Solanke', 'James Maddison', 'Mateus Fernandes', 'Mathys Tel'].sort());
  assert.equal(spells[0].minutes + spells[1].minutes + spells[2].minutes, 90, 'spells must partition the full match');
}

// --- 3. Multiple attacking substitutions (real MW3: five spells across
//        061/74/83/84) ------------------------------------------------------
{
  const mw3 = realMatches.find(m => m.mw === 3);
  const spells = mod.getMatchAttackingSpells(mw3);
  assert.equal(spells.length, 5, 'MW3 has four attacking substitution minutes (61, 74, 83, 84), so exactly five spells');
  const boundaries = [0, ...spells.map(s => s.end)];
  assert.deepEqual(boundaries, [0, 61, 74, 83, 84, 90]);
  assert.equal(spells.reduce((sum, s) => sum + s.minutes, 0), 90);
  // The 83-84 spell is a genuine one-minute, four-player combination — real
  // evidence, not a fixed front three/four.
  const oneMinuteSpell = spells.find(s => s.start === 83 && s.end === 84);
  assert.ok(oneMinuteSpell);
  assert.equal(oneMinuteSpell.players.length, 4);
}

// --- 4. Identical combination aggregates across matches; player ordering
//        never creates a duplicate identity ---------------------------------
{
  const matchA = { mw: 9001, appearances: [makeStarter('Omar Marmoush'), makeStarter('Mathys Tel'), ...Array.from({ length: 9 }, (_, i) => makeStarter(`Filler ${i}`))], unused: [], goals: [] };
  const matchB = { mw: 9002, appearances: [makeStarter('Mathys Tel'), makeStarter('Omar Marmoush'), ...Array.from({ length: 9 }, (_, i) => makeStarter(`Filler ${i}`))], unused: [], goals: [] };
  const { combinations } = mod.getAttackingCombinationStats([matchA, matchB]);
  const matching = combinations.filter(c => c.players.length === 2 && ['Omar Marmoush', 'Mathys Tel'].every(p => c.players.includes(p)));
  assert.equal(matching.length, 1, 'identical combination in different appearance order must be a single row');
  assert.equal(matching[0].minutes, 180);
  assert.equal(matching[0].matches, 2);
}

// --- 5. Clean/scoreless match contributes minutes, not excluded -----------
{
  const { combinations } = mod.getAttackingCombinationStats(realMatches.filter(m => m.mw === 3 || m.mw === 4));
  assert.ok(combinations.length > 0);
  assert.ok(combinations.every(c => c.goalsScored === 0));
  assert.equal(combinations.reduce((sum, c) => sum + c.minutes, 0), 180, 'two full scoreless matches must contribute 180 combined minutes');
  assert.ok(combinations.every(c => c.gfPer90 === 0), 'a real, counted zero must be shown as 0, not null/unavailable');
}

// --- 6. Synthetic Spurs goal attributed only to the attacking unit actually
//        on the pitch (the real dataset has zero Spurs goals, so this proves
//        the module already supports one without redesign) -----------------
{
  const match = {
    mw: 9003,
    appearances: [
      makeStarter('Antonín Kinsky'),
      ...Array.from({ length: 6 }, (_, i) => makeStarter(`Def/Mid ${i + 1}`)),
      makeStarter('Mathys Tel', 60), makeStarter('Omar Marmoush'), makeStarter('Sávio'),
      makeSub('Dominic Solanke', 60),
    ],
    unused: [],
    goals: [
      { team: 'spurs', scorer: 'Omar Marmoush', assist: 'Sávio', minute: 30, stoppage: null, period: 'H1', order: null, source: 'https://example.com/test' },
      { team: 'spurs', scorer: 'Dominic Solanke', assist: null, minute: 80, stoppage: null, period: 'H2', order: null, source: 'https://example.com/test' },
    ],
  };
  const { combinations, unresolvedGoals } = mod.getAttackingCombinationStats([match]);
  assert.equal(unresolvedGoals.length, 0);
  const preSubUnit = combinations.find(c => c.players.length === 3 && ['Mathys Tel', 'Omar Marmoush', 'Sávio'].every(p => c.players.includes(p)));
  const postSubUnit = combinations.find(c => c.players.length === 3 && ['Dominic Solanke', 'Omar Marmoush', 'Sávio'].every(p => c.players.includes(p)));
  assert.ok(preSubUnit && postSubUnit);
  assert.equal(preSubUnit.goalsScored, 1, 'the 30\' goal must be charged only to the pre-substitution unit');
  assert.equal(postSubUnit.goalsScored, 1, 'the 80\' goal must be charged only to the post-substitution unit');
}

// --- 7. Same-minute goal/substitution ambiguity is preserved, not guessed -
{
  const match = {
    mw: 9004,
    appearances: [
      makeStarter('Antonín Kinsky'),
      ...Array.from({ length: 7 }, (_, i) => makeStarter(`Def/Mid ${i + 1}`)),
      makeStarter('Omar Marmoush', 70), // off exactly at minute 70
      makeSub('Dominic Solanke', 70),   // on exactly at minute 70
      makeStarter('Sávio'),
    ],
    unused: [],
    goals: [{ team: 'spurs', scorer: 'Test Scorer', assist: null, minute: 70, stoppage: null, period: null, order: null, source: 'https://example.com/test' }],
  };
  const resolution = mod.resolveGoalAttackingCombination(match, match.goals[0]);
  assert.equal(resolution.resolved, false, 'a same-minute goal/substitution with no ordering evidence and no half-time-boundary fact must stay ambiguous, never guessed');
  const { unresolvedGoals } = mod.getAttackingCombinationStats([match]);
  assert.equal(unresolvedGoals.length, 1);
}

// --- 8. Match-scoped attacking-role addition: Richarlison and Mikey Moore
//        are recognized as attacking only in the matchweeks they actually
//        appear in, and no unrelated matchweek/player is affected ----------
{
  assert.equal(mod.isAttackingPlayer('Richarlison', 1), true);
  assert.equal(mod.isAttackingPlayer('Richarlison', 2), false, 'Richarlison has no appearance and no evidence for MW2');
  assert.equal(mod.isAttackingPlayer('Mikey Moore', 1), true);
  assert.equal(mod.isAttackingPlayer('Mikey Moore', 2), true);
  assert.equal(mod.isAttackingPlayer('Mikey Moore', 3), false, 'Mikey Moore has no appearance and no evidence for MW3');
  assert.equal(mod.isAttackingPlayer('Someone Else', 42), false, 'a player with no squad position and no override must never be treated as attacking');
  // Central midfield and defensive personnel are never attacking merely
  // because they get forward — no cross-module double-counting.
  ['Rodrigo Bentancur', 'Sandro Tonali', 'Conor Gallagher', 'Lucas Bergvall', 'Archie Gray', 'Pedro Porro'].forEach(player => {
    [1, 2, 3, 4].forEach(mw => {
      assert.equal(mod.isAttackingPlayer(player, mw), false, `${player} must never be classified as attacking (MW${mw})`);
    });
  });
}

// --- 9. Malformed / incomplete evidence degrades safely, never throws -----
{
  assert.doesNotThrow(() => mod.getAttackingCombinationStats(null));
  assert.doesNotThrow(() => mod.getAttackingCombinationStats(undefined));
  assert.doesNotThrow(() => mod.getAttackingCombinationStats('not-an-array'));
  assert.deepEqual(mod.getAttackingCombinationStats(null).combinations, []);
  assert.deepEqual(mod.getAttackingCombinationStats(null).unresolvedGoals, []);

  const brokenMatches = [
    null,
    undefined,
    { mw: 9101 },
    { mw: 9102, appearances: 'not-an-array', goals: [] },
    { mw: 9103, appearances: [], goals: 'not-an-array' },
    { mw: 9104, appearances: [{ player: 'Ghost', started: false }], goals: [{ team: 'spurs' /* missing minute */ }] },
  ];
  let result;
  assert.doesNotThrow(() => { result = mod.getAttackingCombinationStats(brokenMatches); });
  assert.deepEqual(result.combinations, []);

  assert.doesNotThrow(() => mod.getMatchAttackingSpells(null));
  assert.doesNotThrow(() => mod.getMatchAttackingSpells(undefined));
  assert.deepEqual(mod.getMatchAttackingSpells(null), []);
  assert.doesNotThrow(() => mod.resolveGoalAttackingCombination({ mw: 9105 }, { team: 'spurs' }));
}

// --- Cross-check: real dataset invariants ----------------------------------
{
  const { combinations, unresolvedGoals } = mod.getAttackingCombinationStats(realMatches);
  assert.equal(unresolvedGoals.length, 0, 'the real dataset has zero Spurs goals, so there is nothing to leave unresolved');
  const totalMinutes = combinations.reduce((sum, c) => sum + c.minutes, 0);
  assert.equal(totalMinutes, realMatches.length * 90, 'combination minutes must partition every match\'s full 90 minutes exactly once');
  const totalGF = combinations.reduce((sum, c) => sum + c.goalsScored, 0);
  const totalRealSpursGoals = realMatches.reduce((sum, m) => sum + (m.goals || []).filter(g => g.team === 'spurs').length, 0);
  assert.equal(totalRealSpursGoals, 0, 'the current authoritative dataset has zero Spurs league goals');
  assert.equal(totalGF, totalRealSpursGoals);
  assert.ok(combinations.every(c => c.goalsScored === 0 && c.gfPer90 === 0));
  assert.ok(combinations.every(c => c.smallSample === true), 'every combination from four matches must be flagged small-sample');
  assert.ok(combinations.length > 0, 'combinations must not be hidden just because every rate is currently zero');
  // Real evidence produces varying attacking-unit sizes — never forced to a
  // fixed front three/four.
  const sizes = new Set(combinations.map(c => c.players.length));
  assert.ok(sizes.size > 1, 'real attacking-unit sizes must vary with the evidence, not be forced to one fixed count');
}

console.log('attacking-combinations tests passed');
