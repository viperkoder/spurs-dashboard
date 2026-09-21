// RDZ (Roberto De Zerbi) — career league points-return context.
//
// League matches only, cups excluded. One row per season/tenure at each
// club. W/D/L are sourced (Wikipedia club-season articles, cross-checked
// against his own managerial-statistics summary where possible); Points,
// PPG and Points Return % are always computed here, never hand-entered,
// so a transcription error can't silently break the arithmetic.
//
// Two spells are known to have happened but are deliberately left out
// rather than filled with an unreliable estimate — see UNRESOLVED_SPELLS
// below. Early lower-league jobs (Darfo Boario, Foggia, Palermo, Benevento,
// 2013-2018) are also omitted: only an all-competitions total could be
// sourced for those, and this table is league-only by design.
//
// Verified 2026-09-21. Sources: en.wikipedia.org club-season articles for
// each row below (Sassuolo 2018-19/2019-20/2020-21, 2021-22 Ukrainian
// Premier League, Brighton 2022-23/2023-24, Marseille 2024-25); the
// Brighton 2022-23 De Zerbi-only split is derived from a cross-checked
// B/R Football tally of his combined two-season Brighton PL record
// (70 games, 26W 19D 25L) minus the sourced 2023-24 season, which the
// remainder from Brighton's full-season 2022-23 total also confirms
// (Potter/caretaker's implied 6-game remainder is a sane fit). The current
// Tottenham 2026/27 row is this dashboard's own reconciled seasonStats.js
// data, not an external source.
export const RDZ_SEASONS = [
  {
    season: "2018/19", club: "Sassuolo", league: "Serie A",
    played: 38, w: 9, d: 16, l: 13, status: "full",
    source: "https://en.wikipedia.org/wiki/2018%E2%80%9319_U.S._Sassuolo_Calcio_season",
  },
  {
    season: "2019/20", club: "Sassuolo", league: "Serie A",
    played: 38, w: 14, d: 9, l: 15, status: "full",
    source: "https://en.wikipedia.org/wiki/2019%E2%80%9320_U.S._Sassuolo_Calcio_season",
  },
  {
    season: "2020/21", club: "Sassuolo", league: "Serie A",
    played: 38, w: 17, d: 11, l: 10, status: "full",
    source: "https://en.wikipedia.org/wiki/2020%E2%80%9321_US_Sassuolo_Calcio_season",
  },
  {
    season: "2021/22", club: "Shakhtar Donetsk", league: "Ukrainian Premier League",
    played: 18, w: 15, d: 2, l: 1, status: "partial",
    note: "Season abandoned 26 Apr 2022 after Russia's invasion of Ukraine suspended the league on 24 Feb 2022, 18 rounds in (of a planned 30). No champion was crowned; standings stood only for European qualification. Shakhtar were 1st when play stopped.",
    source: "https://en.wikipedia.org/wiki/2021%E2%80%9322_Ukrainian_Premier_League",
  },
  {
    season: "2022/23", club: "Brighton & Hove Albion", league: "Premier League",
    played: 32, w: 14, d: 7, l: 11, status: "partial",
    note: "Appointed 18 Sep 2022, first match 1 Oct 2022, replacing Graham Potter (who managed the opening 6 league games). Brighton finished 6th overall that season — the club's highest-ever PL finish.",
    source: "https://x.com/brfootball/status/2039023234402660762",
  },
  {
    season: "2023/24", club: "Brighton & Hove Albion", league: "Premier League",
    played: 38, w: 12, d: 12, l: 14, status: "full",
    note: "Departed by mutual consent at season's end.",
    source: "https://en.wikipedia.org/wiki/2023%E2%80%9324_Brighton_%26_Hove_Albion_F.C._season",
  },
  {
    season: "2024/25", club: "Marseille", league: "Ligue 1",
    played: 34, w: 20, d: 5, l: 9, status: "full",
    note: "Finished 2nd, Marseille's best league finish in some years.",
    source: "https://en.wikipedia.org/wiki/2024%E2%80%9325_Olympique_de_Marseille_season",
  },
  {
    season: "2026/27", club: "Tottenham Hotspur", league: "Premier League",
    played: 5, w: 0, d: 2, l: 3, status: "ongoing",
    note: "Current season — updates as this dashboard's Season Stats reconciles each completed match.",
    source: null,
  },
];

// Known spells with no reliable league-only breakdown available — listed
// so their absence from RDZ_SEASONS above is a documented gap, not a
// silent omission. Never estimated or backfilled with a guess.
export const RDZ_UNRESOLVED_SPELLS = [
  {
    season: "2025/26 (partial, to 11 Feb 2026)", club: "Marseille", league: "Ligue 1",
    known: "21 matchdays managed, 4th place at departure, 12 points off leaders PSG at the time.",
    gap: "No source found gives an exact league-only W/D/L/points split for these 21 matches specifically (only combined all-competition tenure totals were available) — left out rather than estimated.",
  },
  {
    season: "2025/26 (partial, from 31 Mar 2026)", club: "Tottenham Hotspur", league: "Premier League",
    known: "Appointed 31 Mar 2026, replacing Igor Tudor. Guided the club to survival with a final-day 1-0 win over Everton.",
    gap: "No source found gives a reliable league-only W/D/L split isolated from cup and pre-season matches for this stretch — the one aggregate figure found (10 games, all competitions, spanning both this stretch and the start of 2026/27) directly conflicts with this dashboard's own verified 2026/27 record, so it was rejected rather than used. Left out rather than estimated.",
  },
  {
    season: "2013-2018", club: "Darfo Boario, Foggia, Palermo, Benevento", league: "Serie D / C / B / A",
    known: "Early lower-division and one top-flight (Benevento) spell before Sassuolo.",
    gap: "Only all-competition tenure totals were sourced; no reliable league-only split. Out of scope for this compact table — can be added as a separate follow-up if wanted.",
  },
];

export function withCalculatedReturn(row) {
  const points = row.w * 3 + row.d;
  const ppg = row.played > 0 ? points / row.played : null;
  const returnPct = row.played > 0 ? (points / (row.played * 3)) * 100 : null;
  return { ...row, points, ppg, returnPct };
}

export function getRdzSeasons() {
  return RDZ_SEASONS.map(withCalculatedReturn);
}

export function getRdzCareerTotals() {
  const totals = RDZ_SEASONS.reduce((acc, row) => ({
    played: acc.played + row.played,
    w: acc.w + row.w,
    d: acc.d + row.d,
    l: acc.l + row.l,
  }), { played: 0, w: 0, d: 0, l: 0 });
  return withCalculatedReturn(totals);
}
