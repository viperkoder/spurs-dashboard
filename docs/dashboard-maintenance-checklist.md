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
- [ ] League table: P/W/D/L/GF/GA/GD/PTS, ordering and qualification/relegation flags
- [ ] Season analysis: table-driven totals, league averages and zero-match state
- [ ] Last five: correct competition context, ordering, scores and scorers
- [ ] Top scorers: competitive apps, goals and assists for the current season only
- [ ] Finances: confirmed fees, add-ons, sell-ons, live targets and completed exits
- [ ] Transfers ↔ squad ↔ finances cross-reference has no contradictions
- [ ] World Cup/special-event modules are current or explicitly archived
- [ ] Footer verification date and visible season labels are accurate
- [ ] Live Pages deployment inspected after publishing

## Matchday update

- [ ] Matchday workflow becomes eligible at kickoff + 2 hours and retries until final evidence exists
- [ ] One processed-fixture key prevents duplicate AI calls and double-counted player totals
- [ ] Confirm final score from an authoritative source
- [ ] Update fixture score and next-match pointer
- [ ] Update league table and Spurs P/W/D/L/GF/GA/GD/PTS
- [ ] Update last five, scorers, assists and player appearances
- [ ] Update injuries/suspensions only when confirmed
- [ ] Rebuild, validate, publish and verify the live site

The zero-cost 15-minute fixture gate does not call AI unless a match is due.
An eligible match uses the configured Anthropic API for match reconciliation,
then runs the existing transfer/injury sweep in the same coherent update.
Extra-time, delayed, abandoned, missing or
conflicting matches fail closed and retry without changing dashboard data.

## Season rollover

- [ ] Replace promoted/relegated clubs and reset table to zero
- [ ] Reset competitive squad appearances, goals and assists
- [ ] Reset top scorers and season-analysis state
- [ ] Keep pre-season results clearly separate from league results
- [ ] Load the full official fixture list and mark provisional dates
- [ ] Reconcile first-team squad, loans, contracts and shirt numbers
- [ ] Archive completed tournament modules
- [ ] Update every visible season/year label
- [ ] Perform the full weekly reconciliation before publishing

## Known automation boundary

The daily workflow currently covers news, whispers, transfer changes, selected
squad/injury updates, fixture-score detection and the Pages rebuild. League
table calculations, scorer/appearance totals, finances, cup draws and season
rollover still require deterministic maintenance. These are the next automation
targets; until implemented, this checklist is mandatory.
