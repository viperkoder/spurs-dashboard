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
vm.runInNewContext(`${fixtureSource}\nthis.api={fixtureKickoffMs,selectNextMatch,countdownTargetMs,matchDisplayState,getNextMatch,PREMIER_LEAGUE_SCHEDULE};`,context);
const {fixtureKickoffMs,selectNextMatch,countdownTargetMs,matchDisplayState,getNextMatch}=context.api;

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
const liveNext=getNextMatch(now);
assert.ok(liveNext && liveNext.score==null,'populated final results must roll the live schedule to an unplayed fixture');
assert.equal(liveNext.kickoffMs,fixtureKickoffMs(liveNext.date),'selected fixture and countdown share one kickoff');
const joined=context.withLeagueResults([{mw:6,status:'scheduled'}],[{mw:6,score:{spurs:1,opponent:1}}]);
assert.equal(joined[0].score,'1-1','completed result must populate the fixture score');
assert.equal(joined[0].status,'completed','completed result must expose a final status');
const leeds=context.api.PREMIER_LEAGUE_SCHEDULE.find(f=>f.mw===10);
assert.equal(leeds.date,'2026-11-07T12:30:00Z','revised Leeds kickoff must be the verified UTC instant');
assert.equal(leeds.verified,true);
const next={opponent:'Ipswich Town',date:'2026-11-21T15:00:00Z',score:null};
const before=new Date('2026-11-07T12:29:59Z');
const during=new Date('2026-11-07T12:30:01Z');
const selectedBefore=selectNextMatch([leeds,next],before);
assert.equal(selectedBefore.opponent,'Leeds United');
assert.equal(countdownTargetMs(selectedBefore)-before.getTime(),1000,'pre-match countdown uses revised kickoff');
assert.equal(matchDisplayState(selectedBefore,before),'upcoming');
const selectedDuring=selectNextMatch([leeds,next],during);
assert.equal(selectedDuring.opponent,'Leeds United','kickoff must not roll the fixture away');
assert.equal(matchDisplayState(selectedDuring,during),'underway','post-kickoff state must suppress countdown');
assert.equal(matchDisplayState(selectedDuring,new Date('2026-11-07T17:00:00Z')),'awaiting-result','late provider data must not imply play continues');
assert.equal(matchDisplayState({...selectedDuring,status:'delayed'},during),'delayed','confirmed delay must not claim match is underway');
assert.equal(selectNextMatch([{...leeds,score:'2-1',status:'completed'},next],during).opponent,'Ipswich Town','verified final result advances next fixture');
assert.equal(selectNextMatch([{...leeds,status:'postponed'},next],during).opponent,'Ipswich Town','terminal postponement advances next fixture');
for(const [mw,kickoff,sgt] of [
  [11,'2026-11-21T15:00:00Z','2026-11-21 23:00'],
  [12,'2026-11-29T14:05:00Z','2026-11-29 22:05'],
  [13,'2026-12-03T20:00:00Z','2026-12-04 04:00'],
  [14,'2026-12-06T16:30:00Z','2026-12-07 00:30'],
  [15,'2026-12-14T20:00:00Z','2026-12-15 04:00'],
  [16,'2026-12-19T17:30:00Z','2026-12-20 01:30'],
  [18,'2026-12-29T19:30:00Z','2026-12-30 03:30'],
  [19,'2027-01-03T16:30:00Z','2027-01-04 00:30'],
  [20,'2027-01-06T19:30:00Z','2027-01-07 03:30'],
]){
  const fixture=context.api.PREMIER_LEAGUE_SCHEDULE.find(f=>f.mw===mw);
  assert.equal(fixture.date,kickoff,`matchweek ${mw} verified kickoff`);
  assert.equal(fixture.verified,true);
  assert.equal(fixture.provisional,false);
  assert.equal(fixtureKickoffMs(fixture.date),Date.parse(kickoff));
  const parts=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Singapore',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date(kickoff)).map(p=>[p.type,p.value]));
  const actual=`${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}`;
  assert.equal(actual,sgt,`matchweek ${mw} Singapore display`);
}
assert.equal(context.api.PREMIER_LEAGUE_SCHEDULE.find(f=>f.mw===17).provisional,true,'unselected Boxing Day kickoff remains provisional');
assert.equal(context.api.PREMIER_LEAGUE_SCHEDULE.find(f=>f.mw===21).provisional,true,'later rounds remain provisional');
console.log('PASS: verified next-fixture selection, status/competition validation, SGT conversion, countdown identity and rollover.');
