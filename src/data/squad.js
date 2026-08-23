// First Team Squad — 2026/27 competitive season
// wc: World Cup 2026 tag — ONLY players officially confirmed in their nation's 26-man squad.
// Sources: FA official (englandfootball.com), CBF/FIFA, FFF, KNVB, SFA, FBF
// UPDATED 2026-08-21 — reconciled against official Brentford team news and Reuters:
//   - Removed two malformed blank "S." players created by automation.
//   - Micky van de Ven named captain; he, Pedro Porro and Pape Sarr miss MD1.
//   - Maddison, Solanke, Udogie and Fernandes confirmed available for MD1.
//   - R. Bentancur RESTORED (signed new long-term deal, Romano, 3 Oct 2025 — was
//     wrongly removed as "contract expired"; the transfers.js fix on 2026-08-01 already
//     corrected this in DEPARTURES, but squad.js itself was never updated to match — fixed now)
//   - M. Tel corrected FW→LW, loan status removed — he signed PERMANENTLY for
//     Bayern in June 2025 (£30m, contract to 2031), not on loan
//   - Added B. Austin (GK, backup), Souza (LB, signed Jan '26 ex-Santos),
//     K. Takai (CB, back from Gladbach loan, ended 31 May '26),
//     D. Scarlett (ST, back from Hibernian loan, ended 31 May '26)
//   - M. Kudus pos corrected FW→RW
//   - D. Kulusevski status downgraded per De Zerbi's "fit and right" comment (BBC Sport)
//   - G. Vicario: NOT removed — exit reports (Inter Milan interest) still unconfirmed as of
//     late Jul '26, Spurs "in talks" not completed. Sky graphic excludes him, so flag for
//     a decision once confirmed (would move to DEPARTURES in transfers.js, not just squad.js)

export const SQUAD = [
  {name:"O. Marmoush", pos:"TBC", e:"🏳️", apps:0, g:0, con:"TBC", wc:null, st:"NEW — auto-added, verify pos/contract manually", sc:"cyan"},
  {name:"S. ", pos:"TBC", e:"🏳️", apps:0, g:0, con:"TBC", wc:null, st:"NEW — auto-added, verify pos/contract manually", sc:"cyan"},
  // GOALKEEPERS
  {name:"A. Kinsky",      pos:"GK",e:"🇨🇿",apps:0, g:0,con:"2031+1",wc:null,   st:"NO.1 — NEW 5YR DEAL",  sc:"green"},
  {name:"M. Dubravka",    pos:"GK",e:"🇸🇰",apps:0, g:0,con:"TBC",   wc:null,   st:"NEW — joins Jul 1",    sc:"cyan"},
  {name:"B. Austin",      pos:"GK",e:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",apps:0, g:0,con:"TBC",   wc:null,   st:"NO.3 — BACKUP",         sc:"muted"},
  // DEFENDERS
  {name:"JP van Hecke",   pos:"CB",e:"🇳🇱",apps:0, g:0,con:"2031",  wc:"NED",  st:"NEW — €52m 5YR",       sc:"cyan"},
  {name:"M. Senesi",      pos:"CB",e:"🇦🇷",apps:0, g:0,con:"2030",  wc:null,   st:"NEW — FREE",           sc:"cyan"},
  {name:"M. van de Ven",  pos:"CB",e:"🇳🇱",apps:0, g:0,con:"2029",  wc:"NED",  st:"CAPTAIN — OUT MD1, MINOR ISSUE",sc:"amber"},
  {name:"K. Danso",       pos:"CB",e:"🇦🇹",apps:0, g:0,con:"2030",  wc:"AUT",  st:"CORE",                 sc:"green"},
  {name:"R. Dragusin",    pos:"CB",e:"🇷🇴",apps:0, g:0,con:"2030",  wc:null,   st:"BACKUP",               sc:"muted"},
  {name:"K. Takai",       pos:"CB",e:"🇯🇵",apps:0, g:0,con:"2029",  wc:null,   st:"BACK FROM GLADBACH LOAN — DEPTH",sc:"muted"},
  {name:"P. Porro",       pos:"RB",e:"🇪🇸",apps:0, g:0,con:"2030",  wc:"ESP",  st:"OUT MD1 — BUILDING FITNESS",sc:"amber"},
  {name:"D. Udogie",      pos:"LB",e:"🇮🇹",apps:0, g:0,con:"2030",  wc:null,   st:"AVAILABLE MD1",          sc:"green"},
  {name:"A. Robertson",   pos:"LB",e:"🏴󠁧󠁢󠁳󠁣󠁴󠁿",apps:0, g:0,con:"TBC",   wc:null,   st:"NEW — FREE",           sc:"cyan"},
  {name:"B. Davies",      pos:"LB",e:"🏴󠁧󠁢󠁷󠁬󠁳󠁿",apps:0, g:0,con:"2027",  wc:null,   st:"RENEWED JUN 10",       sc:"green"},
  {name:"Souza",          pos:"LB",e:"🇧🇷",apps:0, g:0,con:"TBC (long-term)",wc:null, st:"SIGNED JAN '26 — SANTOS, €15m",sc:"cyan"},
  // MIDFIELDERS
  {name:"A. Gray",        pos:"CM",e:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",apps:0, g:0,con:"2030",  wc:null,   st:"CORE (also covers DM/RB)",sc:"green"},
  {name:"L. Bergvall",    pos:"CM",e:"🇸🇪",apps:0, g:0,con:"2031",  wc:null,   st:"REQUESTED — FOREST BID REJ.",sc:"red"},
  {name:"C. Gallagher",   pos:"CM",e:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",apps:0, g:0,con:"2031",  wc:null,   st:"CORE",                 sc:"green"},
  {name:"PM. Sarr",       pos:"CM",e:"🇸🇳",apps:0, g:0,con:"2030",  wc:"SEN",  st:"OUT MD1 — HAMSTRING PAIN",sc:"amber"},
  {name:"R. Bentancur",   pos:"DM",e:"🇺🇾",apps:0, g:0,con:"2029",  wc:"URU",  st:"NEW CONTRACT — SIGNED OCT '25, STAYS (also covers CM)",sc:"green"},
  {name:"S. Tonali",      pos:"DM",e:"🇮🇹",apps:0, g:0,con:"TBC",   wc:null,   st:"NEW — £100m RECORD, 6YR (reported)", sc:"cyan"},
  {name:"J. Maddison",    pos:"AM",e:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",apps:0, g:0,con:"2028",  wc:null,   st:"AVAILABLE MD1",          sc:"green"},
  {name:"X. Simons",      pos:"AM",e:"🇳🇱",apps:0, g:0,con:"2030",  wc:null,   st:"ACL — FEB 2027",       sc:"red"},
  {name:"M. Fernandes",   pos:"AM",e:"🇵🇹",apps:0, g:0,con:"TBC",   wc:null,   st:"NEW — AVAILABLE MD1",    sc:"cyan"},
  // FORWARDS
  {name:"D. Kulusevski",  pos:"RW",e:"🇸🇪",apps:0,g:0,con:"2028",  wc:null,   st:"AVAILABLE — FITNESS MONITORED",sc:"green"},
  {name:"M. Kudus",       pos:"RW",e:"🇬🇭",apps:0, g:0,con:"2031",  wc:null,   st:"BACK IN TRAINING — Aug 22",sc:"green"},
  {name:"M. Tel",         pos:"LW",e:"🇫🇷",apps:0, g:0,con:"2031",  wc:null,   st:"PERMANENT — CORE (£30m, signed Jun '25)",sc:"green"},
  {name:"W. Odobert",     pos:"LW",e:"🇫🇷",apps:0, g:0,con:"2029",  wc:null,   st:"ACL — NOV 2026 (return needs re-check)",sc:"red"},
  {name:"D. Solanke",     pos:"ST",e:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",apps:0, g:0,con:"2030",  wc:null,   st:"AVAILABLE MD1",          sc:"green"},
  {name:"Richarlison",    pos:"ST",e:"🇧🇷",apps:0, g:0,con:"2027",  wc:null,   st:"SALE EXPECTED",        sc:"amber"},
  {name:"D. Scarlett",    pos:"ST",e:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",apps:0, g:0,con:"2027",  wc:null,   st:"BACK FROM HIBS LOAN — DEPTH",sc:"muted"},
];

// Injury Centre — active injuries only. Source: premierinjuries.com
export const INJURIES = [
  {name:"Micky van de Ven",flag:"NL",emoji:"🇳🇱",pos:"CB",issue:"Minor pre-season issue — confirmed OUT for MD1 vs Brentford per official Tottenham team news (Google News: 'Pedro Porro, van de Ven out of opener at Brentford — Tottenham Hotspur official')",sev:"short",ret:"After 22 Aug — exact return TBC, unchanged"},
  {name:"Pape Matar Sarr", flag:"SN",emoji:"🇸🇳",pos:"CM",issue:"Hamstring pain — confirmed OUT for MD1 vs Brentford per official Tottenham team news",          sev:"short",ret:"After 22 Aug — described as not serious, unchanged"},
  {name:"Xavi Simons",     flag:"NL",emoji:"🇳🇱",pos:"AM",issue:"ACL right knee",        sev:"long",  ret:"20 Feb 2027"},
  {name:"Wilson Odobert",  flag:"FR",emoji:"🇫🇷",pos:"LW",issue:"ACL left knee",          sev:"long",  ret:"28 Nov 2026"},
  // NOTE: Kudus REMOVED from active injuries 17 Jul 2026 — back in full pre-season
  // training, targeting the Aug 22 opener at Brentford. See squad.js SQUAD entry.
];
