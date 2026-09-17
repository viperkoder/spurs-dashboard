const assert = require('assert');
const fs = require('fs');
const vm = require('vm');
const path = require('path');

// src/data files are ESM (bundled for the browser by build.js). Load them
// here the same way scripts/test-matchday.js loads seasonStats.js: strip
// `export` and run in a fresh vm context.
function loadEsModule(relativePath, exportNames) {
  const source = fs.readFileSync(path.join(__dirname, relativePath), 'utf8');
  const context = { Map, Set, Number, Array };
  vm.runInNewContext(`${source.replace(/^export\s+/gm, '')}\nthis.__mod={${exportNames.join(',')}};`, context);
  return context.__mod;
}

const onPitch = loadEsModule('../src/data/onPitch.js', [
  'DEFAULT_MATCH_DURATION', 'validateOnPitchData', 'getMatchDuration',
  'getStartingXI', 'isOnPitchAt', 'getOnPitchAt', 'getSubstitutionEvents',
  'getPlayersOnPitchAtGoal',
]);
const season = loadEsModule('../src/data/seasonStats.js', ['LEAGUE_MATCHES']);
const realMatches = season.LEAGUE_MATCHES;

function makeStarter(player, off = 90) {
  return { player, started: true, on: 0, off };
}
function makeSub(player, on, off = 90) {
  return { player, started: false, on, off };
}

// --- No substitutions -------------------------------------------------
{
  const appearances = Array.from({ length: 11 }, (_, i) => makeStarter(`Starter ${i + 1}`));
  const match = { mw: 900, appearances, unused: [] };
  assert.equal(onPitch.getStartingXI(match).length, 11);
  assert.deepEqual(onPitch.getSubstitutionEvents(match), []);
  assert.equal(onPitch.getOnPitchAt(match, 0).onPitch.length, 11);
  assert.equal(onPitch.getOnPitchAt(match, 45).onPitch.length, 11);
  assert.equal(onPitch.getOnPitchAt(match, 90).onPitch.length, 11);
  assert.equal(onPitch.validateOnPitchData(match).valid, true);
}

// --- One substitution ---------------------------------------------------
{
  const appearances = Array.from({ length: 10 }, (_, i) => makeStarter(`Starter ${i + 1}`));
  appearances.push(makeStarter('Starter 11', 70));
  appearances.push(makeSub('Sub A', 70));
  const match = { mw: 901, appearances, unused: [] };
  assert.equal(onPitch.getStartingXI(match).length, 11);
  const events = onPitch.getSubstitutionEvents(match);
  assert.deepEqual(events, [{ minute: 70, type: 'off', player: 'Starter 11' }, { minute: 70, type: 'on', player: 'Sub A' }]);
  assert.ok(onPitch.getOnPitchAt(match, 69).onPitch.includes('Starter 11'));
  assert.ok(!onPitch.getOnPitchAt(match, 69).onPitch.includes('Sub A'));
  assert.ok(!onPitch.getOnPitchAt(match, 70).onPitch.includes('Starter 11'), 'same-minute departure excluded, not guessed');
  assert.ok(onPitch.getOnPitchAt(match, 70).onPitch.includes('Sub A'), 'entrant is on pitch from their entry minute');
  assert.ok(onPitch.getOnPitchAt(match, 89).onPitch.includes('Sub A'));
  assert.equal(onPitch.getOnPitchAt(match, 45).onPitch.length, 11);
  assert.equal(onPitch.getOnPitchAt(match, 80).onPitch.length, 11);
}

// --- Multiple substitutions, using real audited MW1 evidence -------------
{
  const match = realMatches.find(m => m.mw === 1);
  assert.ok(match, 'expected MW1 Brentford match in LEAGUE_MATCHES');
  assert.equal(onPitch.getStartingXI(match).length, 11);
  const events = onPitch.getSubstitutionEvents(match);
  // MW1 has 5 substitutes entering (per src/data/seasonStats.js appearances).
  assert.equal(events.filter(e => e.type === 'on').length, 5);
  assert.equal(events.filter(e => e.type === 'off').length, 5);
  // Exactly 11 players on the pitch at every sampled minute (no red cards this match).
  for (const minute of [0, 1, 44, 45, 46, 67, 68, 69, 85, 86, 89, 90]) {
    assert.equal(onPitch.getOnPitchAt(match, minute).onPitch.length, 11, `expected 11 players on pitch at minute ${minute}`);
  }
  // James Maddison entered at 68; must not appear before then.
  assert.ok(!onPitch.getOnPitchAt(match, 67).onPitch.includes('James Maddison'));
  assert.ok(onPitch.getOnPitchAt(match, 68).onPitch.includes('James Maddison'));
  // Conor Gallagher left at 45; must not appear from 45 onward.
  assert.ok(onPitch.getOnPitchAt(match, 44).onPitch.includes('Conor Gallagher'));
  assert.ok(!onPitch.getOnPitchAt(match, 45).onPitch.includes('Conor Gallagher'));
}

// --- Goal before a substitution ------------------------------------------
{
  const appearances = Array.from({ length: 10 }, (_, i) => makeStarter(`Starter ${i + 1}`));
  appearances.push(makeStarter('Defender A', 70));
  appearances.push(makeSub('Sub A', 70));
  const match = { mw: 902, appearances, unused: [] };
  // Score 0-0 at the time; concede at 65' — before Defender A's 70' departure.
  const goal = { minute: 65, team: 'opponent' };
  const { onPitch: onPitchAtGoal } = onPitch.getPlayersOnPitchAtGoal(match, goal);
  assert.ok(onPitchAtGoal.includes('Defender A'), 'Defender A was on the pitch for a goal conceded before they were substituted off');
  assert.ok(!onPitchAtGoal.includes('Sub A'));
}

// --- Goal after a substitution --------------------------------------------
{
  const appearances = Array.from({ length: 10 }, (_, i) => makeStarter(`Starter ${i + 1}`));
  appearances.push(makeStarter('Defender A', 70));
  appearances.push(makeSub('Sub A', 70));
  const match = { mw: 903, appearances, unused: [] };
  // Concede at 75' — after Defender A left at 70'. Must NOT be attributed to Defender A.
  const goal = { minute: 75, team: 'opponent' };
  const { onPitch: onPitchAtGoal } = onPitch.getPlayersOnPitchAtGoal(match, goal);
  assert.ok(!onPitchAtGoal.includes('Defender A'), 'a goal conceded after a player left must not be attributed to them');
  assert.ok(onPitchAtGoal.includes('Sub A'));
}

// --- Stoppage-time event ---------------------------------------------------
{
  const appearances = Array.from({ length: 11 }, (_, i) => makeStarter(`Starter ${i + 1}`));
  const match = { mw: 904, appearances, unused: [] };
  // A goal in the 90th minute plus stoppage: a full-match player must still be credited.
  const goal = { minute: 90, stoppage: 4, team: 'spurs', scorer: 'Starter 1' };
  const { onPitch: onPitchAtGoal, issues } = onPitch.getPlayersOnPitchAtGoal(match, goal);
  assert.equal(issues.length, 0);
  assert.equal(onPitchAtGoal.length, 11);
  assert.ok(onPitchAtGoal.includes('Starter 1'));
  // A substitute who departed exactly at 90' (unusual but possible with a
  // withdrawal in stoppage time) is still excluded from a goal recorded after
  // their departure minute under the same boundary rule.
  const withLateSub = {
    mw: 905,
    appearances: [
      ...Array.from({ length: 9 }, (_, i) => makeStarter(`Starter ${i + 1}`)),
      makeStarter('Starter 10', 90),
      makeStarter('Starter 11', 90),
    ],
    unused: [],
  };
  assert.equal(onPitch.getPlayersOnPitchAtGoal(withLateSub, { minute: 90, stoppage: 2, team: 'spurs' }).onPitch.length, 11);
}

// --- Ambiguous same-minute goal/substitution (no ordering evidence) ------
{
  const appearances = Array.from({ length: 10 }, (_, i) => makeStarter(`Starter ${i + 1}`));
  appearances.push(makeStarter('Defender A', 70));
  appearances.push(makeSub('Sub A', 70));
  const match = { mw: 909, appearances, unused: [] };
  // A goal reported in the SAME minute as the substitution: minute-only data
  // cannot show whether it happened before or after the change. Neither
  // player may be silently included or excluded.
  const goal = { minute: 70, team: 'opponent' };
  const { onPitch: roster, ambiguous, issues } = onPitch.getPlayersOnPitchAtGoal(match, goal);
  assert.ok(!roster.includes('Defender A'), 'must not silently include the departing player');
  assert.ok(!roster.includes('Sub A'), 'must not silently include the entering player');
  assert.ok(ambiguous.includes('Defender A'));
  assert.ok(ambiguous.includes('Sub A'));
  assert.ok(issues.some(i => i.includes('ambiguous')));
  // The ordinary (non-goal) roster query is unaffected and keeps the
  // existing [on, off) convention — retained per the agreed rule.
  assert.ok(!onPitch.getOnPitchAt(match, 70).onPitch.includes('Defender A'));
  assert.ok(onPitch.getOnPitchAt(match, 70).onPitch.includes('Sub A'));
}

// --- Same-minute goal/substitution WITH real source ordering --------------
{
  const appearances = Array.from({ length: 10 }, (_, i) => makeStarter(`Starter ${i + 1}`));
  appearances.push({ ...makeStarter('Defender A', 70), offOrder: 1 });
  appearances.push({ ...makeSub('Sub A', 70), onOrder: 2 });
  const match = { mw: 910, appearances, unused: [] };
  // Source evidence (e.g. commentary sequence) says the substitution
  // (order 1 then 2) happened before this goal's own order position (3):
  // both events precede the goal, so Sub A is on, Defender A is off.
  const goalAfterSub = { minute: 70, team: 'opponent', order: 3 };
  const afterSub = onPitch.getPlayersOnPitchAtGoal(match, goalAfterSub);
  assert.ok(!afterSub.onPitch.includes('Defender A'));
  assert.ok(afterSub.onPitch.includes('Sub A'));
  assert.deepEqual(afterSub.ambiguous, []);

  // Goal ordered before both boundary events (order 0): the substitution
  // had not happened yet, so Defender A was still on, Sub A was not on yet.
  const goalBeforeSub = { minute: 70, team: 'opponent', order: 0 };
  const beforeSub = onPitch.getPlayersOnPitchAtGoal(match, goalBeforeSub);
  assert.ok(beforeSub.onPitch.includes('Defender A'));
  assert.ok(!beforeSub.onPitch.includes('Sub A'));
  assert.deepEqual(beforeSub.ambiguous, []);
}

// --- Duplicate player handling ---------------------------------------------
{
  const appearances = [
    ...Array.from({ length: 9 }, (_, i) => makeStarter(`Starter ${i + 1}`)),
    makeStarter('Confused Player', 90),
    { player: 'Confused Player', started: false, on: 60, off: 90 }, // duplicate, conflicting record
  ];
  const match = { mw: 911, appearances, unused: [] };
  const { valid, issues } = onPitch.validateOnPitchData(match);
  assert.equal(valid, false);
  assert.ok(issues.some(i => i.includes('Confused Player') && i.includes('duplicate')));
  // Neither duplicate record is authoritative, so the player is excluded
  // from every query rather than guessing which entry is correct.
  assert.ok(!onPitch.getStartingXI(match).includes('Confused Player'));
  assert.ok(!onPitch.getOnPitchAt(match, 30).onPitch.includes('Confused Player'));
  assert.ok(!onPitch.getOnPitchAt(match, 75).onPitch.includes('Confused Player'));
  assert.ok(!onPitch.getSubstitutionEvents(match).some(e => e.player === 'Confused Player'));
  const goalIssues = onPitch.getPlayersOnPitchAtGoal(match, { minute: 65, team: 'spurs' });
  assert.ok(!goalIssues.onPitch.includes('Confused Player'));
  assert.ok(!goalIssues.ambiguous.includes('Confused Player'));
}

// --- Invalid intervals are rejected, not merely flagged --------------------
{
  const appearances = [
    ...Array.from({ length: 10 }, (_, i) => makeStarter(`Starter ${i + 1}`)),
    { player: 'Backwards Player', started: false, on: 80, off: 60 }, // off before on
    { player: 'Overtime Player', started: false, on: 91, off: 120 }, // beyond 90-minute duration
    { player: 'Negative Player', started: false, on: -5, off: 30 },  // negative on minute
  ];
  const match = { mw: 912, appearances, unused: [] };
  for (const minute of [0, 30, 60, 89, 90, 91, 100, 120]) {
    const { onPitch: roster } = onPitch.getOnPitchAt(match, minute);
    assert.ok(!roster.includes('Backwards Player'), `Backwards Player must never be eligible (minute ${minute})`);
    assert.ok(!roster.includes('Overtime Player'), `Overtime Player must never be eligible (minute ${minute})`);
    assert.ok(!roster.includes('Negative Player'), `Negative Player must never be eligible (minute ${minute})`);
  }
  assert.ok(!onPitch.getSubstitutionEvents(match).some(e => ['Backwards Player', 'Overtime Player', 'Negative Player'].includes(e.player)));
}

// --- Malformed / incomplete data handled safely ---------------------------
{
  // No appearances array at all.
  assert.deepEqual(onPitch.getOnPitchAt({ mw: 906 }, 45).onPitch, []);
  assert.equal(onPitch.validateOnPitchData({ mw: 906 }).valid, false);

  // Missing on/off, non-numeric minute, off before on, off beyond duration,
  // a duplicate player, and a started/on-minute mismatch — all in one match.
  const messy = {
    mw: 907,
    appearances: [
      ...Array.from({ length: 9 }, (_, i) => makeStarter(`Starter ${i + 1}`)),
      { player: 'Starter 10', started: true, on: 0, off: 90 },
      { player: 'Ghost Player', started: false }, // missing on/off
      { player: 'Backwards Player', started: false, on: 80, off: 60 }, // off before on
      { player: 'Overtime Player', started: false, on: 91, off: 120 }, // exceeds 90-minute duration
      { player: 'Starter 1', started: true, on: 0, off: 90 }, // duplicate of Starter 1 above
      { player: 'Mismatched Player', started: true, on: 5, off: 90 }, // started but on != 0
    ],
    unused: [],
  };
  const { valid, issues } = onPitch.validateOnPitchData(messy);
  assert.equal(valid, false);
  assert.ok(issues.some(i => i.includes('Ghost Player') && i.includes('not a number')));
  assert.ok(issues.some(i => i.includes('Backwards Player') && i.includes('before on minute')));
  assert.ok(issues.some(i => i.includes('Overtime Player') && i.includes('exceeds match duration')));
  assert.ok(issues.some(i => i.includes('duplicate')));
  assert.ok(issues.some(i => i.includes('Mismatched Player') && i.includes('on minute is not 0')));
  // getOnPitchAt must not throw on this data, and must exclude the broken
  // entries rather than guess a location for them.
  const { onPitch: safeRoster } = onPitch.getOnPitchAt(messy, 30);
  assert.ok(!safeRoster.includes('Ghost Player'));
  assert.ok(!safeRoster.includes('Backwards Player'));
  assert.ok(!safeRoster.includes('Overtime Player'));
  // Starter 1 is duplicated (a starter entry plus a conflicting later entry)
  // — neither is authoritative, so Starter 1 is excluded entirely rather
  // than guessed. An unaffected player is still counted normally.
  assert.ok(!safeRoster.includes('Starter 1'));
  assert.ok(safeRoster.includes('Starter 2'));

  // A non-array / malformed `appearances` field must never throw — every
  // query function degrades to a safe empty result instead.
  for (const badAppearances of ['not-an-array', { foo: 1 }, 42, null, undefined]) {
    const brokenMatch = { mw: 913, appearances: badAppearances, unused: [] };
    assert.doesNotThrow(() => onPitch.getStartingXI(brokenMatch));
    assert.doesNotThrow(() => onPitch.getOnPitchAt(brokenMatch, 45));
    assert.doesNotThrow(() => onPitch.getSubstitutionEvents(brokenMatch));
    assert.doesNotThrow(() => onPitch.getPlayersOnPitchAtGoal(brokenMatch, { minute: 45, team: 'spurs' }));
    assert.deepEqual(onPitch.getStartingXI(brokenMatch), []);
    assert.deepEqual(onPitch.getOnPitchAt(brokenMatch, 45).onPitch, []);
    assert.deepEqual(onPitch.getSubstitutionEvents(brokenMatch), []);
  }
  assert.doesNotThrow(() => onPitch.getStartingXI({ mw: 914 })); // appearances key absent entirely
  assert.doesNotThrow(() => onPitch.getStartingXI(null));
  assert.doesNotThrow(() => onPitch.getStartingXI(undefined));

  // A goal event missing its minute must not throw and must report the gap.
  const missingMinuteGoal = onPitch.getPlayersOnPitchAtGoal({ mw: 908, appearances: [makeStarter('Starter 1')] }, { team: 'spurs' });
  assert.equal(missingMinuteGoal.onPitch.length, 0);
  assert.ok(missingMinuteGoal.issues.length > 0);
}

// --- Cross-check against every real audited league match -----------------
for (const match of realMatches) {
  const { valid, issues } = onPitch.validateOnPitchData(match);
  assert.ok(valid, `MW${match.mw} on-pitch data should be structurally valid: ${issues.join('; ')}`);
  for (const minute of [0, 30, 60, 90]) {
    assert.equal(onPitch.getOnPitchAt(match, minute).onPitch.length, 11, `MW${match.mw} minute ${minute} should have 11 players on pitch`);
  }
}

console.log('on-pitch tests passed');
