// Transfer Intelligence — Summer 2026
// Edit this file alone for transfer rumours, confirmed signings, departures.
// Last manual verification pass: 21 Aug 2026 (cross-checked against Sky Sports and Reuters).
// Automation was down 4-17 Jul (stale project path + node PATH issue under
// launchd) — fixed via automation/install-launchd.sh, see automation/SETUP.md.

export const TRANSFER_BRIEFS = [
  // NOTE: Fernandes REMOVED — confirmed signing as of 1 Jul 2026
  // NOTE: Tonali REMOVED — confirmed signing as of 3 Jul 2026, see CONFIRMED below
  // NOTE: Rafael Leao REMOVED 9 Aug 2026 — interest cooled, never became a
  // formal pursuit. Talks pre-World Cup were "exploratory rather than
  // formal" and did not progress; De Zerbi's staff have shifted focus to
  // other attacking options that better fit budget/tactics. (Yahoo Sports,
  // 9 Aug) Re-add only if fresh reporting revives it.
  {
    player:"Carlos Baleba", e:"🇨🇲", from:"Brighton", fee:"100m", like:32, st:"warm", date:"14 Jul (no update since)",
    brief:"One of three De Zerbi ex-Brighton targets (with Verbruggen; Van Hecke already signed). De Zerbi worked closely with Baleba at Brighton — 37 games together — and rates him highly. His valuation has climbed sharply since De Zerbi signed him for £23.3m in 2024, with reports now pricing him as high as £100m, which has cooled the pace of any move. Man Utd interest previously reported has gone quiet; Spurs could revisit if that move stays dead. Club acknowledges landing all three Brighton targets in one window is unlikely. STATUS CHECK 9 Aug: no fresh reporting found since mid-June — trimmed a few points to reflect the lead has genuinely gone quiet, not just under-covered. Not marked dead; revisit if reporting resumes."
  },
  {
    player:"Bart Verbruggen", e:"🇳🇱", from:"Brighton", fee:"30m", like:30, st:"warm", date:"14 Jul (no update since)",
    brief:"Still De Zerbi's preferred long-term No.1 — Dubravka was always a short-term/backup solution. Verbruggen remains attracting interest from elsewhere in Europe, so competition is a live risk. Vicario sale proceeds earmarked to help fund this move. Considered the more advanced of the two remaining Brighton targets given goalkeeper is a clearer positional priority than a third-choice CM. STATUS CHECK 9 Aug: no fresh reporting found since ~June — genuinely quiet, likelihood trimmed slightly to reflect the gap, not treated as dead."
  },
  // NOTE: Vuskovic REMOVED — sale to Brighton confirmed, see DEPARTURES below
  // NOTE: Eli Junior Kroupi REMOVED 9 Aug 2026 — dead. Bournemouth told him
  // directly he won't be sold this summer; club is preparing for its first
  // Europa League campaign and plans to reassess his value in ~a year.
  // "The Kroupi dream is over" per one outlet. (The i Paper via HotspurHQ,
  // Spurs Web — 9 Aug)
  // NOTE: Maghnes Akliouche REMOVED 9 Aug 2026 — confirmed gone to PSG,
  // "Here We Go" (Fabrizio Romano). Matches this brief's own prior read
  // that PSG were firmly leading the race.
  {
    player:"Cody Gakpo", e:"🇳🇱", from:"Liverpool", fee:"60m+", like:52, st:"warm", date:"16 Aug",
    brief:"Reactivated after fresh Dutch and German reporting. Tottenham have opened concrete discussions and Gakpo is reportedly receptive, but Liverpool have not approved a sale and reports of a completed agreement are disputed. Treat as a live negotiation, not a done deal; Liverpool's replacement plans may determine whether it advances."
  },
  {
    player:"Victor Osimhen", e:"🇳🇬", from:"Galatasaray", fee:"55m", like:42, st:"warm", date:"9 Aug",
    brief:"Promoted from anonymous-only chatter (see ANON_BRIEFS 3-4 Aug) to a proper brief — this has now graduated to multiple named outlets reporting a formal approach. Tottenham have proposed £50-55m; Galatasaray want £65m, a £10-15m gap that's the main obstacle. Reports (Caught Offside, citing agent-industry sources; thehardtackle) say Spurs have 'received sporting approval to begin formal negotiations' and personal terms aren't expected to be a hurdle. Would be a 7th major signing after an already record summer (£230m+ spent on 6 arrivals), which is the real question mark — not the player's willingness, but whether the finances stack up. Also being weighed alongside continued interest in Cody Gakpo."
  },
  {
    player:"Endrick", e:"🇧🇷", from:"Real Madrid", fee:"Loan", like:35, st:"warm", date:"9 Aug",
    brief:"Real Madrid forward, spent last season on loan at Lyon, now drawing interest from up to 8 Premier League clubs (Chelsea, Arsenal, Liverpool, Man City, Man Utd, Tottenham, Aston Villa, Fulham per TEAMtalk). The detail that favours Spurs: Real Madrid's own preference is a straight loan with no purchase option, and Tottenham are one of only three interested clubs (with Villa and Fulham) willing to do a loan-only deal — Chelsea, Arsenal, Liverpool, City and Man Utd have all said they'd only consider it with a buy option attached, which clashes with what Real actually want. That structural fit is a genuine edge, but with so many suitors circling Pérez's decision, treat as a real but competitive loan pursuit rather than advanced."
  },
  {
    player:"Georges Mikautadze", e:"🇬🇪", from:"Villarreal", fee:"TBC (€50-60m mooted, unconfirmed)", like:26, st:"warm", date:"9 Aug",
    brief:"Georgian forward (13 goals, 6 assists in 32 La Liga appearances last season; joint-top scorer at Euro 2024), seen as a possible fit given Solanke's injury and Kolo Muani's struggles in front of goal. Sourced to Paul O'Keefe (7 Aug) — one of the anonymous accounts already on the Twitter Pulse tracking list — who is explicit that 'no formal approach has yet been made,' just close monitoring. Per the project's own weighting rule, anon-only/no-Newsworthy-corroboration chatter caps around 45%; this is earlier-stage than that (pre-approach), so kept well under. Fee figures floating in some outlets (€50-60m) are unconfirmed by a named source — treat as market chatter, not a real asking price yet."
  },
];

export const CONFIRMED = [
  {
    player:"Savinho", e:"🏳️", from:"Man City", fee:"£75m", role:"TBC", date:"2026-08-22",
    note:"Confirmed by BBC Sport ('Spurs agree £75m deal for Man City winger Savinho'). Previously listed as agreement reached/pending completion at 92% likelihood. Move to CONFIRMED. Upgrade from the prior 'club-to-club agreement' note — BBC Sport language 'agree' is sufficient for confirmation here. The Guardian also references the double deal in passing. Remove from TRANSFER_BRIEFS and add to CONFIRMED array. — auto-added, verify flag/role manually"
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
  {player:"M. van de Ven (contract update, not departure)", note:"NOT a departure — flagging here for squad.js update only. BBC Sport confirms Van de Ven has signed a new long-term deal. squad.js already shows con:2029 and 'CORE — NEW LONG-TERM DEAL' but the contract end date may need updating once full terms are published. The BBC headline 'Van de Ven signs new long-term deal' and the earlier 'close to agreeing' headline confirm this is done."},
  {player:"D. Spence", note:"COMPLETED 15 Aug — permanent transfer to Inter Milan. Reported fee approximately £30m; contract to 2031. Confirmed by Inter, BBC, Sky, ESPN and Reuters."},
  {player:"Mikey Moore", note:"NEW 9 Aug — promoted from ANON_BRIEFS now that it's Romano-attributed. FC Köln have submitted an official bid for a season-long loan; Romano (exclusive, 2 Aug): 'negotiations at advanced stages with #THFC as deal could be completed next week with Moore open to the move.' Several other European clubs have shown interest but Köln are the clear frontrunners. Loan only, not a permanent exit."},
  {player:"C. Melia", note:"Lincoln City sign Spurs goalkeeper Melia on loan — confirmed per BBC Sport. Loan departure, no fee."},
  {player:"Manor Solomon", note:"COMPLETED — permanent transfer to West Ham. Reported initial fee £5m, potentially £7m with add-ons, plus a 10% sell-on clause."},
  {player:"N. Lankshear", note:"Middlesbrough sign Tottenham striker Lankshear — confirmed per BBC Sport. Permanent departure; no fee reported in headline."},
  {player:"M. Akhamrich", note:"Tottenham winger Akhamrich joins Leyton Orient on loan — confirmed per BBC Sport. Loan move, no fee."},
  {player:"G. Vicario", note:"Juventus CEO Giovanni Carnevali has confirmed direct interest; Spalletti has spoken to Vicario personally. Spurs have set a €15m asking price (negotiable). Complication: Vicario wants ~€4m/yr after tax, above Juve's wage discipline, and Juve's actual first choice is Aston Villa's Emi Martínez (who Villa won't sell) — Vicario is the fallback. A loan-with-option is being discussed as a compromise. Drags into August."},
  {player:"C. Romero", note:"COMPLETED — permanent transfer to Atlético Madrid for a reported £34m, with Spurs retaining a 15% sell-on clause. Four-year contract plus an optional year."},
  {player:"P. Sarr", note:"NEW 31 Jul (Twitter Pulse, anonymous-sourced only — no Newsworthy corroboration yet, treat as early-stage): Aston Villa preparing a bid, described as holding 'serious interest.' Personal terms reportedly not expected to be an issue. A German club is also credited with interest."},
  {player:"L. Bergvall", note:"Handed in a transfer request citing lack of first-team football (112 mins under De Zerbi all season). Nottingham Forest had an opening £38m bid rejected and are expected to return with an improved offer — the chance to work under Oliver Glasner is reportedly a big pull for the player. Spurs are willing to sell but only on their valuation; will keep him if it isn't met."},
  {player:"Richarlison", note:"Spurs are ready to sell with a year left on his deal, partly to manage Profit & Sustainability Rules headroom after the Fernandes/Tonali spend. Asking price reported between €20-30m. Juventus have joined the race as a fallback if their move for PSG's Kolo Muani fails; an unnamed Turkish club and Orlando City (MLS) have also been mentioned, Everton links have gone cold."},
  {player:"J. Palhinha", note:"Loan spell ended and Tottenham's move to sign him permanently is now 100% dead (reliable reporting, 10 Jul) — the player has posted a farewell message to Spurs fans, contract expired 30 Jun. No permanent destination confirmed yet: Sporting CP are the most consistent link (Palhinha open to a return to Portugal) with Bayern wanting a sale rather than a loan; Benfica, Juventus and Aston Villa also mentioned."},
  {player:"Luka Vuskovic", note:"Sale to Brighton agreed — £46m (BBC), with a significant sell-on clause. 19-year-old Croatian CB had never made a senior Spurs appearance."},
  {player:"Y. Bissouma",     note:"Released — contract expired Jun 30 (Official)"},
  {player:"A. Veliz",        note:"SOLD — Bahia £7.8m + add-ons + 20% sell-on. Effective 1 Jul 2026 (Official)"},
  {player:"Kolo Muani",      note:"Loan ended — returned to PSG"},
];

// Anonymous transfer intelligence — sourced from SpursWeb/insider aggregators
export const ANON_BRIEFS = [
  {
    date:"28 Aug",
    text:"Word doing the rounds near Hotspur Way is that De Zerbi has been pushing hard behind the scenes for one more addition before the window slams shut — the manager himself dropped the word 'bombas' in his presser, plural, which those inside the building are reading as a signal that the shopping list isn't quite finished. Whether the budget genuinely stretches to a ninth signing or whether that's a negotiating posture while the Sarr funds are still being counted is the question nobody is answering directly."
  },
  {
    date:"28 Aug",
    text:"The name of Szoboszlai's Liverpool teammate has been floated in connection with a late Spurs move for full-back cover, and there's a separate whisper about a part-exchange involving Richarlison in a deal for a high-value winger. Neither has a named journalist behind it yet, but the volume of chatter at this late stage of the window suggests De Zerbi's backroom staff are still working the phones — whether either lead is genuine or deadline-day noise is anyone's guess."
  },
  {
    date:"27 Aug",
    text:"Whispers doing the rounds suggest Tottenham are involved in a three-horse race for a 'giant striker' — the GiveMeSport headline is light on detail, but the inference from those close to the situation is that Marmoush's arrival hasn't closed the door on a more physical option up top. Whether that's a genuine pursuit or a negotiating play while the Osimhen gap remains unresolved is the question nobody at N17 is answering directly."
  },
  {
    date:"27 Aug",
    text:"The SpursWeb note about a 'wantaway £35m Tottenham star' potentially linking up with Eric Dier in late loan talks is generating quiet chatter — no primary source has named the player, but the Eric Dier connection points toward a club in Germany or Portugal. Those with an ear to the ground at Hotspur Way aren't denying it, but they're not confirming it either."
  },
  {
    date:"26 Aug",
    text:"Word filtering through from sources close to the Mateta situation is that Tottenham moved quickly after the Aston Villa bid failed — an approach described as exploratory but genuine, made 'in the last few hours' of a frantic window day. Whether De Zerbi truly wants the Crystal Palace man or whether this is window-dressing while the Gakpo pursuit stalls is the question doing the rounds at N17."
  },
  {
    date:"26 Aug",
    text:"The Marmoush pursuit has a different feel to the other striker links — insiders suggest De Zerbi specifically requested this one, with the reunion angle real rather than agent-driven. The caveat those close to the situation keep raising is the same one it always is at this club right now: does the budget actually stretch this far after a summer that's already broken records twice over?"
  },
];
