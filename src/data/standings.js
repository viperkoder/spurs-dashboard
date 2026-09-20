// 2026/27 Premier League. The complete table is refreshed from structured
// standings data as results arrive across each multi-day matchweek.
export const STANDINGS = [
  {pos:1,team:"Manchester City",w:5,d:0,l:0,gf:13,ga:5,gd:8,pts:15},
  {pos:2,team:"Arsenal",w:4,d:0,l:1,gf:8,ga:4,gd:4,pts:12},
  {pos:3,team:"Brighton & Hove Albion",w:3,d:1,l:1,gf:16,ga:5,gd:11,pts:10},
  {pos:4,team:"Brentford",w:2,d:3,l:0,gf:10,ga:4,gd:6,pts:9},
  {pos:5,team:"Leeds United",w:2,d:3,l:0,gf:7,ga:3,gd:4,pts:9},
  {pos:6,team:"Liverpool",w:2,d:3,l:0,gf:7,ga:4,gd:3,pts:9},
  {pos:7,team:"Everton",w:2,d:3,l:0,gf:6,ga:3,gd:3,pts:9},
  {pos:8,team:"Hull City",w:2,d:2,l:1,gf:6,ga:4,gd:2,pts:8},
  {pos:9,team:"Newcastle United",w:2,d:2,l:1,gf:9,ga:9,gd:0,pts:8},
  {pos:10,team:"Chelsea",w:2,d:1,l:2,gf:10,ga:12,gd:-2,pts:7},
  {pos:11,team:"Ipswich Town",w:2,d:0,l:3,gf:7,ga:11,gd:-4,pts:6},
  {pos:12,team:"Nottingham Forest",w:1,d:2,l:2,gf:4,ga:5,gd:-1,pts:5},
  {pos:13,team:"Manchester United",w:1,d:1,l:2,gf:7,ga:7,gd:0,pts:4},
  {pos:14,team:"Sunderland",w:1,d:1,l:3,gf:6,ga:10,gd:-4,pts:4},
  {pos:15,team:"Crystal Palace",w:1,d:1,l:3,gf:6,ga:11,gd:-5,pts:4},
  {pos:16,team:"Aston Villa",w:1,d:1,l:3,gf:4,ga:9,gd:-5,pts:4},
  {pos:17,team:"AFC Bournemouth",w:0,d:3,l:2,gf:6,ga:8,gd:-2,pts:3},
  {pos:18,team:"Coventry City",w:1,d:0,l:4,gf:1,ga:10,gd:-9,pts:3},
  {pos:19,team:"Tottenham Hotspur",w:0,d:2,l:3,gf:2,ga:8,gd:-6,pts:2,isSpurs:true},
  {pos:20,team:"Fulham",w:0,d:1,l:3,gf:4,ga:7,gd:-3,pts:1},
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
