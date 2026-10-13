// 2026/27 Premier League. The complete table is refreshed from structured
// standings data as results arrive across each multi-day matchweek.
export const STANDINGS = [
  {pos:1,team:"Manchester City",w:6,d:0,l:0,gf:16,ga:5,gd:11,pts:18},
  {pos:2,team:"Arsenal",w:5,d:0,l:1,gf:10,ga:5,gd:5,pts:15},
  {pos:3,team:"Brighton & Hove Albion",w:4,d:1,l:1,gf:18,ga:5,gd:13,pts:13},
  {pos:4,team:"Brentford",w:2,d:4,l:0,gf:12,ga:6,gd:6,pts:10},
  {pos:5,team:"Everton",w:2,d:4,l:0,gf:8,ga:5,gd:3,pts:10},
  {pos:6,team:"Chelsea",w:3,d:1,l:2,gf:15,ga:13,gd:2,pts:10},
  {pos:7,team:"Leeds United",w:2,d:3,l:1,gf:8,ga:5,gd:3,pts:9},
  {pos:8,team:"Hull City",w:2,d:3,l:1,gf:8,ga:6,gd:2,pts:9},
  {pos:9,team:"Liverpool",w:2,d:3,l:1,gf:7,ga:7,gd:0,pts:9},
  {pos:10,team:"Ipswich Town",w:3,d:0,l:3,gf:9,ga:12,gd:-3,pts:9},
  {pos:11,team:"Newcastle United",w:2,d:2,l:2,gf:10,ga:13,gd:-3,pts:8},
  {pos:12,team:"Crystal Palace",w:2,d:1,l:3,gf:9,ga:12,gd:-3,pts:7},
  {pos:13,team:"Manchester United",w:1,d:3,l:2,gf:9,ga:9,gd:0,pts:6},
  {pos:14,team:"Coventry City",w:2,d:0,l:4,gf:5,ga:11,gd:-6,pts:6},
  {pos:15,team:"Nottingham Forest",w:1,d:2,l:3,gf:5,ga:8,gd:-3,pts:5},
  {pos:16,team:"Aston Villa",w:1,d:2,l:3,gf:6,ga:11,gd:-5,pts:5},
  {pos:17,team:"Sunderland",w:1,d:1,l:4,gf:6,ga:12,gd:-6,pts:4},
  {pos:18,team:"AFC Bournemouth",w:0,d:3,l:3,gf:7,ga:13,gd:-6,pts:3},
  {pos:19,team:"Tottenham Hotspur",w:0,d:3,l:3,gf:3,ga:9,gd:-6,pts:3,isSpurs:true},
  {pos:20,team:"Fulham",w:0,d:2,l:4,gf:6,ga:10,gd:-4,pts:2},
];

// Latest first. Premier League results only — this sits directly under the
// PL table, so it must stay league-only. Cup fixtures (e.g. the 15 Sep
// Carabao Cup match at Liverpool) belong on the Fixtures panel, not here; a
// cup result was shown here in error previously — fixed 2026-09-21, see
// project docs. Scorers are source-backed in seasonStats.js.
export const LAST5 = [
  {date:"10 Oct",home:"MUN",away:"TOT",score:"1-1",r:"D",scorer:"Solanke 90+2"},
  {date:"19 Sep",home:"TOT",away:"AVL",score:"2-3",r:"L",scorer:"Gallagher 86; van Hecke 90+8"},
  {date:"12 Sep",home:"TOT",away:"EVE",score:"0-0",r:"D",scorer:""},
  {date:"5 Sep",home:"NFO",away:"TOT",score:"0-0",r:"D",scorer:""},
  {date:"29 Aug",home:"TOT",away:"NEW",score:"0-2",r:"L",scorer:""},
];

// Competitive 2026/27 totals. The Spurs match reconciliation updates these.
export const SCORERS = [
  {name:"Mikey Moore",g:1,a:1,apps:3},
  {name:"Sávio",g:1,a:1,apps:4},
  {name:"Ben Davies",g:1,a:0,apps:1},
  {name:"Conor Gallagher",g:1,a:0,apps:3},
  {name:"Dominic Solanke",g:2,a:0,apps:6},
  {name:"Jan Paul van Hecke",g:1,a:0,apps:6},
  {name:"Kevin Danso",g:1,a:0,apps:1},
  {name:"Mateus Fernandes",g:0,a:2,apps:6},
  {name:"Archie Gray",g:0,a:1,apps:5},
  {name:"Rodrigo Bentancur",g:0,a:1,apps:6},
  {name:"Sandro Tonali",g:0,a:1,apps:4},
  {name:"Mohammed Kudus",g:0,a:1,apps:4},
  {name:"Andy Robertson",g:0,a:1,apps:5},
];

// Goals, then assists, then source order. The final index comparison makes
// ties deterministic without changing the editorial order of equal records.
export function rankScorers(players=SCORERS){
  return players.map((player,index)=>({player,index}))
    .sort((a,b)=>(b.player.g-a.player.g)||(b.player.a-a.player.a)||(a.index-b.index))
    .map(({player})=>player);
}
