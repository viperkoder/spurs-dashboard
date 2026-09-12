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
const matches = seasonContext.__season.LEAGUE_MATCHES;
matches.forEach(core.validateLeagueMatch);
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
const upserted = core.getLeagueMatches(core.upsertLeagueMatch(seasonStatsSource, synthetic));
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
console.log('matchday tests passed');
