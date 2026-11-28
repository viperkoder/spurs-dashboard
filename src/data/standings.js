// 2026/27 Premier League. The complete table is refreshed from structured
// standings data as results arrive across each multi-day matchweek.
export const STANDINGS = [
  {pos:1,team:"Arsenal",w:9,d:1,l:1,gf:17,ga:7,gd:10,pts:28},
  {pos:2,team:"Brighton & Hove Albion",w:7,d:1,l:3,gf:26,ga:9,gd:17,pts:22},
  {pos:3,team:"Manchester City",w:7,d:1,l:3,gf:22,ga:14,gd:8,pts:22},
  {pos:4,team:"Liverpool",w:6,d:3,l:2,gf:18,ga:10,gd:8,pts:21},
  {pos:5,team:"AFC Bournemouth",w:5,d:3,l:3,gf:18,ga:14,gd:4,pts:18},
  {pos:6,team:"Brentford",w:4,d:5,l:2,gf:20,ga:11,gd:9,pts:17},
  {pos:7,team:"Leeds United",w:4,d:5,l:2,gf:14,ga:9,gd:5,pts:17},
  {pos:8,team:"Chelsea",w:5,d:1,l:6,gf:22,ga:23,gd:-1,pts:16},
  {pos:9,team:"Everton",w:4,d:4,l:3,gf:12,ga:14,gd:-2,pts:16},
  {pos:10,team:"Tottenham Hotspur",w:4,d:3,l:4,gf:12,ga:11,gd:1,pts:15,isSpurs:true},
  {pos:11,team:"Hull City",w:3,d:5,l:3,gf:13,ga:11,gd:2,pts:14},
  {pos:12,team:"Aston Villa",w:3,d:5,l:3,gf:14,ga:17,gd:-3,pts:14},
  {pos:13,team:"Newcastle United",w:3,d:4,l:4,gf:15,ga:18,gd:-3,pts:13},
  {pos:14,team:"Nottingham Forest",w:3,d:3,l:6,gf:12,ga:17,gd:-5,pts:12},
  {pos:15,team:"Coventry City",w:4,d:0,l:7,gf:13,ga:21,gd:-8,pts:12},
  {pos:16,team:"Fulham",w:2,d:5,l:4,gf:11,ga:13,gd:-2,pts:11},
  {pos:17,team:"Ipswich Town",w:3,d:2,l:6,gf:15,ga:22,gd:-7,pts:11},
  {pos:18,team:"Sunderland",w:2,d:3,l:6,gf:8,ga:17,gd:-9,pts:9},
  {pos:19,team:"Manchester United",w:1,d:5,l:5,gf:14,ga:23,gd:-9,pts:8},
  {pos:20,team:"Crystal Palace",w:2,d:1,l:8,gf:12,ga:27,gd:-15,pts:7},
];

// Latest first. Premier League results only — this sits directly under the
// PL table, so it must stay league-only. Cup fixtures (e.g. the 15 Sep
// Carabao Cup match at Liverpool) belong on the Fixtures panel, not here; a
// cup result was shown here in error previously — fixed 2026-09-21, see
// project docs. Scorers are source-backed in seasonStats.js.
export const LAST5 = [
  {date:"21 Nov",home:"TOT",away:"IPS",score:"2-0",r:"W",scorer:"Williams-Barnett 15; Solanke 51"},
  {date:"7 Nov",home:"LEE",away:"TOT",score:"1-0",r:"L",scorer:""},
  {date:"31 Oct",home:"TOT",away:"CRY",score:"2-0",r:"W",scorer:"Gray 25; van Hecke 73"},
  {date:"24 Oct",home:"CHE",away:"TOT",score:"0-2",r:"W",scorer:""},
  {date:"19 Oct",home:"TOT",away:"COV",score:"3-1",r:"W",scorer:"Maddison 14; Marmoush 58; Davies 90+6"},
];

// Competitive 2026/27 totals. The Spurs match reconciliation updates these.
export const SCORERS = [
  {name:"Dominic Solanke",g:3,a:1,apps:10},
  {name:"Ben Davies",g:2,a:0,apps:2},
  {name:"Jan Paul van Hecke",g:2,a:0,apps:9},
  {name:"Archie Gray",g:1,a:1,apps:9},
  {name:"Mikey Moore",g:1,a:1,apps:3},
  {name:"Sávio",g:1,a:1,apps:5},
  {name:"Conor Gallagher",g:1,a:0,apps:7},
  {name:"James Maddison",g:1,a:0,apps:5},
  {name:"Kevin Danso",g:1,a:0,apps:1},
  {name:"Luca Williams-Barnett",g:1,a:0,apps:0},
  {name:"Omar Marmoush",g:1,a:0,apps:8},
  {name:"Mohammed Kudus",g:0,a:3,apps:8},
  {name:"Andy Robertson",g:0,a:2,apps:9},
  {name:"Mateus Fernandes",g:0,a:2,apps:10},
  {name:"Pedro Porro",g:0,a:1,apps:6},
  {name:"Rodrigo Bentancur",g:0,a:1,apps:7},
  {name:"Sandro Tonali",g:0,a:1,apps:7},
];

// Goals, then assists, then source order. The final index comparison makes
// ties deterministic without changing the editorial order of equal records.
export function rankScorers(players=SCORERS){
  return players.map((player,index)=>({player,index}))
    .sort((a,b)=>(b.player.g-a.player.g)||(b.player.a-a.player.a)||(a.index-b.index))
    .map(({player})=>player);
}
