// 2026/27 Premier League. The complete table is refreshed from structured
// standings data as results arrive across each multi-day matchweek.
export const STANDINGS = [
  {pos:1,team:"Arsenal",w:4,d:0,l:0,gf:8,ga:1,gd:7,pts:12},
  {pos:2,team:"Manchester City",w:4,d:0,l:0,gf:8,ga:2,gd:6,pts:12},
  {pos:3,team:"Leeds United",w:2,d:2,l:0,gf:7,ga:3,gd:4,pts:8},
  {pos:4,team:"Hull City",w:2,d:2,l:0,gf:5,ga:2,gd:3,pts:8},
  {pos:5,team:"Brighton & Hove Albion",w:2,d:1,l:1,gf:13,ga:5,gd:8,pts:7},
  {pos:6,team:"Chelsea",w:2,d:1,l:1,gf:10,ga:9,gd:1,pts:7},
  {pos:7,team:"Brentford",w:1,d:3,l:0,gf:7,ga:4,gd:3,pts:6},
  {pos:8,team:"Liverpool",w:1,d:3,l:0,gf:6,ga:4,gd:2,pts:6},
  {pos:9,team:"Everton",w:1,d:3,l:0,gf:5,ga:3,gd:2,pts:6},
  {pos:10,team:"Ipswich Town",w:2,d:0,l:2,gf:7,ga:10,gd:-3,pts:6},
  {pos:11,team:"Nottingham Forest",w:1,d:2,l:1,gf:4,ga:4,gd:0,pts:5},
  {pos:12,team:"Newcastle United",w:1,d:2,l:1,gf:7,ga:8,gd:-1,pts:5},
  {pos:13,team:"Manchester United",w:1,d:1,l:2,gf:7,ga:7,gd:0,pts:4},
  {pos:14,team:"Sunderland",w:1,d:1,l:2,gf:3,ga:5,gd:-2,pts:4},
  {pos:15,team:"AFC Bournemouth",w:0,d:3,l:1,gf:6,ga:7,gd:-1,pts:3},
  {pos:16,team:"Crystal Palace",w:1,d:0,l:3,gf:6,ga:11,gd:-5,pts:3},
  {pos:17,team:"Tottenham Hotspur",w:0,d:2,l:2,gf:0,ga:5,gd:-5,pts:2,isSpurs:true},
  {pos:18,team:"Fulham",w:0,d:1,l:3,gf:4,ga:7,gd:-3,pts:1},
  {pos:19,team:"Aston Villa",w:0,d:1,l:3,gf:1,ga:7,gd:-6,pts:1},
  {pos:20,team:"Coventry City",w:0,d:0,l:4,gf:0,ga:10,gd:-10,pts:0},
];

// Latest first. Competitive and pre-season results may appear together.
export const LAST5 = [
  {date:"15 Sep",home:"LIV",away:"TOT",score:"3-1",r:"L",scorer:"Gallagher 69'"},
  {date:"12 Sep",home:"TOT",away:"EVE",score:"0-0",r:"D",scorer:""},
  {date:"5 Sep",home:"NFO",away:"TOT",score:"0-0",r:"D",scorer:""},
  {date:"29 Aug",home:"TOT",away:"NEW",score:"0-2",r:"L",scorer:""},
  {date:"26 Aug",home:"TOT",away:"CHA",score:"5-1",r:"W",scorer:"Moore 41'; Solanke 45'; Danso 67'; Sávio 82'; Davies 85'"},
];

// Competitive 2026/27 totals. The Spurs match reconciliation updates these.
export const SCORERS = [
  {name:"Mikey Moore",g:1,a:1,apps:3},
  {name:"Sávio",g:1,a:1,apps:4},
  {name:"Ben Davies",g:1,a:0,apps:1},
  {name:"Conor Gallagher",g:1,a:0,apps:3},
  {name:"Dominic Solanke",g:1,a:0,apps:6},
  {name:"Kevin Danso",g:1,a:0,apps:1},
  {name:"Mateus Fernandes",g:0,a:2,apps:6},
  {name:"Archie Gray",g:0,a:1,apps:5},
  {name:"Rodrigo Bentancur",g:0,a:1,apps:6},
];
