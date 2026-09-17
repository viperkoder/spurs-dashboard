// Season Stats V2.4 — Attacking Combinations V1 (18 September 2026).
//
// Answers: which attacking players actually shared the pitch, for how long,
// and what attacking outcomes (Spurs goals) occurred while those units were
// together? The eventual question this builds toward — when Spurs score,
// which attacking unit was actually on the pitch — cannot be answered from
// the current authoritative dataset: all four completed league matches have
// Spurs score 0, so there is no real Spurs goal yet to attribute. This
// module is deliberately built so a real Spurs goal, once it exists, is
// attributed automatically with no redesign — proven here with synthetic
// tests, never invented real data.
//
// Reuses the established pattern exactly as V2.2 (defensiveCombinations.js)
// and V2.3 (midfieldInfluence.js) do: src/data/onPitch.js for on-pitch/goal
// queries, src/data/matchEvents.js for goal events. No new interval engine,
// database or generic "combination framework" — the same spell-splitting
// pattern, once more, for attacking players, filtered to team: 'spurs'
// goals instead of 'opponent'.
//
// ---------------------------------------------------------------------------
// ATTACKING MEMBERSHIP — verified against src/data/squad.js and real match
// appearances in src/data/seasonStats.js, NOT against any prior chat or
// completion-report player list.
// ---------------------------------------------------------------------------
//
// Default rule: a player whose squad.js position is ST, LW, RW or AM AND who
// has actually appeared in a completed 2026/27 league match. Central
// midfield (CM/DM — already resolved by midfieldInfluence.js) and defensive
// positions (already resolved by defensiveCombinations.js) are never
// included merely because a central midfielder gets forward or a full-back
// overlaps — no player from those two modules' whitelists appears here,
// and none needed match-specific evidence to the contrary in these four
// matches.
//
// Included by squad.js's own listed position (no override needed):
//   - Mathys Tel, Mykhailo Mudryk (LW)
//   - Mohammed Kudus, Sávio (RW)
//   - Omar Marmoush, Dominic Solanke (ST)
//   - James Maddison, Mateus Fernandes (AM — genuinely part of the
//     attacking unit in every appearance reviewed here; no match-specific
//     evidence suggested a deeper central role for either)
//
// Match-specific additions, documented rather than silently guessed —
// both are a squad.js ROSTER GAP, not a role correction:
//   - Richarlison — has appeared (MW1) but squad.js's SQUAD list currently
//     has no entry for him at all (a pre-existing data gap: transfers.js
//     and finances.js both still carry him as an unresolved Turkish-window
//     exit rumour, not a departure, so he should logically still be listed
//     in squad.js and evidently is not — flagged below as a genuine finding
//     for the weekly reconciliation checklist, not fixed in this packet,
//     which must not rewrite squad.js). With no squad.js position to read,
//     his classification here relies on reliable external evidence per the
//     packet brief: he is a recognized forward, and started as part of
//     Tottenham's front line in MW1. Scoped to MW1, the only match he
//     appears in.
//   - Mikey Moore — has appeared (MW1, MW2) but has since left on loan
//     (transfers.js: "COMPLETED — season-long loan to FC Köln"), so his
//     correct absence from squad.js's CURRENT squad list does not mean his
//     historical minutes should be dropped or misclassified. Reliable
//     external evidence: he is a recognized Tottenham academy winger.
//     Scoped to MW1 and MW2, the only matches he appears in.
// No other player across the four completed league matches needed a
// match-specific decision.

import { getOnPitchAt, getSubstitutionEvents, getPlayersOnPitchAtGoal, getMatchDuration } from './onPitch.js';
import { getGoalEvents } from './matchEvents.js';
import { SAMPLE_MINUTES_FLOOR, SAMPLE_MATCHES_FLOOR } from './defensiveCombinations.js';

export const SQUAD_POSITION_ATTACKERS = new Set([
  'Mathys Tel',
  'Mykhailo Mudryk',
  'Mohammed Kudus',
  'Sávio',
  'Omar Marmoush',
  'Dominic Solanke',
  'James Maddison',
  'Mateus Fernandes',
]);

// Match-specific attacking additions for players missing from squad.js's
// current roster (see the module doc comment above for why each one is
// here) — same Map shape as defensiveCombinations.js's and
// midfieldInfluence.js's match-specific overrides, so a future correction
// or removal doesn't require a structural change.
export const MATCH_SPECIFIC_ATTACKING_OVERRIDES = new Map([
  [
    'Richarlison',
    {
      matchweeks: [1],
      evidence:
        "Missing from squad.js's current SQUAD list — a pre-existing roster gap (transfers.js/finances.js still carry him as an unresolved Turkish-window exit rumour, not a confirmed departure). Started as part of Tottenham's front line in MW1 v Brentford, his only appearance this season. Classified as attacking on reliable external evidence: he is a recognized forward.",
    },
  ],
  [
    'Mikey Moore',
    {
      matchweeks: [1, 2],
      evidence:
        "Absent from squad.js's CURRENT squad — correctly, since transfers.js records a completed season-long loan to FC Köln — but appeared for Tottenham in MW1 v Brentford and MW2 v Newcastle before that departure. Classified as attacking for those historical minutes on reliable external evidence: he is a recognized Tottenham academy winger.",
    },
  ],
]);

// Whether `player` counts as an attacking player FOR THIS MATCHWEEK.
// Matchweek-scoped, exactly like isDefensiveOutfieldPlayer and
// isCentralMidfieldPlayer — a player's role may vary by match, and a
// roster-gap addition only applies to the matches it is actually evidenced
// for.
export function isAttackingPlayer(player, mw) {
  if (SQUAD_POSITION_ATTACKERS.has(player)) return true;
  const override = MATCH_SPECIFIC_ATTACKING_OVERRIDES.get(player);
  return Boolean(override && Array.isArray(override.matchweeks) && override.matchweeks.includes(mw));
}

function combinationKey(players) {
  return [...players].sort().join(' + ');
}

// Splits one match into "attacking spells" — contiguous minute ranges over
// which the exact set of attacking players on the pitch does not change. A
// substitution that doesn't touch an attacking player (a defensive or
// central-midfield change) does not start a new spell. Mirrors
// getMatchDefensiveSpells / getMatchMidfieldSpells exactly, with the
// attacking membership test in place of theirs. A spell's player count is
// whatever the evidence produces — 3, 4, 5 or any other number — never
// forced to a fixed front three/four.
export function getMatchAttackingSpells(match, options = {}) {
  if (!match || typeof match !== 'object') return [];
  const duration = getMatchDuration(match, options);
  const mw = match.mw;

  const boundaries = new Set([0, duration]);
  getSubstitutionEvents(match, options).forEach(event => {
    if (isAttackingPlayer(event.player, mw)) boundaries.add(event.minute);
  });
  const sortedBoundaries = [...boundaries].filter(Number.isFinite).sort((a, b) => a - b);

  const spells = [];
  for (let i = 0; i < sortedBoundaries.length - 1; i++) {
    const start = sortedBoundaries[i];
    const end = sortedBoundaries[i + 1];
    if (!(end > start)) continue;
    const { onPitch, issues } = getOnPitchAt(match, start, options);
    const players = onPitch.filter(player => isAttackingPlayer(player, mw)).sort();
    spells.push({ mw, start, end, minutes: end - start, players, issues });
  }
  return spells;
}

// Which attacking combination (if any) was on the pitch for a single Spurs
// goal. Never guesses — mirrors resolveGoalDefensiveCombination /
// resolveGoalCentralMidfieldCombination exactly, including preserving
// same-minute substitution ambiguity: a player whose entry/exit minute
// matches the goal's minute is reported as ambiguous unless the caller
// supplies real source-backed ordering (see onPitch.js).
export function resolveGoalAttackingCombination(match, goal, options = {}) {
  const { onPitch, ambiguous, issues } = getPlayersOnPitchAtGoal(match, goal, options);
  const mw = match?.mw;
  const ambiguousAttackers = ambiguous.filter(player => isAttackingPlayer(player, mw));
  if (ambiguousAttackers.length > 0) {
    return {
      resolved: false,
      players: [],
      reason: `Attacking combination for this goal is ambiguous (${ambiguousAttackers.join(', ')}) — not counted toward any combination.`,
      issues,
    };
  }
  const players = onPitch.filter(player => isAttackingPlayer(player, mw)).sort();
  if (players.length === 0) {
    return { resolved: true, players: [], reason: 'No recognized attacking player was on the pitch for this goal.', issues };
  }
  return { resolved: true, players, issues };
}

// Full aggregation across any set of matches: per distinct attacking
// combination (order-independent), total overlapping on-pitch minutes,
// match count, Spurs goals scored while that exact combination was on the
// pitch, and GF/90. Every qualifying spell contributes minutes and a match
// credit regardless of whether a goal was scored during it — a scoreless
// match is not filtered out of the denominator; it is attacking-unit usage
// evidence, not a claim about attacking quality.
export function getAttackingCombinationStats(matches = [], options = {}) {
  const table = new Map();
  const unresolvedGoals = [];

  (Array.isArray(matches) ? matches : []).forEach(match => {
    if (!match || typeof match !== 'object') return;

    getMatchAttackingSpells(match, options).forEach(spell => {
      if (spell.players.length === 0) return;
      const key = combinationKey(spell.players);
      const row = table.get(key) || { players: spell.players, minutes: 0, matchweeks: new Set(), goalsScored: 0 };
      row.minutes += spell.minutes;
      row.matchweeks.add(match.mw);
      table.set(key, row);
    });

    getGoalEvents(match)
      .filter(goal => goal && goal.team === 'spurs')
      .forEach(goal => {
        const resolution = resolveGoalAttackingCombination(match, goal, options);
        if (!resolution.resolved || resolution.players.length === 0) {
          unresolvedGoals.push({ mw: match.mw, goal, reason: resolution.reason || 'Goal could not be attributed to an attacking combination.' });
          return;
        }
        const key = combinationKey(resolution.players);
        const row = table.get(key);
        if (!row) {
          unresolvedGoals.push({
            mw: match.mw,
            goal,
            reason: `Goal's on-pitch attacking combination (${key}) does not match any computed minutes-together spell for this match.`,
          });
          return;
        }
        row.goalsScored += 1;
      });
  });

  const combinations = [...table.values()]
    .map(row => {
      const matchCount = row.matchweeks.size;
      return {
        players: row.players,
        combination: row.players.join(', '),
        minutes: row.minutes,
        matches: matchCount,
        goalsScored: row.goalsScored,
        gfPer90: row.minutes > 0 ? (row.goalsScored / row.minutes) * 90 : null,
        smallSample: row.minutes < SAMPLE_MINUTES_FLOOR || matchCount < SAMPLE_MATCHES_FLOOR,
      };
    })
    .sort((a, b) => b.minutes - a.minutes || a.combination.localeCompare(b.combination));

  return { combinations, unresolvedGoals };
}

// ---------------------------------------------------------------------------
// STATISTICAL GUARDRAIL: with zero Spurs goals in the current authoritative
// dataset, every real-data row's Goals/GF-90 is 0 / 0.00. That is a true
// count, not a placeholder or an unavailable value — it reflects the actual
// evidence. It is NOT a ranking of attacking quality: no combination here is
// described as best, worst, most or least dangerous/effective, and none is
// hidden for being small-sample or scoreless. This module reports on-pitch
// attacking-unit usage; it does not isolate a combination's contribution
// from opponent strength, game state, score effects, tactical instructions,
// red cards or any other contextual factor, and computes no composite
// "influence" or "danger" score.
// ---------------------------------------------------------------------------
