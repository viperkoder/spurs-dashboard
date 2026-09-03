// Financial Intelligence — Summer 2026 spend, sales & PSR/SCR position
// Edit this file alone to change anything on the Finances tab.
//
// This is a MANUALLY maintained cross-reference of transfers.js, not a
// programmatic derivation — fee strings in transfers.js mix £/€ and aren't
// reliably parseable (e.g. "60m" sometimes means £60m, sometimes converted
// from €60m). Every time CONFIRMED/DEPARTURES/TRANSFER_BRIEFS changes in
// transfers.js, update the matching numbers here too.
//
// All figures in £m. € figures converted at an approximate €1 = £0.87 and
// flagged in `note` — treat as indicative, not exact, until a fee is
// officially confirmed in GBP.
//
// Last verified: 3 Sep 2026, after the English summer window closed.

// ── Done deals — money already committed ────────────────────────────────
export const CONFIRMED_SPEND = [
  {player:"Tosin Adarabioyo", from:"Chelsea",    fee:10,  note:"Sky Sports reported £10m"},
  {player:"Mykhailo Mudryk",  from:"Chelsea",    fee:0,   note:"Season-long loan; reported £75m option is not committed spend"},
  {player:"Omar Marmoush",     from:"Man City",   fee:55,  note:"Season-long loan with reported £55m obligation; future obligation shown here"},
  {player:"Savio",             from:"Man City",   fee:85,  note:"Reported total package"},
  {player:"Sandro Tonali",     from:"Newcastle",  fee:100, note:"Initial £92.5m, could rise to £100m with add-ons"},
  {player:"Mateus Fernandes",  from:"West Ham",   fee:85,  note:"Club record fee"},
  {player:"JP van Hecke",      from:"Brighton",   fee:52,  note:""},
  {player:"Andy Robertson",    from:"Liverpool",  fee:0,   note:"Free transfer — wage cost only, not reflected here"},
  {player:"Marcos Senesi",     from:"Bournemouth",fee:0,   note:"Free transfer — wage cost only, not reflected here"},
  {player:"Martin Dubravka",   from:"Burnley",    fee:0,   note:"Free transfer — wage cost only, not reflected here"},
];

// NOTE 31 Jul 2026: R. Bentancur REMOVED — was incorrectly listed here as a
// free departure ("contract expired"). Verified against Transfermarkt +
// multiple outlets: Tottenham actually tied him to a NEW long-term contract
// (reported Oct 2025) — he was never a confirmed departure. Earlier data
// appears to have misread a renewal story as an expiry. He remains a
// first-team Spurs player, not reflected in Finances at all.
//
// N. Lankshear (Middlesbrough) and M. Akhamrich (Leyton Orient loan) are
// confirmed departures per BBC Sport (see transfers.js DEPARTURES) but
// neither headline reported a fee — listed here as undisclosed rather than
// omitted, so the panel doesn't silently miss a real departure.
export const CONFIRMED_INCOME = [
  {player:"Kevin Danso",       to:"Sunderland",       fee:25,  note:"Loan with performance-related obligation; future fee shown"},
  {player:"Pape Matar Sarr",   to:"Juventus",         fee:24.4,note:"Loan with performance-related obligation; reported €28m converted at €1 = £0.87"},
  {player:"Radu Dragusin",     to:"Fiorentina",       fee:21.5,note:"Loan with reported obligation; future fee shown"},
  {player:"Guglielmo Vicario", to:"Inter Milan",      fee:8.6, note:"Loan with reported option; optional future fee, not guaranteed"},
  {player:"Ashley Phillips",   to:"Middlesbrough",    fee:7,   note:"Initial fee; up to £13m additional add-ons reported"},
  {player:"Alfie Devine",      to:"Preston North End",fee:6,   note:"Plus reported sell-on and matching rights"},
  {player:"Cristian Romero",    to:"Atlético Madrid", fee:34,  note:"Reported fee; Spurs retain a 15% sell-on clause"},
  {player:"Djed Spence",        to:"Inter Milan",     fee:24,  note:"Reported fee; permanent deal"},
  {player:"Manor Solomon",      to:"West Ham",        fee:5,   note:"Initial fee; could rise to £7m plus 10% sell-on"},
  {player:"Luka Vuskovic",      to:"Brighton",       fee:46,  note:"Plus a significant sell-on clause"},
  {player:"Antonio Veliz",      to:"Bahia",          fee:7.8, note:"Plus add-ons + 20% sell-on"},
  {player:"Yves Bissouma",      to:"—",              fee:0,   note:"Released — wage saving only, no fee"},
  {player:"N. Lankshear",       to:"Middlesbrough",  fee:14,  note:"Reported fee plus sell-on and matching rights"},
  {player:"M. Akhamrich",       to:"Leyton Orient",  fee:0,   note:"Loan move, no fee — wage saving only while out"},
];

// ── In progress — nothing here is booked. `likelihood` is the same
// editorial-judgment estimate used on the Transfers tab, not betting odds. ──
export const IN_PROGRESS_SALES = [
  {player:"Richarlison",      to:"Trabzonspor", askGBP:25, likelihood:55, note:"English window closed, but Turkey remains open; personal terms reported agreed while Spurs rejected £15m and £20m bids."},
];

export const IN_PROGRESS_BUYS = [];

// Context blurb for the panel header — kept as data so it's a one-line edit
// if the framing needs to change as SCR reporting becomes more common than PSR.
export const FINANCE_CONTEXT = "From 2026/27 the Premier League's old Profit & Sustainability Rules (PSR) are being phased out in favour of Squad Cost Ratio (SCR) — approved by clubs Nov 2025 — which caps squad costs (wages, player amortisation, agents' fees) at 85% of adjusted revenue, with a multi-year allowance above that before sporting sanctions apply. Most current reporting on Spurs' sales still says \"PSR\" out of habit — treat it as shorthand for the same underlying financial discipline.";
