// 2026/27 Premier League. The complete table is refreshed from structured
// standings data as results arrive across each multi-day matchweek.
export const STANDINGS = [
  {pos:1,team:"Manchester City",w:2,d:0,l:0,gf:6,ga:2,gd:4,pts:6},
  {pos:2,team:"Brighton & Hove Albion",w:1,d:0,l:0,gf:4,ga:0,gd:4,pts:3},
  {pos:3,team:"Arsenal",w:1,d:0,l:0,gf:3,ga:0,gd:3,pts:3},
  {pos:4,team:"Brentford",w:1,d:0,l:0,gf:3,ga:0,gd:3,pts:3},
  {pos:5,team:"Everton",w:1,d:0,l:0,gf:2,ga:0,gd:2,pts:3},
  {pos:6,team:"Hull City",w:1,d:0,l:0,gf:2,ga:0,gd:2,pts:3},
  {pos:7,team:"Chelsea",w:1,d:0,l:0,gf:3,ga:2,gd:1,pts:3},
  {pos:8,team:"Ipswich Town",w:1,d:0,l:0,gf:2,ga:1,gd:1,pts:3},
  {pos:9,team:"Leeds United",w:1,d:0,l:0,gf:1,ga:0,gd:1,pts:3},
  {pos:10,team:"Liverpool",w:0,d:1,l:0,gf:2,ga:2,gd:0,pts:1},
  {pos:11,team:"Newcastle United",w:0,d:1,l:0,gf:2,ga:2,gd:0,pts:1},
  {pos:12,team:"Fulham",w:0,d:0,l:1,gf:2,ga:3,gd:-1,pts:0},
  {pos:13,team:"AFC Bournemouth",w:0,d:0,l:1,gf:1,ga:2,gd:-1,pts:0},
  {pos:14,team:"Sunderland",w:0,d:0,l:1,gf:1,ga:2,gd:-1,pts:0},
  {pos:15,team:"Nottingham Forest",w:0,d:0,l:1,gf:0,ga:1,gd:-1,pts:0},
  {pos:16,team:"Manchester United",w:0,d:0,l:1,gf:0,ga:2,gd:-2,pts:0},
  {pos:17,team:"Coventry City",w:0,d:0,l:1,gf:0,ga:3,gd:-3,pts:0},
  {pos:18,team:"Tottenham Hotspur",w:0,d:0,l:1,gf:0,ga:3,gd:-3,pts:0,isSpurs:true},
  {pos:19,team:"Aston Villa",w:0,d:0,l:1,gf:0,ga:4,gd:-4,pts:0},
  {pos:20,team:"Crystal Palace",w:0,d:0,l:2,gf:1,ga:6,gd:-5,pts:0},
];

// Latest first. Competitive and pre-season results may appear together.
export const LAST5 = [
  {date:"22 Aug",home:"BRE",away:"TOT",score:"3-0",r:"L",scorer:""},
  {date:"15 Aug",home:"TOT",away:"HOF",score:"3-0",r:"W",scorer:"Richarlison; Moore ×2"},
  {date:"8 Aug", home:"TOT",away:"GET",score:"1-1",r:"D",scorer:"Gallagher"},
  {date:"1 Aug", home:"TOT",away:"CHE",score:"2-1",r:"W",scorer:"Tonali; Richarlison"},
  {date:"29 Jul",home:"TOT",away:"SYD",score:"1-1",r:"W",scorer:"Tel · won 4-2 pens"},
];

// Competitive 2026/27 totals. The Spurs match reconciliation updates these.
export const SCORERS = [];
