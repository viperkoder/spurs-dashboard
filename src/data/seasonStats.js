// Premier League completed-match authority for 2026/27.
//
// Each match owns its result and player participation. Fixtures consumes the
// same result records, while Season Stats derives every cumulative total below.
// Never hand-maintain Apps/Starts/Sub Apps/Minutes/W/D/L separately.
//
// Minute convention: regulation minutes only. A starter begins at 0; a player
// entering in the displayed 68th minute begins at 68; players still on the
// pitch at full time end at 90. Therefore every no-red-card match reconciles to
// 11 * 90 = 990 team-player minutes, without counting stoppage time twice.

export const LEAGUE_MATCHES = [
  {
    mw:1,
    opponent:"Brentford",
    venue:"A",
    date:"2026-08-22T17:30:00+01:00",
    score:{spurs:0,opponent:3},
    sourceEventId:"401879321",
    sources:[
      "https://www.espn.com/soccer/match/_/gameId/401879321/tottenham-hotspur-brentford",
    ],
    appearances:[
      {player:"Antonín Kinsky",started:true,on:0,off:90},
      {player:"Marcos Senesi",started:true,on:0,off:90},
      {player:"Jan Paul van Hecke",started:true,on:0,off:90},
      {player:"Andy Robertson",started:true,on:0,off:90},
      {player:"Archie Gray",started:true,on:0,off:86},
      {player:"Conor Gallagher",started:true,on:0,off:45},
      {player:"Lucas Bergvall",started:true,on:0,off:45},
      {player:"Sandro Tonali",started:true,on:0,off:90},
      {player:"Richarlison",started:true,on:0,off:68},
      {player:"Mathys Tel",started:true,on:0,off:90},
      {player:"Mikey Moore",started:true,on:0,off:68},
      {player:"Mateus Fernandes",started:false,on:45,off:90},
      {player:"Rodrigo Bentancur",started:false,on:45,off:90},
      {player:"James Maddison",started:false,on:68,off:90},
      {player:"Dominic Solanke",started:false,on:68,off:90},
      {player:"Destiny Udogie",started:false,on:86,off:90},
    ],
    unused:["Martin Dúbravka","Luca Williams-Barnett","Kevin Danso","Ben Davies"],
  },
  {
    mw:2,
    opponent:"Newcastle United",
    venue:"H",
    date:"2026-08-29T17:30:00+01:00",
    score:{spurs:0,opponent:2},
    sourceEventId:"401879312",
    sources:[
      "https://www.espn.com/soccer/match/_/gameId/401879312/newcastle-united-tottenham-hotspur",
      "https://www.skysports.com/football/tottenham-hotspur-vs-newcastle-united/teams/559463",
    ],
    appearances:[
      {player:"Antonín Kinsky",started:true,on:0,off:90},
      {player:"Micky van de Ven",started:true,on:0,off:90},
      {player:"Jan Paul van Hecke",started:true,on:0,off:90},
      {player:"Andy Robertson",started:true,on:0,off:68},
      {player:"Archie Gray",started:true,on:0,off:68},
      {player:"Mateus Fernandes",started:true,on:0,off:90},
      {player:"Sandro Tonali",started:true,on:0,off:75},
      {player:"Rodrigo Bentancur",started:true,on:0,off:90},
      {player:"Omar Marmoush",started:true,on:0,off:90},
      {player:"Mathys Tel",started:true,on:0,off:68},
      {player:"Pedro Porro",started:true,on:0,off:90},
      {player:"Mikey Moore",started:false,on:68,off:90},
      {player:"Destiny Udogie",started:false,on:68,off:90},
      {player:"Mohammed Kudus",started:false,on:68,off:90},
      {player:"Dominic Solanke",started:false,on:75,off:90},
    ],
    unused:["Martin Dúbravka","Ben Davies","Lucas Bergvall","Conor Gallagher","Marcos Senesi"],
  },
  {
    mw:3,
    opponent:"Nottingham Forest",
    venue:"A",
    date:"2026-09-05T15:00:00+01:00",
    score:{spurs:0,opponent:0},
    sourceEventId:"401878780",
    sources:[
      "https://www.tottenhamhotspur.com/news/1088547/confirmed-line-ups-forest-vs-spurs",
      "https://www.espn.com/soccer/match/_/gameId/401878780/tottenham-hotspur-nottingham-forest",
      "https://www.skysports.com/football/n-forest-vs-spurs/teams/6701572898492963232",
    ],
    appearances:[
      {player:"Antonín Kinsky",started:true,on:0,off:90},
      {player:"Micky van de Ven",started:true,on:0,off:90},
      {player:"Jan Paul van Hecke",started:true,on:0,off:90},
      {player:"Destiny Udogie",started:true,on:0,off:61},
      {player:"Pedro Porro",started:true,on:0,off:90},
      {player:"Conor Gallagher",started:true,on:0,off:83},
      {player:"Sandro Tonali",started:true,on:0,off:90},
      {player:"Rodrigo Bentancur",started:true,on:0,off:90},
      {player:"Omar Marmoush",started:true,on:0,off:84},
      {player:"Mathys Tel",started:true,on:0,off:74},
      {player:"Sávio",started:true,on:0,off:61},
      {player:"Andy Robertson",started:false,on:61,off:90},
      {player:"Mohammed Kudus",started:false,on:61,off:90},
      {player:"Mykhailo Mudryk",started:false,on:74,off:90},
      {player:"Mateus Fernandes",started:false,on:83,off:90},
      {player:"Dominic Solanke",started:false,on:84,off:90},
    ],
    unused:["Martin Dúbravka","Archie Gray","Marcos Senesi","Lucas Bergvall"],
  },
];

export function outcomeFor(match){
  if(match.score.spurs>match.score.opponent) return "W";
  if(match.score.spurs<match.score.opponent) return "L";
  return "D";
}

export function getLeagueSummary(matches=LEAGUE_MATCHES){
  return matches.reduce((total,match)=>{
    total.played+=1;
    const outcome=outcomeFor(match);
    total[outcome.toLowerCase()]+=1;
    total.points+=outcome==="W"?3:outcome==="D"?1:0;
    return total;
  },{played:0,w:0,d:0,l:0,points:0});
}

export function getPlayerUsage(matches=LEAGUE_MATCHES){
  const players=new Map();
  matches.forEach(match=>{
    const outcome=outcomeFor(match).toLowerCase();
    match.appearances.forEach(appearance=>{
      const row=players.get(appearance.player)||{player:appearance.player,apps:0,starts:0,subApps:0,minutes:0,w:0,d:0,l:0};
      row.apps+=1;
      row.starts+=appearance.started?1:0;
      row.subApps+=appearance.started?0:1;
      row.minutes+=appearance.off-appearance.on;
      row[outcome]+=1;
      players.set(appearance.player,row);
    });
  });
  return [...players.values()];
}

export function withLeagueResults(fixtures,matches=LEAGUE_MATCHES){
  const byMatchweek=new Map(matches.map(match=>[match.mw,match]));
  return fixtures.map(fixture=>{
    const played=byMatchweek.get(fixture.mw);
    return {...fixture,score:played?`${played.score.spurs}-${played.score.opponent}`:null};
  });
}
