// 2026/27 Premier League. The complete table is refreshed from structured
// standings data as results arrive across each multi-day matchweek.
export const STANDINGS = [
  {pos:1,team:"Manchester City",w:2,d:0,l:0,gf:6,ga:2,gd:4,pts:6},
  {pos:2,team:"Arsenal",w:2,d:0,l:0,gf:4,ga:0,gd:4,pts:6},
  {pos:3,team:"Hull City",w:2,d:0,l:0,gf:3,ga:0,gd:3,pts:6},
  {pos:4,team:"Chelsea",w:2,d:0,l:0,gf:7,ga:5,gd:2,pts:6},
  {pos:5,team:"Brentford",w:1,d:1,l:0,gf:4,ga:1,gd:3,pts:4},
  {pos:6,team:"Newcastle United",w:1,d:1,l:0,gf:4,ga:2,gd:2,pts:4},
  {pos:7,team:"Everton",w:1,d:1,l:0,gf:3,ga:1,gd:2,pts:4},
  {pos:8,team:"Leeds United",w:1,d:1,l:0,gf:2,ga:1,gd:1,pts:4},
  {pos:9,team:"Brighton & Hove Albion",w:1,d:0,l:1,gf:7,ga:4,gd:3,pts:3},
  {pos:10,team:"Manchester United",w:1,d:0,l:1,gf:5,ga:4,gd:1,pts:3},
  {pos:11,team:"Sunderland",w:1,d:0,l:1,gf:2,ga:2,gd:0,pts:3},
  {pos:12,team:"Ipswich Town",w:1,d:0,l:1,gf:4,ga:6,gd:-2,pts:3},
  {pos:13,team:"Liverpool",w:0,d:2,l:0,gf:4,ga:4,gd:0,pts:2},
  {pos:14,team:"AFC Bournemouth",w:0,d:1,l:1,gf:2,ga:3,gd:-1,pts:1},
  {pos:15,team:"Nottingham Forest",w:0,d:1,l:1,gf:2,ga:3,gd:-1,pts:1},
  {pos:16,team:"Fulham",w:0,d:0,l:2,gf:2,ga:4,gd:-2,pts:0},
  {pos:17,team:"Coventry City",w:0,d:0,l:2,gf:0,ga:4,gd:-4,pts:0},
  {pos:18,team:"Crystal Palace",w:0,d:0,l:2,gf:1,ga:6,gd:-5,pts:0},
  {pos:19,team:"Aston Villa",w:0,d:0,l:2,gf:0,ga:5,gd:-5,pts:0},
  {pos:20,team:"Tottenham Hotspur",w:0,d:0,l:2,gf:0,ga:5,gd:-5,pts:0,isSpurs:true},
];

// Latest first. Competitive and pre-season results may appear together.
export const LAST5 = [
  {date:"29 Aug",home:"TOT",away:"NEW",score:"0-2",r:"L",scorer:""},
  {date:"26 Aug",home:"TOT",away:"CHA",score:"5-1",r:"W",scorer:"Moore; Solanke; Danso; Savio; Davies"},
  {date:"22 Aug",home:"BRE",away:"TOT",score:"0-3",r:"L",scorer:""},
  {date:"15 Aug",home:"TOT",away:"HOF",score:"3-0",r:"W",scorer:"Richarlison; Moore ×2"},
  {date:"8 Aug",home:"TOT",away:"GET",score:"1-1",r:"D",scorer:"Gallagher"},
];

// Competitive 2026/27 totals. The Spurs match reconciliation updates these.
export const SCORERS = [
  {name:"Mikey Moore",g:1,a:0,apps:1},
  {name:"Dominic Solanke",g:1,a:0,apps:1},
  {name:"Kevin Danso",g:1,a:0,apps:1},
  {name:"Savio",g:1,a:1,apps:1},
  {name:"Ben Davies",g:1,a:0,apps:1},
];
