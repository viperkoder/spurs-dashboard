const assert = require('assert');
const core = require('../automation/matchday-core');
const { validateStandings } = require('../automation/league-table-update');

const fixtures = `export const PREMIER_LEAGUE = [
  {mw:1, opponent:"Brentford", venue:"A", date:"2026-08-22T17:30:00", score:null},
];`;

// August is BST: 17:30 UK kickoff is 16:30 UTC; eligibility begins 18:30 UTC.
assert.equal(core.ukLocalTimeMs('2026-08-22T17:30:00'), Date.parse('2026-08-22T16:30:00Z'));
assert.equal(core.ukLocalTimeMs('2026-08-29T16:30:00Z'), Date.parse('2026-08-29T16:30:00Z'));
assert.equal(core.dueFixtures(fixtures, { processed: [] }, new Date('2026-08-22T18:29:59Z')).length, 0);
assert.equal(core.dueFixtures(fixtures, { processed: [] }, new Date('2026-08-22T18:30:00Z')).length, 1);
const due = core.dueFixtures(fixtures, { processed: [] }, new Date('2026-08-22T18:30:00Z'))[0];
assert.equal(core.dueFixtures(fixtures, { processed: [core.fixtureKey(due)] }, new Date('2026-08-22T18:30:00Z')).length, 0);
assert.match(core.applyFixtureScore(fixtures, due, { spurs: 2, opponent: 1 }), /score:"2-1"/);

const standings = core.renderStandings([{ team: 'Tottenham Hotspur', w: 1, d: 0, l: 0, gf: 2, ga: 1, gd: 1, pts: 3 }]);
assert.match(standings[0], /isSpurs:true/);
assert.match(core.replaceExportedArray('export const SCORERS = [];', 'SCORERS', ['  {name:"M. Tel",g:1,a:0,apps:1},']), /M\. Tel/);

const squad = 'export const SQUAD = [\n  {name:"M. Tel", pos:"LW", apps:0, g:0},\n];';
assert.match(core.updateSquad(squad, [{ name: 'Mathys Tel', appearance: 1, goals: 2 }]), /apps:1, g:2/);

const clubs = Array.from({ length: 20 }, (_, i) => ({
  team: i === 19 ? 'Tottenham Hotspur' : `Club ${i + 1}`,
  rank: i + 1, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0,
}));
const tableSource = `export const STANDINGS = [\n${clubs.map(c => `  {team:"${c.team}"},`).join('\n')}\n];`;
assert.doesNotThrow(() => validateStandings(clubs, tableSource));
assert.throws(() => validateStandings(clubs.slice(0, 19), tableSource), /20 clubs/);
console.log('matchday tests passed');
