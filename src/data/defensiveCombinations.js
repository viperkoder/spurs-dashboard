// Season Stats V2.2 — Defensive Combinations V1 (18 September 2026).
//
// Aggregates the Spurs outfield DEFENSIVE LINE only — centre-backs and
// full-backs/wing-backs. The goalkeeper is deliberately excluded (a shared,
// constant presence behind every combination, not itself a "combination"),
// and central midfield is out of scope here — that is V2.3's job, per the
// five-phase map in docs/dashboard-maintenance-checklist.md.
//
// This module makes NO formation claim (back three vs. back four vs. back
// five). It only reports which whitelisted defensive-outfield players were
// actually on the pitch together at a given moment, however many that turns
// out to be — Tottenham's real personnel this season sometimes puts four
// recognized defenders on the pitch and sometimes five (see MW2 below).
// Guessing a formation label would invent certainty this project's on-pitch
// modules (src/data/onPitch.js) deliberately avoid.
//
// Defensive-outfield identity:
//   1. squad.js's own CB/LB/RB position is the default (see
//      SQUAD_POSITION_DEFENDERS below — an explicit whitelist of the actual
//      players who have appeared in a completed 2026/27 league match, not a
//      generic name-matching engine; squad.js uses abbreviated first names
//      and seasonStats.js uses full names, so a small fixed list for this
//      bounded set of real players is safer than fuzzy-matching the two).
//   2. One documented override: Archie Gray. squad.js lists him as "CM ...
//      also covers DM/RB", but independent confirmed-lineup/formation
//      reporting places him in Tottenham's back line — not central midfield
//      — in every 2026/27 league match he has actually started (MW1
//      Brentford, MW2 Newcastle, MW4 Everton; he was an unused substitute in
//      MW3, so there is no match needing a decision either way there). See
//      MATCH_SPECIFIC_DEFENSIVE_OVERRIDES for the sourced evidence. No other
//      player across the four completed league matches needed an override —
//      every other appearance was correctly classified by squad.js's own
//      listed position alone.
//   3. Nothing is guessed beyond this: a player with no defensive squad
//      position and no documented override is never treated as defensive,
//      even if their on-pitch minutes happen to overlap a back line.
//
// Goals conceded reuse onPitch.getPlayersOnPitchAtGoal — the same
// attribution function V2.1/V2.2 already established — never a new method.
// A goal only counts toward a combination when every defensive-outfield
// player's presence for it is unambiguous; see resolveGoalDefensiveCombination.
// An unresolved goal is reported separately, never silently dropped or
// guessed onto a combination.

import { getOnPitchAt, getSubstitutionEvents, getPlayersOnPitchAtGoal, getMatchDuration } from './onPitch.js';
import { getGoalEvents } from './matchEvents.js';

// Every player who is a centre-back, full-back or wing-back by squad.js's
// own listed position AND has actually appeared (any minutes) in a
// completed 2026/27 league match per src/data/seasonStats.js. Ben Davies
// (LB) and Kevin Danso (CB) are on the squad list but have not yet played a
// minute in any completed league match this season — add them here the day
// either one actually does, not before (an unused name in this list would
// never match a real appearance, but keeping the list to real, on-pitch
// evidence rather than the whole squad sheet is the smaller, safer default).
export const SQUAD_POSITION_DEFENDERS = new Set([
  'Marcos Senesi',
  'Jan Paul van Hecke',
  'Micky van de Ven',
  'Tosin Adarabioyo',
  'Destiny Udogie',
  'Andy Robertson',
  'Pedro Porro',
]);

// Match-specific role override, backed by real sourced evidence rather than
// squad.js's own listed CM position — see the module doc comment above.
export const MATCH_SPECIFIC_DEFENSIVE_OVERRIDES = new Map([
  [
    'Archie Gray',
    {
      matchweeks: [1, 2, 4],
      evidence:
        "Confirmed-lineup/formation reporting places Gray in Tottenham's back line, not central midfield, in every 2026/27 league match he started: MW1 v Brentford (\"protected by a back four of Archie Gray, Jan Paul van Hecke, Marcos Senesi, and Andy Robertson\"), MW2 v Newcastle (\"a defensive line featuring Archie Gray, Jan Paul van Hecke, Micky van de Ven, and Andy Robertson\"), and MW4 v Everton (\"the back four consisted of Andy Robertson, Archie Gray, Micky van de Ven, Jan Paul van Hecke\") — all via WhoScored's confirmed-lineup coverage of those fixtures. He was an unused substitute in MW3 v Nottingham Forest, so no decision was needed there.",
    },
  ],
]);

// Whether `player` counts as a defensive-outfield player FOR THIS MATCHWEEK.
// The override is deliberately matchweek-scoped, not a blanket "this player
// is always a defender" flag — a future match where Gray plays central
// midfield instead would need its own evidence, not an assumption carried
// over from these three.
export function isDefensiveOutfieldPlayer(player, mw) {
  if (SQUAD_POSITION_DEFENDERS.has(player)) return true;
  const override = MATCH_SPECIFIC_DEFENSIVE_OVERRIDES.get(player);
  return Boolean(override && Array.isArray(override.matchweeks) && override.matchweeks.includes(mw));
}

function combinationKey(players) {
  return [...players].sort().join(' + ');
}

// Splits one match into "defensive spells" — contiguous minute ranges over
// which the exact set of defensive-outfield players on the pitch does not
// change. A substitution that doesn't touch a defensive-outfield player
// (an attacking or central-midfield change) does not start a new spell.
export function getMatchDefensiveSpells(match, options = {}) {
  if (!match || typeof match !== 'object') return [];
  const duration = getMatchDuration(match, options);
  const mw = match.mw;

  const boundaries = new Set([0, duration]);
  getSubstitutionEvents(match, options).forEach(event => {
    if (isDefensiveOutfieldPlayer(event.player, mw)) boundaries.add(event.minute);
  });
  const sortedBoundaries = [...boundaries].filter(Number.isFinite).sort((a, b) => a - b);

  const spells = [];
  for (let i = 0; i < sortedBoundaries.length - 1; i++) {
    const start = sortedBoundaries[i];
    const end = sortedBoundaries[i + 1];
    if (!(end > start)) continue;
    const { onPitch, issues } = getOnPitchAt(match, start, options);
    const players = onPitch.filter(player => isDefensiveOutfieldPlayer(player, mw)).sort();
    spells.push({ mw, start, end, minutes: end - start, players, issues });
  }
  return spells;
}

// Which defensive-outfield combination (if any) was on the pitch for a
// single opponent goal. Never guesses: if any defensive-outfield player's
// presence at that exact minute is ambiguous (see onPitch.js), the goal is
// reported as unresolved instead of assigned to a combination.
export function resolveGoalDefensiveCombination(match, goal, options = {}) {
  const { onPitch, ambiguous, issues } = getPlayersOnPitchAtGoal(match, goal, options);
  const mw = match?.mw;
  const ambiguousDefenders = ambiguous.filter(player => isDefensiveOutfieldPlayer(player, mw));
  if (ambiguousDefenders.length > 0) {
    return {
      resolved: false,
      players: [],
      reason: `Defensive-outfield combination for this goal is ambiguous (${ambiguousDefenders.join(', ')}) — not counted toward any combination.`,
      issues,
    };
  }
  const players = onPitch.filter(player => isDefensiveOutfieldPlayer(player, mw)).sort();
  if (players.length === 0) {
    return { resolved: true, players: [], reason: 'No recognized defensive-outfield player was on the pitch for this goal.', issues };
  }
  return { resolved: true, players, issues };
}

export const SAMPLE_MINUTES_FLOOR = 270;
export const SAMPLE_MATCHES_FLOOR = 3;

// Full aggregation across any set of matches: per distinct defensive
// combination (order-independent), total overlapping on-pitch minutes,
// match count, opponent goals conceded while that exact combination was on
// the pitch, and GC/90. Every qualifying spell contributes minutes and a
// match credit regardless of whether any goal was conceded during it — a
// clean sheet is not filtered out of the denominator.
export function getDefensiveCombinationStats(matches = [], options = {}) {
  const table = new Map();
  const unresolvedGoals = [];

  (Array.isArray(matches) ? matches : []).forEach(match => {
    if (!match || typeof match !== 'object') return;

    getMatchDefensiveSpells(match, options).forEach(spell => {
      if (spell.players.length === 0) return;
      const key = combinationKey(spell.players);
      const row = table.get(key) || { players: spell.players, minutes: 0, matchweeks: new Set(), goalsConceded: 0 };
      row.minutes += spell.minutes;
      row.matchweeks.add(match.mw);
      table.set(key, row);
    });

    getGoalEvents(match)
      .filter(goal => goal && goal.team === 'opponent')
      .forEach(goal => {
        const resolution = resolveGoalDefensiveCombination(match, goal, options);
        if (!resolution.resolved || resolution.players.length === 0) {
          unresolvedGoals.push({ mw: match.mw, goal, reason: resolution.reason || 'Goal could not be attributed to a defensive-outfield combination.' });
          return;
        }
        const key = combinationKey(resolution.players);
        const row = table.get(key);
        if (!row) {
          // A goal's on-pitch combination should always match a computed
          // spell; if it doesn't, that is a genuine inconsistency worth
          // surfacing rather than silently dropping the goal.
          unresolvedGoals.push({
            mw: match.mw,
            goal,
            reason: `Goal's on-pitch defensive combination (${key}) does not match any computed minutes-together spell for this match.`,
          });
          return;
        }
        row.goalsConceded += 1;
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
        goalsConceded: row.goalsConceded,
        gcPer90: row.minutes > 0 ? (row.goalsConceded / row.minutes) * 90 : null,
        smallSample: row.minutes < SAMPLE_MINUTES_FLOOR || matchCount < SAMPLE_MATCHES_FLOOR,
      };
    })
    .sort((a, b) => b.minutes - a.minutes || a.combination.localeCompare(b.combination));

  return { combinations, unresolvedGoals };
}
