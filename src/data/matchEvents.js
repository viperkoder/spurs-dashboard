// Season Stats V2.2 — source-backed goal events (discovery + foundation).
//
// Adds the smallest possible extension to the existing match record: an
// optional `goals` array (see src/data/seasonStats.js) representing real,
// sourced goal events. It changes nothing about V1 (getPlayerUsage,
// getLeagueSummary) or V2.1 (src/data/onPitch.js) — both remain untouched
// and this module is purely additive. Goal attribution to on-pitch players
// reuses onPitch.getPlayersOnPitchAtGoal rather than reimplementing it.
//
// Fields on a goal event, all sourced — never invented:
//   team      'spurs' | 'opponent'
//   scorer    player name, or null if not reliably attributed to one player
//   assist    player name, or null if there was no assist, or the source
//             does not reliably credit a single player (a scramble or
//             deflected goal with multiple contributors is left null rather
//             than guessing which one counts as "the" assist)
//   minute    the regulation minute the goal is reported against (45 for a
//             first-half stoppage-time goal, not 46; 90 for second-half)
//   stoppage  the exact added minute, only when the source states it as a
//             number (e.g. 2 for "45+2'"); null whenever the source doesn't
//             give an exact digit — including when the source says stoppage
//             time occurred at all (e.g. bare "45+") — never guessed
//   period    'H1' | 'H2' when the half is known
//   order     an optional source-backed chronological tie-breaker, in the
//             same spirit as onPitch.js's `order`/`onOrder`/`offOrder` —
//             only set when real ordering evidence exists (e.g. a
//             seconds-precision commentary feed); null otherwise. No goal
//             currently in LEAGUE_MATCHES needs this — none coincides with
//             a substitution minute — so every real record has `order: null`.
//   source    the URL the goal was verified against
//   sourceNote (optional) the source's own notation or a buildup detail,
//             preserved verbatim for audit when the structured fields above
//             can't capture it precisely (e.g. an ambiguous multi-touch
//             buildup, or a bare "45+" with no digit)

function isValidTeam(team) {
  return team === 'spurs' || team === 'opponent';
}

// Non-throwing structural check for one match's `goals` array. A match with
// no `goals` field at all is not flagged as invalid here — whether that
// means "not yet reviewed" is a data-completeness question for the
// checklist, not something this validator can determine from the record
// alone. An empty array is always valid: it is how a genuinely goalless
// match is represented once reviewed.
export function validateGoalEvents(match) {
  if (match == null || typeof match !== 'object') {
    return { valid: false, issues: ['Match is missing or not an object'] };
  }
  if (match.goals === undefined) {
    return { valid: true, issues: [] };
  }
  if (!Array.isArray(match.goals)) {
    return { valid: false, issues: ['goals is present but not an array'] };
  }

  const issues = [];
  match.goals.forEach((goal, index) => {
    const label = `goals[${index}]`;
    if (!goal || typeof goal !== 'object') {
      issues.push(`${label}: missing or not an object`);
      return;
    }
    if (!isValidTeam(goal.team)) issues.push(`${label}: team must be 'spurs' or 'opponent'`);
    if (!Number.isFinite(goal.minute)) issues.push(`${label}: minute is not a number`);
    if (goal.minute < 0) issues.push(`${label}: minute is negative`);
    if (goal.stoppage !== undefined && goal.stoppage !== null && !Number.isFinite(goal.stoppage)) {
      issues.push(`${label}: stoppage must be a finite number or null`);
    }
    if (goal.period !== undefined && goal.period !== null && goal.period !== 'H1' && goal.period !== 'H2') {
      issues.push(`${label}: period must be 'H1' or 'H2' when present`);
    }
    if (goal.order !== undefined && goal.order !== null && !Number.isFinite(goal.order)) {
      issues.push(`${label}: order must be a finite number or null`);
    }
    if (!goal.source) issues.push(`${label}: missing source`);
  });

  return { valid: issues.length === 0, issues };
}

// The match's goal events, safely — never throws, never fabricates a
// missing field, and never assumes an absent `goals` field means zero
// goals (use validateGoalEvents / the checklist to tell "reviewed, zero
// goals" apart from "not yet reviewed").
export function getGoalEvents(match) {
  return Array.isArray(match?.goals) ? match.goals : [];
}

// Splits a match's goals into for/against — a small convenience for the
// combination stats this foundation exists to support later. Descriptive
// only: this makes no claim about why a goal happened.
export function splitGoalsByTeam(match) {
  const goals = getGoalEvents(match);
  return {
    spurs: goals.filter(goal => goal.team === 'spurs'),
    opponent: goals.filter(goal => goal.team === 'opponent'),
  };
}
