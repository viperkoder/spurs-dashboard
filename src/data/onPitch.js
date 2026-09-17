// On-pitch foundation (Season Stats V2.1).
//
// Answers one question, reliably: who was actually on the pitch at a given
// point of a match? Every other V2 packet (defensive/midfield/attacking
// combinations) is built on top of this file's query functions.
//
// This module is intentionally free of causation claims. It reports what the
// data shows — which players occupied the pitch during which interval — and
// nothing about why a result happened. Consumers must not infer that a
// player's presence "caused" a defensive or attacking outcome from this data
// alone; see docs/dashboard-maintenance-checklist.md for the football-logic
// guardrails the later V2 phases must respect.
//
// Data source: each match's `appearances` array (see src/data/seasonStats.js)
// already stores each player's on-pitch interval directly as regulation
// minutes `on`/`off` — starters begin at 0, a substitute's `on` is their
// entry minute, and `off` is the minute a player left (or 90 if they played
// to full time). That is the existing, audited evidence; this module does
// not reconstruct intervals from raw substitution events because the source
// data already is the interval, not a stream of events to replay.
//
// Known data gap (identified, not fabricated): LEAGUE_MATCHES currently
// carries no goal-event (minute/scorer) records — Spurs have not scored a
// league goal this season (GF 0) and opponent goal minutes are not yet
// captured anywhere in the repo (see docs/dashboard-maintenance-checklist.md,
// "Next Season Stats packet"). The goal-attribution functions below accept a
// `goal` object as an explicit input so later phases can supply real,
// source-backed goal events once that data exists; this module invents none.
//
// Same-minute honesty (goal vs. substitution): minute-only data cannot show
// whether a goal happened before or after a substitution reported in the
// same minute — half-time (45') and full/stoppage time (90'+) substitutions
// carry the identical ambiguity as any other minute. Ordinary roster/minute
// queries (getOnPitchAt) keep the existing half-open [on, off) convention
// regardless, per the project's agreed rule — that convention is a
// reasonable, documented default for "who was on the pitch", not a claim
// about event order. Goal attribution (getPlayersOnPitchAtGoal) is held to a
// stricter standard: a player whose entry/exit minute matches the goal's
// minute is reported as `ambiguous`, never silently included or excluded,
// unless the caller supplies real source-backed ordering (see `order` below).

export const DEFAULT_MATCH_DURATION = 90;

export function getMatchDuration(match, options = {}) {
  if (Number.isFinite(options.matchDuration)) return options.matchDuration;
  if (match && Number.isFinite(match.durationMinutes)) return match.durationMinutes;
  return DEFAULT_MATCH_DURATION;
}

// ---------------------------------------------------------------------------
// Validation (defensive — independent of automation/matchday-core.js, which
// already throws on ingestion for LEAGUE_MATCHES. This module must stay safe
// even for records that have not gone through that gate, e.g. cup matches
// with extra time, or future/hand-authored data.)
// ---------------------------------------------------------------------------

// Checks one match's appearances for structural soundness. Never throws;
// returns issues so callers can decide how to degrade (skip the match, skip
// one player, surface a warning) rather than crash or silently guess.
export function validateOnPitchData(match, options = {}) {
  const duration = getMatchDuration(match, options);
  const issues = [];

  if (!match || typeof match !== 'object') {
    return { valid: false, issues: ['Match is missing or not an object'], duration };
  }
  if (!Array.isArray(match.appearances) || match.appearances.length === 0) {
    return { valid: false, issues: ['Match has no appearances array'], duration };
  }

  const nameCounts = new Map();
  match.appearances.forEach(appearance => {
    if (appearance && appearance.player) {
      nameCounts.set(appearance.player, (nameCounts.get(appearance.player) || 0) + 1);
    }
  });

  let startersCount = 0;
  match.appearances.forEach((appearance, index) => {
    const label = appearance && appearance.player ? appearance.player : `appearance[${index}]`;
    if (!appearance || typeof appearance !== 'object' || !appearance.player) {
      issues.push(`${label}: missing player name`);
      return;
    }
    if (nameCounts.get(appearance.player) > 1) {
      issues.push(`${label}: duplicate appearance for this player — excluded from all queries, not guessed`);
    }

    if (!Number.isFinite(appearance.on) || !Number.isFinite(appearance.off)) {
      issues.push(`${label}: on/off minute is not a number`);
      return;
    }
    if (appearance.on < 0) issues.push(`${label}: on minute is negative`);
    if (appearance.off < appearance.on) issues.push(`${label}: off minute is before on minute`);
    if (appearance.off > duration) issues.push(`${label}: off minute (${appearance.off}) exceeds match duration (${duration})`);
    if (typeof appearance.started !== 'boolean') issues.push(`${label}: started flag is missing or not boolean`);
    if (appearance.started === true && appearance.on !== 0) issues.push(`${label}: started but on minute is not 0`);
    if (appearance.started === false && appearance.on === 0) issues.push(`${label}: substitute has on minute 0`);
    if (appearance.started) startersCount += 1;
  });

  if (startersCount !== 11) {
    issues.push(`Starting XI has ${startersCount} players, expected 11`);
  }

  return { valid: issues.length === 0, issues, duration };
}

// The single source of "which appearance records can this module safely use"
// — every query function below is built on this, so an invalid or malformed
// record is excluded everywhere consistently, not just flagged in one place.
// Excluded, never guessed at: missing/non-object entries, a non-array
// `appearances` field (returns none rather than throwing), any player name
// that appears more than once (we cannot know which duplicate is authoritative,
// so neither is used), non-numeric on/off, and an interval that is negative,
// backwards (off before on) or runs past the match duration.
function getUsableAppearances(match, options = {}) {
  const duration = getMatchDuration(match, options);
  const appearances = Array.isArray(match?.appearances) ? match.appearances : [];

  const nameCounts = new Map();
  appearances.forEach(appearance => {
    if (appearance && appearance.player) {
      nameCounts.set(appearance.player, (nameCounts.get(appearance.player) || 0) + 1);
    }
  });

  return appearances.filter(appearance => {
    if (!appearance || typeof appearance !== 'object' || !appearance.player) return false;
    if (nameCounts.get(appearance.player) > 1) return false;
    if (!Number.isFinite(appearance.on) || !Number.isFinite(appearance.off)) return false;
    if (appearance.on < 0) return false;
    if (appearance.off < appearance.on) return false;
    if (appearance.off > duration) return false;
    return true;
  });
}

// ---------------------------------------------------------------------------
// Core queries
// ---------------------------------------------------------------------------

// The eleven players who kicked the match off. Starting XI alone cannot
// answer "who was on the pitch at minute X" — callers needing that must use
// getOnPitchAt below.
export function getStartingXI(match, options = {}) {
  return getUsableAppearances(match, options)
    .filter(appearance => appearance.started === true)
    .map(appearance => appearance.player);
}

// Whether a single appearance interval covers `minute`.
//
// Boundary rule (documented, not incidental): intervals are half-open
// [on, off) for a player who was substituted off before the final whistle.
// A player who was still on the pitch at the end of the match
// (off >= matchDuration) is credited through the final minute inclusive, so
// a goal scored in stoppage time still counts for players who played to full
// time. This is the project's agreed default for ordinary roster/minute
// queries; it is not used as-is for goal attribution at a same-minute
// boundary — see getPlayersOnPitchAtGoal.
export function isOnPitchAt(appearance, minute, matchDuration = DEFAULT_MATCH_DURATION) {
  if (!appearance || !Number.isFinite(appearance.on) || !Number.isFinite(appearance.off)) return false;
  if (minute < appearance.on) return false;
  if (appearance.off >= matchDuration) return minute <= appearance.off;
  return minute < appearance.off;
}

// Every player on the pitch at a given regulation minute. Returns the roster
// plus any structural issues found along the way (an invalid or duplicate
// appearance is excluded from the roster rather than guessed into it).
export function getOnPitchAt(match, minute, options = {}) {
  const { issues, duration } = validateOnPitchData(match, options);
  const blocking = issues.filter(issue => !issue.startsWith('Starting XI has'));

  const onPitch = getUsableAppearances(match, options)
    .filter(appearance => isOnPitchAt(appearance, minute, duration))
    .map(appearance => appearance.player);

  return { onPitch, issues: blocking };
}

// Chronological substitution events derived from the appearance intervals:
// every "off" before full time is an exit, every "on" above 0 is an entry.
// Ordered by minute, with exits before entries in the same minute (a player
// leaves, then the replacement enters).
export function getSubstitutionEvents(match, options = {}) {
  const duration = getMatchDuration(match, options);
  const events = [];
  getUsableAppearances(match, options).forEach(appearance => {
    if (appearance.on > 0) events.push({ minute: appearance.on, type: 'on', player: appearance.player });
    if (appearance.off < duration) events.push({ minute: appearance.off, type: 'off', player: appearance.player });
  });
  const typeOrder = { off: 0, on: 1 };
  events.sort((a, b) => (a.minute - b.minute) || (typeOrder[a.type] - typeOrder[b.type]));
  return events;
}

// Decides whether a player who entered/left in the exact same minute as a
// goal was on the pitch for it, using only real source-backed ordering.
//
// `order` fields are an optional, caller-supplied tie-breaker (for example a
// commentary sequence number or a seconds-into-the-match value) — not a
// minute. If both the goal and the appearance's relevant boundary carry a
// finite `order`, the earlier one is treated as happening first. If either
// is missing, or they are equal, ordering cannot be established and the
// result is 'ambiguous' — never guessed.
function resolveSameMinuteBoundary(appearance, goal, boundaryType, duration) {
  const appearanceOrder = boundaryType === 'on' ? appearance.onOrder : appearance.offOrder;
  const goalOrder = goal.order;
  if (Number.isFinite(appearanceOrder) && Number.isFinite(goalOrder) && appearanceOrder !== goalOrder) {
    if (boundaryType === 'on') {
      // Entering player: on the pitch for the goal only if they entered first.
      return appearanceOrder < goalOrder ? 'on-pitch' : 'off-pitch';
    }
    // Departing player: on the pitch for the goal only if they left afterwards.
    return appearanceOrder > goalOrder ? 'on-pitch' : 'off-pitch';
  }

  const halfTimeResolution = resolveHalfTimeBoundary(appearance, goal, boundaryType, duration);
  if (halfTimeResolution) return halfTimeResolution;

  return 'ambiguous';
}

// Half-time boundary resolution (Season Stats V2.2 Defensive Combinations V1,
// 18 September 2026) — the ONE same-minute case resolved without a real
// order/onOrder/offOrder field, because it follows from facts this project
// already records, not from an invented event order:
//
//   - A goal's `period: 'H1'` means the source itself reports the goal as
//     happening in the first half.
//   - This file's own documented minute convention (see the header comment
//     and src/data/seasonStats.js) means a substitution recorded "at" the
//     half-time boundary minute (half the match duration — 45' for a normal
//     90-minute match) takes effect at the start of the second half: a
//     departing starter is credited through that exact minute (they played
//     the entire first half), and an entering substitute begins exactly
//     then (they play no part of the first half).
//
// Put those two together and a first-half goal reported at that same
// boundary minute cannot have happened after a half-time introduction, or
// before a half-time departure — the half itself hasn't ended for the
// departing player, and hasn't started yet for the entering one. This is
// narrow by design: it only fires at the half-time boundary minute, and
// only when the goal's `period` is explicitly 'H1' — never inferred when
// `period` is absent, and never applied to any other minute (an ordinary
// in-half same-minute conflict still has no such guarantee and stays
// 'ambiguous', exactly as before).
function resolveHalfTimeBoundary(appearance, goal, boundaryType, duration) {
  if (goal.period !== 'H1') return null;
  const halfTimeMinute = duration / 2;
  if (goal.minute !== halfTimeMinute) return null;
  // A player leaving exactly at half time played the entire first half.
  if (boundaryType === 'off') return 'on-pitch';
  // A player entering exactly at half time plays no part of the first half.
  return 'off-pitch';
}

// Players on the pitch for a given goal event.
//
// `goal` is caller-supplied: { minute, stoppage?, order?, team: 'spurs'|'opponent', scorer? }.
// This function performs no attribution beyond "who was on the pitch" — it
// does not and must not claim any player caused the goal. Stoppage time is
// accepted and preserved for audit/display only; it is never fabricated when
// absent, and the containment check uses the base regulation minute, so a
// goal in added time after a player's full-match appearance
// (off >= matchDuration) is still correctly included via the inclusive
// full-time boundary in isOnPitchAt.
//
// When the goal's minute exactly matches a player's entry or exit minute,
// this function does NOT fall back to the [on, off) convention used for
// ordinary roster queries — source data at minute granularity cannot show
// whether the goal preceded or followed that substitution. That player is
// returned in `ambiguous` instead of `onPitch`, unless the caller supplied
// real ordering evidence via `order`/`onOrder`/`offOrder` (see
// resolveSameMinuteBoundary above).
export function getPlayersOnPitchAtGoal(match, goal, options = {}) {
  if (!goal || !Number.isFinite(goal.minute)) {
    return { onPitch: [], ambiguous: [], issues: ['Goal event is missing a minute'] };
  }

  const { issues, duration } = validateOnPitchData(match, options);
  const blocking = issues.filter(issue => !issue.startsWith('Starting XI has'));
  const onPitch = [];
  const ambiguous = [];

  getUsableAppearances(match, options).forEach(appearance => {
    const enteredThisMinute = appearance.on === goal.minute && appearance.on > 0;
    const leftThisMinute = appearance.off === goal.minute && appearance.off < duration;

    if (enteredThisMinute || leftThisMinute) {
      const boundaryType = enteredThisMinute ? 'on' : 'off';
      const resolution = resolveSameMinuteBoundary(appearance, goal, boundaryType, duration);
      if (resolution === 'on-pitch') onPitch.push(appearance.player);
      else if (resolution === 'ambiguous') ambiguous.push(appearance.player);
      // 'off-pitch' resolutions contribute nothing — correctly excluded.
      return;
    }

    if (isOnPitchAt(appearance, goal.minute, duration)) onPitch.push(appearance.player);
  });

  if (ambiguous.length > 0) {
    blocking.push(
      `Minute ${goal.minute}: event ordering vs. a substitution in the same minute is not established in the source data for ${ambiguous.join(', ')} — reported as ambiguous rather than assigned.`
    );
  }

  return { onPitch, ambiguous, issues: blocking };
}
