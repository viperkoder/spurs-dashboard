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

## Post-match reconciliation — 16 September 2026

- [x] Audited current GitHub main `19154cc`, repository rules, clean cloud checkout and matchday/Season Stats architecture. Viper's Mac clone is outside this environment and was not inspected.
- [x] Added missing MD4 Spurs 0-0 Everton (12 September); ESPN final event `401879277` and official club match centre/highlights agree. Corrected kickoff to 17:30 BST / 00:30 SGT on 13 September. Eleven starts, five used substitutes, four unused; 990 minutes.
- [x] Liverpool 3-1 Spurs, Carabao Cup Round 3 (15 September), final event `401914257`, cross-checked against the club's official report. Gallagher 69, Fernandes assist; recorded XI, five substitution boundaries and four unused players as flat audit fields in the existing cup fixture, exposed in expandable fixture details with regulation minutes. Cup fixture scores use Spurs perspective (1-3).
- [x] Full 20-club ESPN table refreshed and arithmetic/club identity validated: Spurs P4 W0 D2 L2 GF0 GA5 GD-5, 2 points, 17th. Cup result excluded from league totals.
- [x] LAST5 restored to descending chronology: Liverpool, Everton, Forest, Newcastle, Charlton. Reconciled existing squad appearances and competitive scorer materialisations from the four league match records plus the two cup rosters; eliminated doubled Charlton goals and duplicate Savio/Sávio entry. Six competitive team goals; pre-season excluded.
- [x] Preserved Charlton and Liverpool source IDs/XIs/substitutions/unused bench on existing cup fixture records. Marked later Carabao calendar placeholders eliminated; they do not become eligible Spurs matches.
- [x] Added expandable league match history to Season Stats, showing XI, used/unused substitutes, each player's regulation minutes and source links. All rows use existing league match records.
- [x] Processed-fixture state reconciled to prevent duplicate cumulative increments. Preserved original Everton key alongside corrected kickoff key.
- [x] Matchday regression suite, secret scan, build smoke checks and `git diff --check` passed. Verified 23 league players, 44 starts, 3,960 regulation minutes, eleven active players over every interval, six competitive goals and unique scorer identities.
- [x] GitHub Build check and Pages deployment passed for `dac5402`; live Overview confirmed Liverpool 3-1 Spurs, latest-first LAST5, Spurs 17th/2 points, and corrected scorer totals. Live Season Stats verified all 23 usage rows and expandable Everton participation. Browser logs showed extension metadata errors only, no dashboard application error.
- [x] Live QA follow-up corrected stale pre-season table labels, anchored coverage dates to UK match dates, added official post-match fallback headlines and confirmed the Villa kickoff at 12:30 BST / 19:30 SGT on 19 September against the official stadium local-information page. Follow-up matchday tests, secret scan, build and whitespace check passed.

## Season Stats V2 — on-pitch combinations (five-phase map)

Owner: Kody reviews each phase gate; Viper authorizes the next phase. Each
phase is small, tested and reported before the next begins.

- V2.1 — On-pitch data foundation (this packet)
- V2.2 — Defensive combinations
- V2.3 — Central midfield influence
- V2.4 — Attacking combinations
- V2.5 — Dashboard integration, presentation and final validation

### V2.1 — On-pitch data foundation — implemented 17 September 2026

- [x] Added `src/data/onPitch.js`: pure, deterministic query functions over
      the existing `LEAGUE_MATCHES` `appearances` interval data (`on`/`off`
      per player) already recorded by Season Stats V1. No new data model,
      database or event-replay engine was introduced — the existing
      appearance intervals already are the on-pitch evidence.
- [x] `getStartingXI(match)` — the eleven who kicked off.
- [x] `getOnPitchAt(match, minute)` — every player on the pitch at a given
      regulation minute, with a documented boundary rule: intervals are
      half-open `[on, off)` for a player substituted before full time (a
      goal in their exact departure minute is not attributed to them, since
      source data cannot show whether it preceded or followed the
      substitution within that minute), and inclusive of the final minute
      for a player who played to full time (`off >= matchDuration`), so a
      stoppage-time goal still credits a full-match player correctly.
- [x] `getSubstitutionEvents(match)` — chronological on/off events derived
      from the same interval data, exits ordered before entries in the same
      minute.
- [x] `getPlayersOnPitchAtGoal(match, goal)` — takes a caller-supplied goal
      event (`{minute, stoppage?, team, scorer?}`) and returns who was on
      the pitch. Reports presence only — no causation claim is made or
      implied anywhere in this module.
- [x] `validateOnPitchData(match)` — non-throwing structural check (missing
      player, non-numeric or out-of-range minutes, off-before-on, duplicate
      player, started/on-minute mismatch, wrong starter count) so downstream
      combination stats can degrade safely instead of crashing or guessing.
      Independent of `automation/matchday-core.js`'s existing throwing
      validator, which only runs at ingestion time for `LEAGUE_MATCHES`.
- [x] Registered in `build.js`'s `FILES` list (after `seasonStats.js`) so the
      build-completeness guardrail stays accurate; no UI or dashboard change
      — V2.1 exports nothing consumed by any component yet, per the V2.5 gate.
- [x] Tests added in `scripts/test-onpitch.js` (`npm run test:onpitch`):
      no substitutions, one substitution, multiple substitutions (cross-
      checked against real audited MW1 Brentford data), goal before a
      substitution, goal after a substitution (verifies the "Defender A off
      70', goal at 75' is not attributed to Defender A" example from the
      packet brief), a stoppage-time goal, and malformed/incomplete data
      (missing appearances, non-numeric minutes, off-before-on minutes, a
      duplicate player, a started/on-mismatch) handled without throwing.
      Every real `LEAGUE_MATCHES` match is also cross-checked for exactly 11
      players on the pitch at several sampled minutes.
- [x] `npm run test:onpitch`, `npm run test:matchday`, `npm run check-secrets`
      and `node build.js` all pass; verified in an isolated clean clone of
      this commit (esbuild could not run on the on-device shell used for this
      session — a pre-existing `@esbuild/darwin-arm64` vs `linux-arm64`
      platform mismatch reproduced identically on unmodified `origin/main`,
      unrelated to this change) plus locally on the resulting worktree.
      `docs/` was rebuilt from that verified build and is included in this
      commit per `AGENTS.md`.
- [x] Season Stats V1 (`getLeagueSummary`, `getPlayerUsage`,
      `withLeagueResults`, the Season Stats panel) is untouched. The Matchday
      updater (`automation/matchday-*.js`, `.github/workflows/matchday-update.yml`)
      is untouched.

#### Boundary review correction — 18 September 2026

A pre-publication review found the first V2.1 implementation resolved
same-minute goal/substitution conflicts by silently falling back to the
`[on, off)` roster convention, which is honest for "who was on the pitch in
general" but not for "who was on the pitch for this specific goal" — it
could not actually distinguish event order within a minute. It also had
three malformed-data gaps: a duplicated player name could still appear in
query results (from whichever appearance record was scanned last), an
interval with `off` before `on` or beyond match duration was flagged by
`validateOnPitchData` but not actually excluded from `getOnPitchAt`, and a
non-array `appearances` field (e.g. a string or plain object rather than a
list) could throw instead of degrading safely. Corrected before any of this
shipped to `main`:

- [x] `getPlayersOnPitchAtGoal(match, goal)` no longer uses `[on, off)` when
      the goal's minute exactly matches a player's entry or exit minute. It
      now returns that player in a new `ambiguous` array instead of
      `onPitch`, and adds an issue explaining why, unless the caller supplies
      real source-backed ordering via an optional `order` field on the goal
      and matching `onOrder`/`offOrder` fields on the relevant appearance
      (e.g. a commentary sequence number) — in which case the earlier event
      wins deterministically. No event order is ever invented; half-time
      (45') and stoppage-time (90'+) substitutions get no special-cased
      logic because the same minute-granularity ambiguity applies uniformly
      at any minute, not just those two.
- [x] Ordinary roster/minute queries (`getOnPitchAt`, `getStartingXI`,
      `getSubstitutionEvents`) keep the existing `[on, off)` convention
      exactly as before — that convention was correct for "who was on the
      pitch generally" and the review did not ask for it to change.
- [x] Added a single shared appearance-validity filter used by every query
      function (`getStartingXI`, `getOnPitchAt`, `getSubstitutionEvents`,
      `getPlayersOnPitchAtGoal`), so an invalid or duplicate record is
      excluded consistently everywhere rather than flagged in one place and
      still usable in another. A player whose name appears more than once in
      `appearances` is excluded entirely from every query — neither
      duplicate is treated as authoritative, since guessing which one is
      correct would fabricate certainty the source data doesn't have.
- [x] `on < 0`, `off < on`, and `off > matchDuration` intervals are now
      actually rejected by every query (previously only reported by
      `validateOnPitchData`, not enforced by `getOnPitchAt`).
- [x] A non-array (or absent/null) `appearances` field is now handled safely
      by every exported function — verified with a string, a plain object, a
      number, `null`, `undefined` and a missing key, none of which throw.
- [x] Tests added: same-minute goal/substitution with no ordering evidence
      (both players ambiguous, neither guessed), the same case with
      `order`/`onOrder`/`offOrder` supplied (resolves deterministically both
      ways), a duplicated player excluded from `getStartingXI`,
      `getOnPitchAt`, `getSubstitutionEvents` and goal attribution, invalid
      intervals (backwards, beyond duration, negative) rejected at every
      sampled minute, and non-array/malformed `appearances` handled without
      throwing across all four exported query functions.
- [x] Reconciled against `origin/main` at `12797ce906fa28adcfa5abd621a2ff6d8be50c9f`
      (rebased cleanly; the only overlap was generated `docs/` output,
      resolved by rebuilding fresh). `npm run test:onpitch`,
      `npm run test:matchday`, `npm run check-secrets`, `node build.js` and
      `git diff --check` all pass. Season Stats V1 and the Matchday updater
      remain byte-for-byte untouched (verified with an explicit diff against
      `origin/main` on every V1/matchday source file).

**Data assumption:** on-pitch intervals are taken directly from the existing,
already-audited `appearances.on`/`off` fields; V2.1 does not re-derive them
from a separate substitution-event log because none exists or is needed —
the interval already is the evidence.

**Source limitation (identified, not fabricated):** `LEAGUE_MATCHES` has no
goal-minute event data yet. Spurs have scored zero league goals this season
(GF 0) and no opponent goal minute has been captured in any league match
record (`src/data/standings.js`'s `LAST5.scorer` is empty for the Newcastle
and Forest results, and Brentford's isn't tracked at match-record level
either). `getPlayersOnPitchAtGoal` therefore has no real production goal data
to run against yet — it is proven against synthetic goal events in tests only.
Real goal-event capture (source, minute, stoppage, for/against) is unstarted
and is a dependency of V2.2 (defensive: goals conceded) and V2.4 (attacking:
goals for), not part of this foundation packet.

**Stoppage-time notation:** no `LEAGUE_MATCHES` record currently uses a
stoppage-time boundary (all `on`/`off` values are plain regulation-minute
integers). `isOnPitchAt`'s full-time-inclusive rule already handles a
stoppage-time goal correctly for any player still on the pitch at 90'; this
is proven in `scripts/test-onpitch.js` with a synthetic case. No real example
exists yet to validate against.

**Proposed smallest V2.2 packet:** capture source-backed goal events (minute,
stoppage, for/against, scorer where known) for the four completed league
matches, reusing `getPlayersOnPitchAtGoal`; then aggregate actual back-line
combinations (minutes together, match count, goals conceded, GA/90) per the
existing "Next Season Stats packet" bullets below. Requires real goal-minute
sourcing (ESPN/official) before any defensive combination number can be
shown — until then, V2.2 must state goal data as unavailable rather than
assume 0.

## Next Season Stats packet — on-pitch combinations V1

Owner: Kody. Scope: extend the existing completed-match records and deterministic calculations; no separate statistics database, paid API or AI calculation loop.

- [ ] Store source-backed chronological goal events (for/against, regulation period, stoppage time, source order) and match-specific player roles. Squad positions alone are insufficient: Gray played RB and Gallagher an attacking role at Liverpool. Preserve event ordering at substitutions, half-time and dismissals; exclude ambiguous event attribution rather than guess.
- [ ] Reuse appearance intervals to split matches at substitutions, role changes and red cards. Keep the documented 90-minute denominator; correctly assign stoppage-time goals to the actual on-pitch lineup. Validate active-player counts over every interval, not just 990 aggregate minutes; handle dismissals before enabling affected matches.
- [ ] Defence: aggregate actual back-line combinations, minutes together, match count, goals conceded, GA/90, goalless interval minutes and longest continuous goalless interval. Show opponent and match context; a goalless interval does not establish overall defensive quality.
- [ ] Midfield: show central midfield combinations/personnel alongside each defensive combination and goals conceded/goalless intervals. Explicitly label on-pitch association, never individual blame or causation.
- [ ] Attack: track the actual attacking three/four by match role, minutes together, match count, goals for and GF/90. Add shots/on-target/xG only when complete reliable event evidence supports consistent attribution; missing data is unavailable, never zero.
- [ ] Show minutes, matches and audited event coverage alongside every rate. Below 270 shared minutes or three matches, label a small sample and suppress strongest/weakest rankings. Threshold is a configurable display guardrail, not proof of significance; even larger samples remain descriptive.
- [ ] Backfill and score-reconcile all four league match event records before publishing comparisons. Start with league only; keep cups separate.
- [ ] Replace incremental competitive scorer/squad updates with deterministic materialisation from existing league and cup match evidence, using canonical player identities. Existing cup audit fields are evidence, not a second totals database; cup ingestion and correction/idempotency require implementation before automatic cumulative recovery is claimed.
- [ ] Tests: goal/substitution same-minute ordering, stoppage time, dismissals, role changes, incomplete data, sample guards, corrected-match reruns and no double counting. Review compact combination tables after those pass.

Architecture review: existing `LEAGUE_MATCHES`, appearance intervals and `getPlayerUsage` support deterministic time-together statistics. They currently lack goal-event chronology and tactical role intervals. Keep combination intelligence separate from this verified post-match maintenance packet.

### Verified update failure and follow-up

- [x] Inspected failed Actions run `35061824343` (16 September): deterministic table refresh and Everton ingestion succeeded, then the test failed at `matches.length === 3` (`4 == 3`), preventing rebuild/commit. Regression assertions now use the stable original three-match sample while validating all live match intervals/totals.
- [ ] Optional Anthropic reconciliation remains unavailable because of insufficient provider credit, confirmed in the same job log. Do not purchase credit. Prioritise zero-cost deterministic cup/result/scorer/squad materialisation in the next maintenance packet; this post-match correction does not claim to resolve that provider dependency.

## Matchday reliability verification — 16 September 2026

- [x] Confirmed the recurring scheduled failure in runs `34832832693` (14 September), `34938302606` (15 September) and `35061824343` (16 September): legitimate Everton ingestion advanced the live match count to four; the guardrail expected the initial three-match backfill and failed with `4 == 3`, blocking rebuild/commit.
- [x] Reproduced the archived `19154cc` test against current audited four-match data. Current main already separates the original three-match regression sample from live-season data. This packet adds live Apps=Starts+Sub Apps=W+D+L, starts=matches×11, minutes=matches×990, and real audited match backfill/unchanged-rerun assertions; it does not change the expected count to four or alter verified match data.
- [x] Complete matchday suite, secret scan, build smoke checks and whitespace check passed. Real Everton ESPN evidence replay through the unchanged updater succeeded with an insufficient-credit warning; identical evidence produced no writes. A processed-fixture run succeeded with zero provider requests/writes. Real table evidence replay returned changed then unchanged after normal validation. Replays used isolated memory/temporary test output only.
- [x] Anthropic insufficient-credit handling is already safely non-fatal and remains unchanged. Genuine unrelated errors still fail; no credit purchase, provider migration or new dependencies.
- [x] Existing Matchday workflow now also runs for guardrail/core/workflow changes on PRs and main pushes. PRs cannot publish changes or invoke the secondary transfer sweep; data-only bot commits do not match push paths, avoiding recursion. The scheduled job and its failure reporting remain intact.
- [x] GitHub-hosted Matchday [PR run 35087136948](https://github.com/viperkoder/spurs-dashboard/actions/runs/35087136948) and [main run 35087189561](https://github.com/viperkoder/spurs-dashboard/actions/runs/35087189561) both succeeded. [PR #3](https://github.com/viperkoder/spurs-dashboard/pull/3) merged as `c4a916ef0c6302db79bf55050e283e9d291ce593`. Main completed table refresh, reconciliation and guardrails; no new data meant rebuild/commit correctly skipped with a successful job. The original recurring assertion failure is resolved; genuine future errors remain visible.
