// 2026/27 Premier League. The complete table is refreshed from structured
// standings data as results arrive across each multi-day matchweek.
export const STANDINGS = [
  {pos:1,team:"Manchester City",w:7,d:0,l:0,gf:19,ga:7,gd:12,pts:21},
  {pos:2,team:"Arsenal",w:6,d:0,l:1,gf:11,ga:5,gd:6,pts:18},
  {pos:3,team:"Brighton & Hove Albion",w:5,d:1,l:1,gf:23,ga:5,gd:18,pts:16},
  {pos:4,team:"Chelsea",w:4,d:1,l:2,gf:17,ga:13,gd:4,pts:13},
  {pos:5,team:"Liverpool",w:3,d:3,l:1,gf:9,ga:8,gd:1,pts:12},
  {pos:6,team:"Brentford",w:2,d:4,l:1,gf:13,ga:8,gd:5,pts:10},
  {pos:7,team:"Leeds United",w:2,d:4,l:1,gf:9,ga:6,gd:3,pts:10},
  {pos:8,team:"Everton",w:2,d:4,l:1,gf:8,ga:7,gd:1,pts:10},
  {pos:9,team:"Ipswich Town",w:3,d:1,l:4,gf:12,ga:16,gd:-4,pts:10},
  {pos:10,team:"Hull City",w:2,d:3,l:2,gf:8,ga:7,gd:1,pts:9},
  {pos:11,team:"Newcastle United",w:2,d:2,l:3,gf:10,ga:14,gd:-4,pts:8},
  {pos:12,team:"Aston Villa",w:2,d:2,l:3,gf:7,ga:11,gd:-4,pts:8},
  {pos:13,team:"Manchester United",w:1,d:4,l:2,gf:10,ga:10,gd:0,pts:7},
  {pos:14,team:"Crystal Palace",w:2,d:1,l:4,gf:9,ga:17,gd:-8,pts:7},
  {pos:15,team:"AFC Bournemouth",w:1,d:3,l:3,gf:9,ga:13,gd:-4,pts:6},
  {pos:16,team:"Nottingham Forest",w:1,d:3,l:4,gf:6,ga:10,gd:-4,pts:6},
  {pos:17,team:"Tottenham Hotspur",w:1,d:3,l:3,gf:6,ga:10,gd:-4,pts:6,isSpurs:true},
  {pos:18,team:"Coventry City",w:2,d:0,l:5,gf:6,ga:14,gd:-8,pts:6},
  {pos:19,team:"Fulham",w:1,d:2,l:4,gf:7,ga:10,gd:-3,pts:5},
  {pos:20,team:"Sunderland",w:1,d:1,l:5,gf:6,ga:14,gd:-8,pts:4},
];

// Latest first. Premier League results only — this sits directly under the
// PL table, so it must stay league-only. Cup fixtures (e.g. the 15 Sep
// Carabao Cup match at Liverpool) belong on the Fixtures panel, not here; a
// cup result was shown here in error previously — fixed 2026-09-21, see
// project docs. Scorers are source-backed in seasonStats.js.
export const LAST5 = [
  {date:"19 Oct",home:"TOT",away:"COV",score:"3-1",r:"W",scorer:"Maddison 14; Marmoush 58; Davies 90+6"},
  {date:"10 Oct",home:"MUN",away:"TOT",score:"1-1",r:"D",scorer:"Solanke 90+2"},
  {date:"19 Sep",home:"TOT",away:"AVL",score:"2-3",r:"L",scorer:"Gallagher 86; van Hecke 90+8"},
  {date:"12 Sep",home:"TOT",away:"EVE",score:"0-0",r:"D",scorer:""},
  {date:"5 Sep",home:"NFO",away:"TOT",score:"0-0",r:"D",scorer:""},
];

// Competitive 2026/27 totals. The Spurs match reconciliation updates these.
export const SCORERS = [
  {name:"Dominic Solanke",g:2,a:1,apps:7},
  {name:"Ben Davies",g:2,a:0,apps:2},
  {name:"Mikey Moore",g:1,a:1,apps:3},
  {name:"Sávio",g:1,a:1,apps:4},
  {name:"Conor Gallagher",g:1,a:0,apps:4},
  {name:"James Maddison",g:1,a:0,apps:4},
  {name:"Jan Paul van Hecke",g:1,a:0,apps:6},
  {name:"Kevin Danso",g:1,a:0,apps:1},
  {name:"Omar Marmoush",g:1,a:0,apps:5},
  {name:"Andy Robertson",g:0,a:2,apps:6},
  {name:"Mateus Fernandes",g:0,a:2,apps:7},
  {name:"Mohammed Kudus",g:0,a:2,apps:5},
  {name:"Archie Gray",g:0,a:1,apps:6},
  {name:"Rodrigo Bentancur",g:0,a:1,apps:6},
  {name:"Sandro Tonali",g:0,a:1,apps:5},
];

// Goals, then assists, then source order. The final index comparison makes
// ties deterministic without changing the editorial order of equal records.
export function rankScorers(players=SCORERS){
  return players.map((player,index)=>({player,index}))
    .sort((a,b)=>(b.player.g-a.player.g)||(b.player.a-a.player.a)||(a.index-b.index))
    .map(({player})=>player);
}
