#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { renderStandings, replaceExportedArray } = require('./matchday-core');

const ROOT = path.join(__dirname, '..');
const STANDINGS_PATH = path.join(ROOT, 'src/data/standings.js');
const ESPN_STANDINGS_URL = 'https://site.api.espn.com/apis/v2/sports/soccer/eng.1/standings?season=2026';

function stat(entry, name) {
  const value = entry.stats?.find(item => item.name === name)?.value;
  return Number.isFinite(value) ? Math.trunc(value) : null;
}

function parseStandings(payload) {
  const entries = payload.children?.flatMap(child => child.standings?.entries || []) || [];
  return entries.map(entry => ({
    team: entry.team?.displayName,
    rank: stat(entry, 'rank'),
    w: stat(entry, 'wins'),
    d: stat(entry, 'ties'),
    l: stat(entry, 'losses'),
    gf: stat(entry, 'pointsFor'),
    ga: stat(entry, 'pointsAgainst'),
    gd: stat(entry, 'pointDifferential'),
    pts: stat(entry, 'points'),
  })).sort((a, b) => a.rank - b.rank);
}

function expectedTeams(source) {
  const block = source.match(/export const STANDINGS = \[([\s\S]*?)\s*\];/)?.[1] || '';
  return [...block.matchAll(/team:"([^"]+)"/g)].map(match => match[1]).sort();
}

function validateStandings(rows, source) {
  if (rows.length !== 20) throw new Error(`Expected 20 clubs, received ${rows.length}`);
  const teams = rows.map(row => row.team).sort();
  if (new Set(teams).size !== 20) throw new Error('Standings contain duplicate clubs');
  if (JSON.stringify(teams) !== JSON.stringify(expectedTeams(source))) {
    throw new Error('Provider club list does not match the dashboard season');
  }
  for (const row of rows) {
    for (const key of ['rank', 'w', 'd', 'l', 'gf', 'ga', 'gd', 'pts']) {
      if (!Number.isInteger(row[key])) throw new Error(`Invalid ${key} for ${row.team}`);
    }
    if (row.w < 0 || row.d < 0 || row.l < 0 || row.gf < 0 || row.ga < 0 || row.pts < 0) {
      throw new Error(`Negative table value for ${row.team}`);
    }
    if (row.pts !== row.w * 3 + row.d) throw new Error(`Points mismatch for ${row.team}`);
    if (row.gd !== row.gf - row.ga) throw new Error(`Goal difference mismatch for ${row.team}`);
  }
}

async function updateLeagueTable({ fetchImpl = fetch, sourcePath = STANDINGS_PATH } = {}) {
  const response = await fetchImpl(ESPN_STANDINGS_URL, { signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`Standings provider returned ${response.status}`);
  const source = fs.readFileSync(sourcePath, 'utf8');
  const rows = parseStandings(await response.json());
  validateStandings(rows, source);
  const next = replaceExportedArray(source, 'STANDINGS', renderStandings(rows));
  if (next === source) return false;
  fs.writeFileSync(sourcePath, next);
  return true;
}

if (require.main === module) {
  updateLeagueTable()
    .then(changed => console.log(changed ? 'League table updated from all completed matches.' : 'League table already current.'))
    .catch(error => { console.error(error.message); process.exit(1); });
}

module.exports = { parseStandings, updateLeagueTable, validateStandings };
