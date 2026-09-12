# THFC Dashboard Maintenance Checklist

This is the canonical operational checklist for keeping the dashboard current.
GitHub `main` is authoritative. Update source files under `src/`, rebuild
`docs/`, validate, and publish one coherent change.

## Source hierarchy

1. Tottenham Hotspur official announcements and match reports
2. Competition organisers: Premier League, FA, EFL, FIFA and UEFA
3. BBC Sport, Reuters, Sky Sports and The Guardian
4. Named specialist reporters with a reliable record
5. Aggregators and anonymous/community sources — whispers only until corroborated

Never convert a preview, prediction, vague headline or anonymous claim into a
confirmed result, injury, signing or departure.

## Daily automated sweep

- [ ] News cache: newest relevant headlines, dates, links and tags
- [ ] Daily Whispers: newest first, maximum six, speculative tone clearly retained
- [ ] Transfer briefs: likelihood, status, date and stale/dead leads
- [ ] Confirmed arrivals and departures reflected in both transfers and squad
- [ ] Injury changes applied only when the report gives actionable status
- [ ] Completed fixture scores populated
- [ ] `docs/` rebuilt and committed so GitHub Pages matches source
- [ ] Secret scan and build smoke check pass

## Weekly manual reconciliation

- [ ] Squad: arrivals, departures, loans, positions, contracts and availability
- [ ] Injuries: active list only; remove resolved entries; verify return estimates
- [ ] Fixtures: dates, kick-offs, venue, TV, cup draws, postponements and results
- [ ] Confirmed kick-offs use an explicit UTC offset and display in Singapore time (SGT); never leave a TV-selected fixture as a timezone-less provisional time
- [ ] League table: P/W/D/L/GF/GA/GD/PTS, ordering and qualification/relegation flags
- [ ] Season analysis: table-driven totals, league averages and zero-match state
- [ ] Last five: correct competition context, ordering, scores and scorers
- [ ] Top scorers: competitive apps, goals and assists for the current season only
- [ ] Season Stats: every completed Premier League match has one audited result/appearance record in `src/data/seasonStats.js`; Apps/Starts/Sub Apps/Minutes/W/D/L remain derived, never hand-edited totals
- [ ] Finances: confirmed fees, add-ons, sell-ons, live targets and completed exits
- [ ] Transfers ↔ squad ↔ finances cross-reference has no contradictions
- [ ] Contract renewals remain in squad/contract data and never appear as departures
- [ ] World Cup/special-event modules are current or explicitly archived
- [ ] Footer verification date and visible season labels are accurate
- [ ] Live Pages deployment inspected after publishing

## Matchday update

- [ ] Full league table refresh runs independently after every club's completed match
- [ ] Matchweeks spanning Friday–Monday remain live and update as results arrive
- [ ] Matchday workflow becomes eligible at kickoff + 2 hours and retries until final evidence exists
- [ ] One processed-fixture key prevents duplicate AI calls and double-counted player totals
- [ ] Confirm final score from an authoritative source
- [ ] Update fixture score and next-match pointer
- [ ] Update league table and Spurs P/W/D/L/GF/GA/GD/PTS
- [ ] Update last five, scorers, assists and player appearances
- [ ] For a completed Premier League match, ingest the starting XI, only substitutes who entered, substitution minute boundaries and unused bench into `src/data/seasonStats.js`; fixture results and Season Stats then recalculate from that same match record
- [ ] Update injuries/suspensions only when confirmed
- [ ] Rebuild, validate, publish and verify the live site

The zero-cost 15-minute workflow refreshes the full 20-club table whenever any
Premier League result changes it. This continues across the complete multi-day
matchweek rather than stopping after Tottenham play. The fixture gate does not
call AI unless a Tottenham match is due.
An eligible match uses the configured Anthropic API for match reconciliation,
then runs the existing transfer/injury sweep in the same coherent update.
Extra-time, delayed, abandoned, missing or
conflicting matches fail closed and retry without changing dashboard data.

## Season Stats V1 — implemented 12 September 2026

- [x] Added the Season Stats navigation/page with dynamic P/W/D/L/points and sortable Premier League Player Usage (Apps, Starts, Sub Apps, Minutes, W/D/L).
- [x] Initial coverage verified through Matchweek 3: Brentford 3-0 Spurs (22 August), Spurs 0-2 Newcastle United (29 August), Nottingham Forest 0-0 Spurs (5 September 2026).
- [x] Backfill contains 33 starts, 22 players used and 2,970 regulation player-minutes. Each match reconciles to 11 starters and 990 player-minutes; unused substitutes are recorded for audit but excluded from totals.
- [x] Source method: ESPN structured match event/roster/substitution evidence, cross-checked against Tottenham's official confirmed XI where available and Sky Sports team sheets. Event IDs and audit URLs live with each match record.
- [x] Normal matchday update now extracts the result, starters, entered substitutes, unused bench and minute boundaries from the same completed ESPN evidence already used by the updater. It upserts by league matchweek, so new or corrected matches automatically roll cumulative Season Stats forward without a manual totals workflow.
- [ ] Later ideas only: goals, assists, cards, clean sheets, most-used XI, player combinations, points per appearance/start and competition filtering.

## Season rollover

- [ ] Replace promoted/relegated clubs and reset table to zero
- [ ] Reset competitive squad appearances, goals and assists
- [ ] Clear `LEAGUE_MATCHES` only after archiving the completed season; the new season's summary and player usage must start at zero
- [ ] Reset top scorers and season-analysis state
- [ ] Keep pre-season results clearly separate from league results
- [ ] Load the full official fixture list and mark provisional dates
- [ ] Reconcile first-team squad, loans, contracts and shirt numbers
- [ ] Archive completed tournament modules
- [ ] Update every visible season/year label
- [ ] Perform the full weekly reconciliation before publishing

## Known automation boundary

The daily workflow currently covers news, whispers, transfer changes, selected
squad/injury updates, non-league fixture-score detection and the Pages rebuild.
The matchday workflow deterministically refreshes the league table and completed
Premier League match/player records used by Season Stats. Scorer totals,
finances, cup draws and season rollover still require deterministic maintenance;
until implemented, this checklist is mandatory.

Optional Anthropic reconciliation must never block the free deterministic RSS,
news-cache, fixture-score or league-table refresh. Low credit, rate limiting and
temporary provider outages are recorded as visible GitHub Actions warnings and
in `automation/update-log.txt`; they defer transfer/injury/whisper reconciliation
without failing or hiding the deterministic update.
