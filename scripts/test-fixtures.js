const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const seasonSource = fs.readFileSync(path.join(__dirname,'../src/data/seasonStats.js'),'utf8');
const context = {Map,Set,Date,Intl};
vm.runInNewContext(`${seasonSource.replace(/^export\s+/gm,'')}\nthis.withLeagueResults=withLeagueResults;`,context);
const fixtureSource = fs.readFileSync(path.join(__dirname,'../src/data/fixtures.js'),'utf8')
  .replace(/^import .*$/gm,'')
  .replace(/^export\s+/gm,'');
vm.runInNewContext(`${fixtureSource}\nthis.api={fixtureKickoffMs,selectNextMatch,countdownTargetMs,getNextMatch};`,context);
const {fixtureKickoffMs,selectNextMatch,countdownTargetMs,getNextMatch}=context.api;

const now=new Date('2026-10-10T12:30:00Z');
const united={opponent:'Manchester United',date:'2026-10-10T17:30:00+01:00',competition:'Premier League',expectedCompetition:'Premier League',status:'scheduled',score:null,verified:true};
const coventry={opponent:'Coventry City',date:'2026-10-19T20:00:00+01:00',competition:'Premier League',expectedCompetition:'Premier League',status:'scheduled',score:null,verified:true};
assert.equal(selectNextMatch([coventry,united],now).opponent,'Manchester United','earliest verified fixture must win');
assert.equal(selectNextMatch([coventry,united],now).kickoffMs,Date.parse(united.date));
assert.equal(countdownTargetMs(selectNextMatch([coventry,united],now)),Date.parse(united.date),'countdown and display must share one selected record');
assert.equal(new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Singapore',day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(new Date(Date.parse(united.date))),'11/10, 00:30','kickoff must convert to 00:30 SGT');
assert.equal(selectNextMatch([{...united,status:'completed'},coventry],now).opponent,'Coventry City','completed fixture must roll over');
assert.equal(selectNextMatch([{...united,status:'postponed'},coventry],now).opponent,'Coventry City','postponed fixture must not drive countdown');
assert.equal(selectNextMatch([{...united,competition:'Carabao Cup'},coventry],now).opponent,'Coventry City','contradictory competition label must be rejected');
assert.equal(selectNextMatch([{...united,date:'2026-10-10T17:30:00'},coventry],now).opponent,'Coventry City','verified fixture without timezone must be rejected');
assert.equal(selectNextMatch([{opponent:'Chelsea',date:'2026-10-24T15:00:00',competition:'Premier League',expectedCompetition:'Premier League',score:null,provisional:true}],now).opponent,'Chelsea','provisional official schedule remains a fallback');
assert.equal(fixtureKickoffMs('2026-10-24T15:00:00'),Date.parse('2026-10-24T14:00:00Z'),'UK-local provisional time must parse consistently during BST');
assert.equal(getNextMatch(now).opponent,'Manchester United');
assert.equal(getNextMatch(new Date('2026-10-10T16:31:00Z')).opponent,'Coventry City','live schedule must roll over after kickoff');
console.log('PASS: verified next-fixture selection, status/competition validation, SGT conversion, countdown identity and rollover.');
