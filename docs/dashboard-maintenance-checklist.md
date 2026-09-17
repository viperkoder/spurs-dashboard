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

- V2.1 — On-pitch data foundation (merged, PR #5, `3929974`)
- V2.2 — Defensive combinations (discovery + event-model foundation merged,
  PR #6, `9e815cb`; Defensive Combinations V1 merged, PR #7, `d2053d5`)
- V2.3 — Central midfield influence (V1 implemented below; awaiting publish)
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

### V2.2 — discovery + event/tactical-role foundation — 18 September 2026

Discovery-first packet per Viper's brief: reviewed real evidence before
writing any combination or ranking logic.

**Matches reviewed (all four completed 2026/27 league matches):**

- [x] MW1 Brentford 3-0 Spurs (22 Aug) — three opponent goals.
- [x] MW2 Newcastle 0-2 (29 Aug) — two opponent goals.
- [x] MW3 Nottingham Forest 0-0 (5 Sep) — genuinely zero goals.
- [x] MW4 Everton 0-0 (12 Sep) — genuinely zero goals.

**Sources evaluated, per the checklist's existing source hierarchy:**
official club match reports (Brentford FC — reliable, gave scorer/assist/
minute for all three of its goals), Premier League's official site (JS-
rendered, not fetchable by this session's tools — a real access gap, not a
data gap), ESPN's match/report pages (JS-rendered SPA — same access gap;
ESPN's raw structured evidence API, the one `automation/matchday-core.js`
already consumes server-side with second-level `time.value` precision, is
not directly reachable from this session's network egress or by generic web
fetch, and its commentary HTML page is disallowed by robots.txt), and NBC
Sports match recaps (reliable, gave scorer/assist/minute for both Newcastle
goals). No paid provider was added or considered; no fragile scraping was
used — every goal recorded here came from a normal editorial match report,
the same tier of source the daily/weekly checklist already treats as
authoritative.

**What was reliably obtainable, per match:**

- MW1: scorer, assist and minute for all three goals. The third (Kayode)
  is reported only as "45+" — the club report gives no exact stoppage
  digit, and its buildup credits two contributors (a header and a blocked
  shot) rather than one clean assist. Both are recorded as missing rather
  than guessed.
- MW2: scorer, assist and minute for both goals, cleanly.
- MW3, MW4: no goals to source — reconciled as an empty `goals` array,
  distinct from "not yet reviewed".
- Substitution minutes for all four matches were already reconciled in V2.1
  from ESPN evidence; MW1's independently-sourced substitution minutes
  cross-check within normal ±1 minute editorial rounding (e.g. Brentford's
  own report says Maddison/Solanke on 67', existing repo data says 68').

**Evidence gap identified, not fabricated:** true second-level event
ordering (needed to resolve a goal and a substitution reported in the exact
same displayed minute) is not obtainable through this session's tools. The
mechanism already exists — `automation/matchday-core.js` extracts
`event.time.value` in seconds from ESPN's structured evidence at ingestion
time — but that only runs with the automation's own live network path
(GitHub Actions / a real local run), and no raw evidence payload is cached
anywhere in the repo to inspect retroactively. This does not block the four
matches reviewed here (see the Kayode finding below), but any future match
where a goal and a substitution share a minute will need that live capture,
or must honestly report ambiguous, exactly as V2.1 already does.

**Goal-event model (implemented — the smallest extension found sufficient):**
an optional `goals` array added to each `LEAGUE_MATCHES` match record (see
the field-by-field doc comment atop `src/data/matchEvents.js`):
`team` ('spurs'|'opponent'), `scorer` (or null), `assist` (or null — left
null rather than guessing when a source credits multiple contributors),
`minute`, `stoppage` (exact added minute as a number, or null when the
source doesn't give one), `period` ('H1'|'H2'), `order` (a source-backed
tie-breaker for same-minute conflicts — null on every real record so far,
since none needed one), and `source` (the URL). No new database, no change
to `automation/matchday-core.js` or the Matchday workflow — ingestion
doesn't populate `goals` yet, so it stays a manual/backfilled field until a
future packet decides that's worth automating.

**Stoppage-time / event-order policy:** stoppage is only ever a real number
from the source, or null — never inferred from "the goal was near the end
of the half". Event order is only ever set from real source evidence (e.g.
a seconds-precision commentary feed); it is never inferred from which team
was winning, which player "should" have been on, or any other heuristic.

**Tactical-role policy (reviewed, not implemented this packet):** the
brief's tactical-role review was answered as a design decision only, since
no reliable match-specific role evidence was gathered or verified this
session for these four matches. Direction for whenever role data is
sourced: an optional `role` field on each `appearances[]` entry (not a
match-level or player-level permanent field), populated only when a source
specifically documents a player's role in that match (the brief's own
example: Gray at right-back, Gallagher advanced, both at Liverpool), with
conservative fallback to the player's existing squad position
(`src/data/squad.js`) when no match-specific evidence exists. No new
ontology beyond the three groupings the brief names (defence/central
midfield/attack, each with a handful of sub-roles) — a flat enum, not a
hierarchy.

**Statistical guardrails (documented for the eventual V2.2 ranking work,
not yet built):** every future combination/rate must carry its own minutes-
together and match-count denominator, not merely an appearance count;
goals scored/conceded must be counted only over minutes the combination was
actually on the pitch together (reusing `getPlayersOnPitchAtGoal`); every
combination display must show its sample size alongside any rate; per the
existing "Next Season Stats packet" bullets below, combinations under 270
shared minutes or three matches are labelled a small sample and excluded
from any "best/worst" ranking; and no output may describe a combination's
on-pitch association as having caused a result — descriptive language only,
matching V2.1's and this packet's own comments.

**What was implemented this packet:** the `goals` field and its data for
all four matches, `src/data/matchEvents.js` (`validateGoalEvents`,
`getGoalEvents`, `splitGoalsByTeam`), and `scripts/test-match-events.js`.
No combination aggregation, no rates, no ranking UI — deliberately, per the
brief's "do not jump directly to rankings from incomplete evidence".

**Genuine finding worth flagging to Kody/Viper:** Kayode's 45+ goal shares
its recorded minute (45) with two Tottenham half-time substitutions
(Gallagher/Bergvall off, Fernandes/Bentancur on). `getPlayersOnPitchAtGoal`
correctly reports all four as ambiguous under the current minute-only
model — proving V2.1's ambiguity design holds up against real evidence, not
only synthetic tests, but also showing the model has no way to use the
football-logic fact that a first-half stoppage-time goal necessarily
precedes half-time substitutions. Resolving that specific case with the new
`period` field is a candidate small enhancement, not implemented here.

**Recommended next V2.2 implementation packet (smallest coherent step):**
using the `goals` field now in place, build the defensive back-line
aggregation named in the "Next Season Stats packet" bullets below — actual
back-line combinations, minutes together, match count, and goals conceded
while that combination was on the pitch (reusing `getPlayersOnPitchAtGoal`
and `getOnPitchAt`) — across ALL completed league matches, including the
0-0 Forest (MW3) and Everton (MW4) matches. Their qualifying on-pitch spells
contribute minutes together and match/sample counts with zero goals conceded.
Never filter the denominator to matches where goals were conceded. Apply the
per-combination sample-size guardrail from the start; do not rank combinations
from the current tiny sample. Still no ranking UI — a plain, labelled combination table is the
target, matching the "do not build a full ranking UI yet" instruction.

### V2.2 — Defensive Combinations V1 — 18 September 2026

Implements the aggregation the discovery packet above recommended, using the
`goals` field it added. Reused `src/data/onPitch.js` and
`src/data/matchEvents.js` unchanged apart from the one boundary correction
below; added no new database, provider or generic analytics framework.

- [x] **Half-time boundary fix (authorized, narrowly scoped correction to
      `src/data/onPitch.js`):** the V2.2 discovery packet's real-data finding
      — Kayode's 45+ goal (period `H1`) coinciding with two half-time
      substitutions also recorded at minute 45 — is now resolved
      deterministically. `resolveSameMinuteBoundary` falls back to a new
      `resolveHalfTimeBoundary` check before returning `ambiguous`: a player
      leaving exactly at the half-time boundary minute (`matchDuration / 2`)
      played the entire first half, and a player entering exactly then plays
      no part of it. This fires ONLY when the goal's `period` is explicitly
      `'H1'` and only at the boundary minute — never inferred, never applied
      elsewhere. Ordinary order/onOrder/offOrder evidence still takes
      priority when present. Regression tests added in
      `scripts/test-onpitch.js` (the general case, a no-period guard, a
      wrong-period guard, an away-from-boundary guard, and the real MW1
      cross-check) and `scripts/test-match-events.js` (updated to assert the
      Kayode case now resolves instead of staying ambiguous). Numerically,
      this fix has **no effect on any of the four completed league matches'
      defensive-combination numbers below** — none of MW1's half-time
      substitutes (Gallagher, Bergvall, Fernandes, Bentancur) is a defender —
      but it is a genuine correctness fix to the shared foundation, needed
      before more matches make it matter.
- [x] **Defensive-outfield identity:** centre-backs and full-backs/wing-backs
      only; goalkeeper and central midfield excluded. Default is squad.js's
      own CB/LB/RB position (Senesi, van Hecke, van de Ven, Tosin
      Adarabioyo, Udogie, Robertson, Porro — an explicit whitelist of the
      real players who have actually appeared, not a name-matching engine,
      since squad.js and seasonStats.js spell names differently). One
      documented override: Archie Gray (squad.js: "CM ... also covers
      DM/RB") is treated as defensive-outfield in MW1, MW2 and MW4 — the
      only three league matches he started — on the strength of independent
      confirmed-lineup/formation reporting for each (WhoScored's
      confirmed-lineup coverage places him in the back line in all three;
      full citations are in the `MATCH_SPECIFIC_DEFENSIVE_OVERRIDES` doc
      comment in `src/data/defensiveCombinations.js`). He was an unused
      substitute in MW3, so no decision was needed there. No other player
      needed an override. This module makes no formation claim (back three
      vs. back four vs. back five) — it only reports which whitelisted
      players were actually on the pitch together, however many that is;
      MW2 genuinely has five recognized defenders on the pitch for the first
      68 minutes (Porro, van de Ven, van Hecke, Robertson, Gray).
- [x] **Aggregation method:** new `src/data/defensiveCombinations.js` (pure,
      deterministic, reusable — the doc comment explains why midfield/
      attacking combinations can reuse the same spell-splitting and
      goal-attribution pattern later without a shared generic framework
      being built prematurely). Each match is split into "defensive spells"
      at every substitution that changes the defensive-outfield on-pitch set
      (an attacking or central-midfield substitution does not start a new
      spell). Each spell contributes its minutes and a match credit to its
      exact player combination (order-independent), regardless of whether a
      goal was conceded during it. Opponent goals are attributed to a
      combination by reusing `onPitch.getPlayersOnPitchAtGoal`; a goal is
      only counted when every defensive-outfield player's presence for it is
      unambiguous — otherwise it is reported separately as unresolved, never
      guessed onto a combination.
- [x] **Current results (all four completed league matches, including both
      0-0s):** 360 total combination-minutes (4 × 90, exactly partitioned),
      5 total opponent goals all attributed, 0 unresolved. Seven distinct
      combinations, every one a small sample (under 270 shared minutes or 3
      matches) from this four-match season:
      - Gray/van Hecke/Robertson/Senesi — 86 min, 1 match, 3 GC, GC/90 3.14
      - Gray/van Hecke/Robertson/van de Ven — 85 min, 1 match, 0 GC
      - Porro/Udogie/van de Ven/van Hecke — 83 min (MW2 + MW3), 2 matches, 1 GC, GC/90 1.08
      - Gray/Porro/van de Ven/van Hecke/Robertson — 68 min, 1 match, 1 GC, GC/90 1.32
      - Porro/Robertson/van de Ven/van Hecke — 29 min, 1 match, 0 GC
      - Robertson/Tosin Adarabioyo/van de Ven/van Hecke — 5 min, 1 match, 0 GC
      - Udogie/van Hecke/Robertson/Senesi — 4 min, 1 match, 0 GC
- [x] **Small-sample treatment:** every combination above is labelled "SMALL
      SAMPLE" in the UI and excluded from any best/worst ranking language;
      none is hidden, including the sub-4-minute combination. The 270-
      minute/3-match floor is unchanged from the standing guardrail
      documented earlier in this file.
- [x] **UI:** a "DEFENSIVE COMBINATIONS" table added to the existing Season
      Stats page (`src/components/SeasonStatsPanel.js`) — Combination /
      Minutes / Matches / Goals Conceded / GC/90 columns, a small-sample
      badge per row, and a caption note — matching the existing panel's
      visual language. No redesign, no chart (a plain table is the clearest
      representation for seven rows).
- [x] **Tests:** `scripts/test-defensive-combinations.js` (new) covers a
      full-match unchanged combination, a substitution creating two spells
      (real MW3 Udogie→Robertson), identical-combination aggregation across
      matches and regardless of player order, a clean-sheet match
      contributing zero-conceded minutes without being excluded, a goal
      charged only to the combination actually on the pitch (real MW1
      Kayode), the half-time-boundary case at this module's level, duplicate-
      identity prevention, and malformed/incomplete data handled without
      throwing — plus real-data invariants (minutes partition every match's
      90, every opponent goal attributed, every combination flagged small
      sample). `scripts/test-onpitch.js` and `scripts/test-match-events.js`
      were extended (not weakened) for the half-time fix; both still pass in
      full alongside the untouched `scripts/test-matchday.js`.
- [x] `npm run test:onpitch`, `npm run test:matchevents`,
      `npm run test:defensivecombinations`, `npm run test:matchday`,
      `npm run check-secrets`, `node build.js` and `git diff --check` all
      pass in an isolated clean clone of this commit (on-device esbuild
      remains broken by the same pre-existing `@esbuild/darwin-arm64` vs.
      `linux-arm64` platform mismatch noted in every prior V2 packet — not a
      regression from this change). Season Stats V1 (`getLeagueSummary`,
      `getPlayerUsage`, `withLeagueResults`), `src/data/squad.js` and the
      entire Matchday updater (`automation/matchday-*.js`,
      `.github/workflows/matchday-update.yml`) are byte-for-byte unchanged
      from `origin/main`, verified with an explicit diff.
- [ ] **Automation gap (already recorded, not duplicated):** goal-event
      ingestion into `goals` is still a manual/backfilled field — see "Known
      automation boundary" above and the V2.2 discovery section's evidence-
      gap note. This packet does not change that; it only consumes the
      `goals` data already in place.

### V2.3 — Central Midfield Influence V1 — 18 September 2026

Implements the first V2.3 packet: which central-midfield unit was on the
pitch with each defensive unit, for how long, and how many goals were
conceded during those shared spells. Purely descriptive — no causation
claim. Reused `src/data/onPitch.js` and `src/data/matchEvents.js`
unchanged; reused `src/data/defensiveCombinations.js`'s own defensive
spell/goal-resolution functions unchanged for the defensive half of the
shared-spell pairing. Added no new database, provider or generic
combination framework.

- [x] **Central-midfield membership**, derived from `src/data/squad.js`'s
      own listed position and real match appearances in
      `src/data/seasonStats.js` — not from any prior chat/completion-report
      player list. Included: Lucas Bergvall, Conor Gallagher (squad.js CM),
      Rodrigo Bentancur, Sandro Tonali (squad.js DM). Excluded, reviewed and
      documented rather than silently omitted: Archie Gray (squad.js CM,
      but real match-specific evidence already places him in the back line
      for every league match he started — MW1, MW2, MW4 — per
      `defensiveCombinations.js`'s existing `MATCH_SPECIFIC_DEFENSIVE_OVERRIDES`;
      he was an unused substitute in MW3, so he contributes zero
      central-midfield minutes across all four completed league matches and
      is not double-counted); Mateus Fernandes, James Maddison, Xavi Simons
      (squad.js AM — attacking midfield is not automatically central
      midfield per the brief, and no match-specific evidence was gathered
      placing any of them in a deeper central role).
- [x] **Aggregation method:** new `src/data/midfieldInfluence.js` mirrors
      `defensiveCombinations.js`'s spell-splitting/goal-resolution pattern
      for central midfield (`getMatchMidfieldSpells`,
      `resolveGoalCentralMidfieldCombination`, `getMidfieldUnitStats`), then
      intersects the two independent spell partitions (defensive and
      central-midfield) of the same match to build the midfield+defence
      shared-spell table (`getMatchMidfieldDefensiveSpells`,
      `getMidfieldDefensiveCombinationStats`). A substitution affecting
      either unit starts a new shared segment; one affecting neither does
      not. Identical combinations aggregate regardless of player ordering.
      Goal attribution reuses `onPitch.getPlayersOnPitchAtGoal` for each
      side independently; a goal only counts toward a shared combination
      when both the defensive and central-midfield presence for it are
      unambiguous — otherwise it is reported separately as unresolved.
- [x] **Current results (all four completed league matches, including both
      0-0s):** Midfield Units — 360 total minutes, 5 goals conceded (all
      attributed), 0 unresolved, five distinct units, every one a small
      sample:
      - Bentancur, Tonali — 190 min, 4 matches, 2 GC, GC/90 0.95
      - Gallagher, Bergvall, Tonali — 45 min, 1 match, 3 GC, GC/90 6.00
      - Gallagher, Bentancur, Tonali — 83 min, 1 match, 0 GC
      - Bergvall, Tonali — 27 min, 1 match, 0 GC
      - Bentancur (alone) — 15 min, 1 match, 0 GC

      Midfield + Defence — same 360 minutes and 5 goals conceded across
      twelve distinct shared combinations (four matches, each split into
      three merged segments by independent defensive/midfield
      substitutions), every one a small sample; full breakdown is in the
      expandable table on the Season Stats page.
- [x] **Small-sample treatment:** identical guardrail to Defensive
      Combinations V1 (270 shared minutes / 3 matches floor); every row is
      labelled "SMALL SAMPLE" and excluded from best/worst language, none
      hidden — including the 15-minute solo-Bentancur row.
- [x] **UI:** a "CENTRAL MIDFIELD INFLUENCE" section added to the existing
      Season Stats page (`src/components/SeasonStatsPanel.js`) — a Midfield
      Units table, plus an expandable Midfield + Defence table (kept
      collapsed by default since twelve small-sample rows would otherwise
      clutter the page) — matching the existing panel's visual language. No
      redesign, no chart.
- [x] **Tests:** `scripts/test-midfield-influence.js` (new) covers an
      unchanged midfield unit for a full match, a midfield substitution
      splitting a spell (real MW4), a defensive substitution splitting a
      shared spell while the midfield unit itself is unchanged (real MW1),
      simultaneous/shared interval calculation, clean-sheet minutes with
      zero conceded, a goal attributed only to the unit actually present
      (real MW1 Kayode half-time-boundary case), order-independent
      aggregation, the match-scoped Gray exclusion, and malformed/incomplete
      data handled without throwing — plus real-data invariants (both
      tables partition 360 minutes, attribute all 5 goals, 0 unresolved,
      every row small-sample, twelve combined rows).
- [x] `npm run test:onpitch`, `npm run test:matchevents`,
      `npm run test:defensivecombinations`, `npm run test:midfieldinfluence`,
      `npm run test:matchday`, `npm run check-secrets`, `node build.js` and
      `git diff --check` all pass. Defensive Combinations V1 confirmed
      unchanged: 360 total minutes, 5 conceded goals, 7 combinations, 0
      unresolved. Season Stats V1, V2.1 and the entire Matchday updater
      (`automation/matchday-*.js`, `.github/workflows/matchday-update.yml`)
      are untouched.
- [ ] **Publication blocked (recorded, not resolved):** this session's
      GitHub proxy is not authorized for `viperkoder/spurs-dashboard`, so
      the branch (`codex/season-stats-v2.3-central-midfield-influence-v1`,
      verified commit `d0b66350e8ed9da79ce9c4d39d087407838ae668`, based on
      verified main `d2053d56a176beaeb4922127593bd56877335787`) could not be
      pushed or opened as a PR from this session. Preserved as a git bundle
      delivered to Viper for Kody to apply and push.

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
