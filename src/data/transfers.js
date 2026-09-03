// Transfer Intelligence — Summer 2026
// Edit this file alone for transfer rumours, confirmed signings, departures.
// Last manual verification pass: 3 Sep 2026 (official club sources take priority).
// Automation was down 4-17 Jul (stale project path + node PATH issue under
// launchd) — fixed via automation/install-launchd.sh, see automation/SETUP.md.

// The English summer window closed on 1 Sep. Archived targets are removed
// rather than left looking live; the section reopens for January reporting.
export const TRANSFER_BRIEFS = [];

export const CONFIRMED = [
  {
    player:"Tosin Adarabioyo", e:"🏴󠁧󠁢󠁥󠁮󠁧󠁿", from:"Chelsea", fee:"£10m reported", role:"CB", date:"2026-09-01",
    note:"Official Tottenham signing. Premier League-experienced centre-back; assigned shirt number 4. Sky Sports reported a £10m fee."
  },
  {
    player:"Mykhailo Mudryk", e:"🇺🇦", from:"Chelsea", fee:"Season-long loan", role:"LW", date:"2026-09-01",
    note:"Official Tottenham loan for 2026/27. Reported £75m option to buy; the option is not booked as committed spend."
  },
  {
    player:"Omar Marmoush", e:"🇪🇬", from:"Manchester City", fee:"Season-long loan", role:"FW", date:"2026-08-27",
    note:"Official Tottenham announcement: season-long loan with an obligation to make the move permanent in summer 2027. Shirt number 22; available for the Newcastle match."
  },
  {
    player:"Savio", e:"🇧🇷", from:"Manchester City", fee:"£85m reported", role:"RW", date:"2026-08-22",
    note:"Confirmed signing and already debuted against Charlton. Reported £85m total package."
  },
  {
    player:"Sandro Tonali", e:"🇮🇹", from:"Newcastle", fee:"100m", role:"DM", date:"2026-07-03",
    note:"Confirmed by BBC, Sky Sports, football.london and Romano. Initial fee £92.5m rising to £100m with add-ons. 6-year deal. De Zerbi connection central to move. Role confirmed as DM (his primary position at Milan/Newcastle)."
  },
  // Newest first
  {
    player:"Mateus Fernandes", e:"🇵🇹", from:"West Ham", fee:"85m", role:"CM", date:"1 Jul 2026",
    note:"CLUB RECORD. Romano + Ornstein confirmed. Medical underway. Beats Man Utd to signing."
  },
  {
    player:"JP van Hecke", e:"🇳🇱", from:"Brighton", fee:"52m", role:"CB", date:"Jun 2026",
    note:"5-yr deal. De Zerbi reunion. At WC with Netherlands."
  },
  {
    player:"A. Robertson", e:"🏴󠁧󠁢󠁳󠁣󠁴󠁿", from:"Liverpool", fee:"Free", role:"LB", date:"Jun 2026",
    note:"Experience and cover at LB."
  },
  {
    player:"M. Senesi", e:"🇦🇷", from:"Bournemouth", fee:"Free", role:"CB", date:"Jun 2026",
    note:"AFC Bournemouth's Players' Player of the Year. 4-yr deal."
  },
  {
    player:"M. Dubravka", e:"🇸🇰", from:"Burnley", fee:"Free", role:"GK", date:"24 Jun 2026",
    note:"Joins Jul 1. Backup to Kinsky. 60 Slovakia caps."
  },
];

// NOTE: R. Bentancur REMOVED 31 Jul 2026 — was incorrectly listed as a
// free departure ("contract expired"). Verified against Transfermarkt +
// multiple outlets: Tottenham actually tied him to a NEW long-term
// contract (reported Oct 2025) — he was never a confirmed departure.
// Earlier data appears to have misread a renewal story as an expiry.
export const DEPARTURES = [
  {player:"Dane Scarlett", note:"COMPLETED 1 Sep — permanent transfer to Leyton Orient; fee undisclosed. Confirmed by Tottenham."},
  {player:"Kevin Danso", note:"COMPLETED 1 Sep — Sunderland loan for 2026/27 with a performance-related obligation to buy. Confirmed by Tottenham."},
  {player:"Pape Matar Sarr", note:"COMPLETED 1 Sep — Juventus loan for 2026/27 with a performance-related obligation to buy. Confirmed by Tottenham."},
  {player:"Souza", note:"COMPLETED — season-long loan to FC Porto."},
  {player:"Mikey Moore", note:"COMPLETED — season-long loan to FC Köln."},
  {player:"Kota Takai", note:"COMPLETED — season-long loan to Sint-Truidense VV. Confirmed by Tottenham."},
  {player:"J. Donley", note:"BBC Sport confirms: Luton Town have signed Tottenham forward Donley on loan. Season-long loan; no fee. Corroborated by SpursWeb ('Tottenham send player De Zerbi loves on loan to Luton Town for the season') and talkSPORT/Google News ('Wilshere lands Spurs youngster on loan despite historic north London rivalry'). Add to DEPARTURES as a confirmed loan exit."},
  {player:"G. Vicario", note:"COMPLETED — loan to Inter Milan with a reported £8.6m option to buy."},
  {player:"R. Dragusin", note:"COMPLETED — Fiorentina loan with a reported £21.5m obligation to buy."},
  {player:"D. Spence", note:"COMPLETED 15 Aug — permanent transfer to Inter Milan. Reported fee £24m."},
  {player:"C. Melia", note:"Lincoln City sign Spurs goalkeeper Melia on loan — confirmed per BBC Sport. Loan departure, no fee."},
  {player:"Manor Solomon", note:"COMPLETED — permanent transfer to West Ham. Reported initial fee £5m, potentially £7m with add-ons, plus a 10% sell-on clause."},
  {player:"N. Lankshear", note:"COMPLETED — permanent transfer to Middlesbrough; reported £14m plus sell-on and matching rights."},
  {player:"A. Phillips", note:"COMPLETED — permanent transfer to Middlesbrough; reported £7m plus up to £13m in add-ons."},
  {player:"A. Devine", note:"COMPLETED — permanent transfer to Preston North End; reported £6m plus sell-on and matching rights."},
  {player:"M. Akhamrich", note:"Tottenham winger Akhamrich joins Leyton Orient on loan — confirmed per BBC Sport. Loan move, no fee."},
  {player:"C. Romero", note:"COMPLETED — permanent transfer to Atlético Madrid for a reported £34m, with Spurs retaining a 15% sell-on clause. Four-year contract plus an optional year."},
  {player:"J. Palhinha", note:"Loan spell ended and Tottenham's move to sign him permanently is now 100% dead (reliable reporting, 10 Jul) — the player has posted a farewell message to Spurs fans, contract expired 30 Jun. No permanent destination confirmed yet: Sporting CP are the most consistent link (Palhinha open to a return to Portugal) with Bayern wanting a sale rather than a loan; Benfica, Juventus and Aston Villa also mentioned."},
  {player:"Luka Vuskovic", note:"Sale to Brighton agreed — £46m (BBC), with a significant sell-on clause. 19-year-old Croatian CB had never made a senior Spurs appearance."},
  {player:"Y. Bissouma",     note:"Released — contract expired Jun 30 (Official)"},
  {player:"A. Veliz",        note:"SOLD — Bahia £7.8m + add-ons + 20% sell-on. Effective 1 Jul 2026 (Official)"},
  {player:"Kolo Muani",      note:"Loan ended — returned to PSG"},
];

// Anonymous transfer intelligence — sourced from SpursWeb/insider aggregators
export const ANON_BRIEFS = [
  {
    date:"3 Sept",
    text:"The English window is closed and Tottenham's incoming business is complete. Richarlison is the one remaining live exit thread because Turkey's window is still open; Trabzonspor interest is reported, but no club agreement has been reached."
  },
];
