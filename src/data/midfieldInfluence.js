// Season Stats V2.3 — Central Midfield Influence V1 (18 September 2026).
//
// Answers: which central-midfield unit was on the pitch with each defensive
// unit, for how long, and how many goals were conceded during those shared
// spells? Purely descriptive — see the module-level guardrail note at the
// bottom of this file and docs/dashboard-maintenance-checklist.md. This does
// NOT claim the midfield caused a defensive result.
//
// Reuses the existing foundation exactly as V2.2 Defensive Combinations V1
// did: src/data/onPitch.js for on-pitch/goal-attribution queries,
// src/data/matchEvents.js for goal events, and
// src/data/defensiveCombinations.js's own defensive-spell/goal-resolution
// functions for the defensive half of the shared-spell pairing. No new
// interval engine, database or generic "combination framework" is
// introduced — the same spell-splitting pattern documented in
// defensiveCombinations.js is repeated for central midfield, then the two
// independent spell partitions of the same match are intersected.
//
// ---------------------------------------------------------------------------
// CENTRAL MIDFIELD MEMBERSHIP — verified against src/data/squad.js and real
// match appearances in src/data/seasonStats.js, NOT against any prior chat
// or completion-report player list.
// ---------------------------------------------------------------------------
//
// Included (squad.js's own listed CM/DM position, no match-specific evidence
// contradicts it for any of the four completed league matches):
//   - Lucas Bergvall     (squad.js: "CM")
//   - Conor Gallagher    (squad.js: "CM")
//   - Rodrigo Bentancur  (squad.js: "DM ... also covers CM")
//   - Sandro Tonali      (squad.js: "DM")
// These four cover the No.6 (Bentancur, Tonali) and No.8/deeper-playmaker
// (Bergvall, Gallagher) roles the packet brief names. No complicated
// tactical-role ontology is introduced beyond squad.js's own position field.
//
// Explicitly excluded, reviewed and documented rather than silently
// omitted:
//   - Archie Gray (squad.js: "CM ... also covers DM/RB") — real match-
//     specific evidence (see src/data/defensiveCombinations.js's
//     MATCH_SPECIFIC_DEFENSIVE_OVERRIDES, the same sourced WhoScored
//     confirmed-lineup evidence, not repeated here) places him in
//     Tottenham's back line in every 2026/27 league match he has actually
//     started (MW1, MW2, MW4); he was an unused substitute in MW3. He
//     therefore contributes zero central-midfield minutes across all four
//     completed league matches and is deliberately left out of
//     SQUAD_POSITION_CENTRAL_MIDFIELDERS below — treating him as central
//     midfield here would double-count a player already resolved as a
//     defender by the existing, reviewed module, which this packet must not
//     re-litigate without new match-specific evidence of its own.
//   - Mateus Fernandes, James Maddison, Xavi Simons — squad.js lists all
//     three as "AM" (attacking midfield / No.10). Per the packet brief,
//     attacking midfield is not automatically central midfield. No match-
//     specific evidence was gathered or verified this session placing any
//     of them in a deeper central role for a specific match/spell (Simons
//     has made no league appearance this season regardless). They stay
//     excluded — reviewed, not included, exactly as V2.2's discovery packet
//     treated unverified role claims.
//
// No player appears in both SQUAD_POSITION_CENTRAL_MIDFIELDERS here and
// defensiveCombinations.js's SQUAD_POSITION_DEFENDERS/overrides — Gray is
// the only player either module needed to place, and he is placed once, in
// the defensive module only.

import { getOnPitchAt, getSubstitutionEvents, getPlayersOnPitchAtGoal, getMatchDuration } from './onPitch.js';
import { getGoalEvents } from './matchEvents.js';
import { getMatchDefensiveSpells, resolveGoalDefensiveCombination, SAMPLE_MINUTES_FLOOR, SAMPLE_MATCHES_FLOOR } from './defensiveCombinations.js';

export const SQUAD_POSITION_CENTRAL_MIDFIELDERS = new Set([
  'Lucas Bergvall',
  'Conor Gallagher',
  'Rodrigo Bentancur',
  'Sandro Tonali',
]);

// Reserved for a future match-specific central-midfield override (e.g. a
// player whose squad.js position is not CM/DM but who is documented, with
// real sourced evidence, as having played centrally in a specific match).
// Empty on this packet: no such evidence was found or needed for the four
// completed league matches. Kept as a Map, matching
// defensiveCombinations.js's MATCH_SPECIFIC_DEFENSIVE_OVERRIDES shape, so a
// future override does not require a structural change here.
export const MATCH_SPECIFIC_MIDFIELD_OVERRIDES = new Map();

// Whether `player` counts as central midfield FOR THIS MATCHWEEK. Matchweek-
// scoped, exactly like isDefensiveOutfieldPlayer — a player's role may vary
// by match, and any future override only applies to the matches it is
// actually evidenced for.
export function isCentralMidfieldPlayer(player, mw) {
  if (SQUAD_POSITION_CENTRAL_MIDFIELDERS.has(player)) return true;
  const override = MATCH_SPECIFIC_MIDFIELD_OVERRIDES.get(player);
  return Boolean(override && Array.isArray(override.matchweeks) && override.matchweeks.includes(mw));
}

function combinationKey(players) {
  return [...players].sort().join(' + ');
}

// Splits one match into "central-midfield spells" — contiguous minute
// ranges over which the exact set of central-midfield players on the pitch
// does not change. A substitution that doesn't touch a central-midfield
// player (a defensive or attacking change) does not start a new spell. This
// mirrors getMatchDefensiveSpells in defensiveCombinations.js exactly, with
// the central-midfield membership test in place of the defensive one.
export function getMatchMidfieldSpells(match, options = {}) {
  if (!match || typeof match !== 'object') return [];
  const duration = getMatchDuration(match, options);
  const mw = match.mw;

  const boundaries = new Set([0, duration]);
  getSubstitutionEvents(match, options).forEach(event => {
    if (isCentralMidfieldPlayer(event.player, mw)) boundaries.add(event.minute);
  });
  const sortedBoundaries = [...boundaries].filter(Number.isFinite).sort((a, b) => a - b);

  const spells = [];
  for (let i = 0; i < sortedBoundaries.length - 1; i++) {
    const start = sortedBoundaries[i];
    const end = sortedBoundaries[i + 1];
    if (!(end > start)) continue;
    const { onPitch, issues } = getOnPitchAt(match, start, options);
    const players = onPitch.filter(player => isCentralMidfieldPlayer(player, mw)).sort();
    spells.push({ mw, start, end, minutes: end - start, players, issues });
  }
  return spells;
}

// Which central-midfield combination (if any) was on the pitch for a single
// opponent goal. Never guesses — mirrors resolveGoalDefensiveCombination.
export function resolveGoalCentralMidfieldCombination(match, goal, options = {}) {
  const { onPitch, ambiguous, issues } = getPlayersOnPitchAtGoal(match, goal, options);
  const mw = match?.mw;
  const ambiguousMidfielders = ambiguous.filter(player => isCentralMidfieldPlayer(player, mw));
  if (ambiguousMidfielders.length > 0) {
    return {
      resolved: false,
      players: [],
      reason: `Central-midfield combination for this goal is ambiguous (${ambiguousMidfielders.join(', ')}) — not counted toward any combination.`,
      issues,
    };
  }
  const players = onPitch.filter(player => isCentralMidfieldPlayer(player, mw)).sort();
  if (players.length === 0) {
    return { resolved: true, players: [], reason: 'No recognized central-midfield player was on the pitch for this goal.', issues };
  }
  return { resolved: true, players, issues };
}

// ---------------------------------------------------------------------------
// A. MIDFIELD UNITS — minutes/matches/goals conceded for each distinct
// central-midfield combination on its own, independent of which defensive
// unit was also on the pitch.
// ---------------------------------------------------------------------------
export function getMidfieldUnitStats(matches = [], options = {}) {
  const table = new Map();
  const unresolvedGoals = [];

  (Array.isArray(matches) ? matches : []).forEach(match => {
    if (!match || typeof match !== 'object') return;

    getMatchMidfieldSpells(match, options).forEach(spell => {
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
        const resolution = resolveGoalCentralMidfieldCombination(match, goal, options);
        if (!resolution.resolved || resolution.players.length === 0) {
          unresolvedGoals.push({ mw: match.mw, goal, reason: resolution.reason || 'Goal could not be attributed to a central-midfield combination.' });
          return;
        }
        const key = combinationKey(resolution.players);
        const row = table.get(key);
        if (!row) {
          unresolvedGoals.push({
            mw: match.mw,
            goal,
            reason: `Goal's on-pitch central-midfield combination (${key}) does not match any computed minutes-together spell for this match.`,
          });
          return;
        }
        row.goalsConceded += 1;
      });
  });

  const units = [...table.values()]
    .map(row => {
      const matchCount = row.matchweeks.size;
      return {
        players: row.players,
        midfield: row.players.join(', '),
        minutes: row.minutes,
        matches: matchCount,
        goalsConceded: row.goalsConceded,
        gcPer90: row.minutes > 0 ? (row.goalsConceded / row.minutes) * 90 : null,
        smallSample: row.minutes < SAMPLE_MINUTES_FLOOR || matchCount < SAMPLE_MATCHES_FLOOR,
      };
    })
    .sort((a, b) => b.minutes - a.minutes || a.midfield.localeCompare(b.midfield));

  return { units, unresolvedGoals };
}

// ---------------------------------------------------------------------------
// B. MIDFIELD + DEFENCE — intersects the central-midfield spell partition
// with defensiveCombinations.js's own defensive spell partition for the same
// match. Both getMatchMidfieldSpells and getMatchDefensiveSpells always
// partition the full match duration (their boundary sets always include 0
// and the match duration), so merging two full partitions by their combined
// boundary points always yields another full partition — no gap, no overlap,
// no minute double-counted. A substitution affecting either unit starts a
// new merged segment; a substitution affecting neither does not.
// ---------------------------------------------------------------------------

function mergeSpellPartitions(spellsA, spellsB) {
  const boundaries = new Set();
  spellsA.forEach(spell => { boundaries.add(spell.start); boundaries.add(spell.end); });
  spellsB.forEach(spell => { boundaries.add(spell.start); boundaries.add(spell.end); });
  const sorted = [...boundaries].filter(Number.isFinite).sort((a, b) => a - b);

  const segments = [];
  for (let i = 0; i < sorted.length - 1; i++) {
    const start = sorted[i];
    const end = sorted[i + 1];
    if (!(end > start)) continue;
    const spellA = spellsA.find(spell => spell.start <= start && end <= spell.end);
    const spellB = spellsB.find(spell => spell.start <= start && end <= spell.end);
    segments.push({
      start,
      end,
      minutes: end - start,
      aPlayers: spellA ? spellA.players : [],
      bPlayers: spellB ? spellB.players : [],
    });
  }
  return segments;
}

// Exposed for tests: the merged defensive+midfield segments for one match,
// each carrying both units' exact on-pitch personnel for that segment.
export function getMatchMidfieldDefensiveSpells(match, options = {}) {
  if (!match || typeof match !== 'object') return [];
  return mergeSpellPartitions(getMatchDefensiveSpells(match, options), getMatchMidfieldSpells(match, options));
}

function pairKey(midfieldPlayers, defensivePlayers) {
  return `${combinationKey(midfieldPlayers)} || ${combinationKey(defensivePlayers)}`;
}

export function getMidfieldDefensiveCombinationStats(matches = [], options = {}) {
  const table = new Map();
  const unresolvedGoals = [];

  (Array.isArray(matches) ? matches : []).forEach(match => {
    if (!match || typeof match !== 'object') return;

    getMatchMidfieldDefensiveSpells(match, options).forEach(segment => {
      // A segment with no recognized player on one side has no combination
      // to report on that side — it is not guessed onto an empty label.
      if (segment.aPlayers.length === 0 || segment.bPlayers.length === 0) return;
      const key = pairKey(segment.bPlayers, segment.aPlayers);
      const row = table.get(key) || {
        midfieldPlayers: segment.bPlayers,
        defensivePlayers: segment.aPlayers,
        minutes: 0,
        matchweeks: new Set(),
        goalsConceded: 0,
      };
      row.minutes += segment.minutes;
      row.matchweeks.add(match.mw);
      table.set(key, row);
    });

    getGoalEvents(match)
      .filter(goal => goal && goal.team === 'opponent')
      .forEach(goal => {
        const defenceResolution = resolveGoalDefensiveCombination(match, goal, options);
        const midfieldResolution = resolveGoalCentralMidfieldCombination(match, goal, options);
        const defenceOk = defenceResolution.resolved && defenceResolution.players.length > 0;
        const midfieldOk = midfieldResolution.resolved && midfieldResolution.players.length > 0;

        if (!defenceOk || !midfieldOk) {
          const reasons = [];
          if (!defenceOk) reasons.push(defenceResolution.reason || 'Defensive combination for this goal is unresolved.');
          if (!midfieldOk) reasons.push(midfieldResolution.reason || 'Central-midfield combination for this goal is unresolved.');
          unresolvedGoals.push({ mw: match.mw, goal, reason: reasons.join(' ') });
          return;
        }

        const key = pairKey(midfieldResolution.players, defenceResolution.players);
        const row = table.get(key);
        if (!row) {
          unresolvedGoals.push({
            mw: match.mw,
            goal,
            reason: `Goal's on-pitch midfield+defence combination (${key}) does not match any computed shared spell for this match.`,
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
        midfieldPlayers: row.midfieldPlayers,
        midfield: row.midfieldPlayers.join(', '),
        defensivePlayers: row.defensivePlayers,
        defence: row.defensivePlayers.join(', '),
        minutes: row.minutes,
        matches: matchCount,
        goalsConceded: row.goalsConceded,
        gcPer90: row.minutes > 0 ? (row.goalsConceded / row.minutes) * 90 : null,
        smallSample: row.minutes < SAMPLE_MINUTES_FLOOR || matchCount < SAMPLE_MATCHES_FLOOR,
      };
    })
    .sort((a, b) => b.minutes - a.minutes || a.midfield.localeCompare(b.midfield) || a.defence.localeCompare(b.defence));

  return { combinations, unresolvedGoals };
}

// ---------------------------------------------------------------------------
// STATISTICAL GUARDRAIL (repeated here deliberately, not only in the
// checklist, so it travels with the module): every number above describes
// what happened while a central-midfield unit — alone, or paired with a
// defensive unit — shared the pitch. It does not isolate central midfield's
// contribution from defensive personnel, opponent strength, game state,
// score effects, tactical instructions, red cards or any other contextual
// factor. No "influence score" or composite rating is computed or implied.
// Every displayed rate carries its own minutes/matches sample size; nothing
// here should be read as "best", "worst", "strongest" or "weakest".
// ---------------------------------------------------------------------------
