const assert = require('assert');
const fs = require('fs');
const vm = require('vm');
const path = require('path');

function loadEsModule(relativePath, exportNames) {
  const source = fs.readFileSync(path.join(__dirname, relativePath), 'utf8');
  const context = { Map, Set, Number, Array };
  vm.runInNewContext(`${source.replace(/^export\s+/gm, '')}\nthis.__mod={${exportNames.join(',')}};`, context);
  return context.__mod;
}

const mod = loadEsModule('../src/data/managerRecord.js', [
  'RDZ_SEASONS', 'RDZ_UNRESOLVED_SPELLS', 'getRdzSeasons', 'getRdzCareerTotals',
]);

// --- Every row's W/D/L must sum to its own `played` figure --------------
for (const row of mod.RDZ_SEASONS) {
  assert.equal(row.w + row.d + row.l, row.played, `${row.season} ${row.club}: W+D+L must equal played`);
}

// --- Points/PPG/Points-return% are always derived, never hand-entered,
//     and must reconcile exactly -----------------------------------------
const seasons = mod.getRdzSeasons();
for (const row of seasons) {
  assert.equal(row.points, row.w * 3 + row.d, `${row.season}: points must equal W*3+D`);
  assert.ok(Math.abs(row.ppg - row.points / row.played) < 1e-9, `${row.season}: PPG must equal points/played`);
  assert.ok(Math.abs(row.returnPct - (row.points / (row.played * 3)) * 100) < 1e-9, `${row.season}: points-return% must equal points/(played*3)*100`);
}

// --- Spot-check a couple of known-good rows against the sourced figures -
const sassuolo1920 = seasons.find(r => r.season === '2019/20' && r.club === 'Sassuolo');
assert.equal(sassuolo1920.points, 51);
const shakhtar = seasons.find(r => r.club === 'Shakhtar Donetsk');
assert.equal(shakhtar.status, 'partial', 'the 2021-22 Ukrainian Premier League season was abandoned mid-season and must be marked partial, not full');
assert.equal(shakhtar.points, 47);

// --- Current Tottenham row must match this dashboard's own reconciled
//     season summary (5 played, 0-2-3, 2 points) — never a stale copy ---
const spurs = seasons.find(r => r.club === 'Tottenham Hotspur' && r.status === 'ongoing');
assert.ok(spurs, 'current ongoing Tottenham row must exist');
assert.equal(spurs.played, 5);
assert.equal(spurs.points, 2);

// --- Career totals must be a straight sum of the listed rows, and must
//     themselves reconcile ------------------------------------------------
const totals = mod.getRdzCareerTotals();
const summedPlayed = mod.RDZ_SEASONS.reduce((s, r) => s + r.played, 0);
assert.equal(totals.played, summedPlayed);
assert.equal(totals.points, totals.w * 3 + totals.d);

// --- Unresolved spells are documented, not silently missing -------------
assert.ok(mod.RDZ_UNRESOLVED_SPELLS.length >= 2, 'known-but-unreconciled spells must be listed, not silently dropped');
for (const gap of mod.RDZ_UNRESOLVED_SPELLS) {
  assert.ok(gap.gap && gap.gap.length > 0, `${gap.season}: an unresolved spell must state why it could not be reconciled`);
}

console.log('manager-record tests passed');
