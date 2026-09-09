const fs = require('fs');

const MATCH_WINDOW_MS = 14 * 24 * 60 * 60 * 1000;
const AFTER_KICKOFF_MS = 2 * 60 * 60 * 1000;

function fixtureSections(source) {
  const names = ['PRESEASON', 'PREMIER_LEAGUE', 'CUPS'];
  return names.flatMap(name => {
    const match = source.match(new RegExp(`export const ${name} = \\[([\\s\\S]*?)\\n\\];`));
    if (!match) return [];
    return [...match[1].matchAll(/\{([^{}]+)\}/g)].map(row => {
      const body = row[1];
      const value = key => (body.match(new RegExp(`${key}:\"([^\"]*)\"`)) || [])[1];
      const mw = Number((body.match(/mw:(\d+)/) || [])[1]) || null;
      return {
        section: name,
        mw,
        opponent: value('opponent'),
        date: value('date'),
        competition: value('comp') || (name === 'PREMIER_LEAGUE' ? 'Premier League' : name === 'PRESEASON' ? 'Friendly' : 'Cup'),
      };
    });
  });
}

function dueFixtures(source, state, now = new Date()) {
  const done = new Set(state.processed || []);
  const nowMs = now.getTime();
  return fixtureSections(source).filter(f => {
    const kickoff = ukLocalTimeMs(f.date);
    const key = fixtureKey(f);
    return Number.isFinite(kickoff) &&
      nowMs >= kickoff + AFTER_KICKOFF_MS &&
      nowMs - kickoff <= MATCH_WINDOW_MS &&
      !done.has(key);
  });
}

function ukLocalTimeMs(isoWithoutZone) {
  // Confirmed fixtures may carry an explicit UTC offset/Z so browsers,
  // GitHub Actions and Singapore viewers all count down to one instant.
  if (/[zZ]$|[+-]\d{2}:\d{2}$/.test(isoWithoutZone)) return Date.parse(isoWithoutZone);
  const match = isoWithoutZone.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/);
  if (!match) return NaN;
  const [, year, month, day, hour, minute, second] = match.map(Number);
  const provisional = Date.UTC(year, month - 1, day, hour, minute, second);
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London', year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
  }).formatToParts(new Date(provisional));
  const p = Object.fromEntries(parts.map(x => [x.type, x.value]));
  const represented = Date.UTC(Number(p.year), Number(p.month) - 1, Number(p.day), Number(p.hour), Number(p.minute), Number(p.second));
  return provisional - (represented - provisional);
}

function fixtureKey(fixture) {
  return `${fixture.date}|${fixture.opponent}|${fixture.competition}`;
}

function replaceExportedArray(source, name, rows) {
  const replacement = `export const ${name} = [\n${rows.join('\n')}\n];`;
  const re = new RegExp(`export const ${name} = \\[([\\s\\S]*?)\\s*\\];`);
  if (!re.test(source)) throw new Error(`Missing exported array: ${name}`);
  return source.replace(re, replacement);
}

function js(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

function applyFixtureScore(source, fixture, result) {
  const escapedOpponent = fixture.opponent.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const escapedDate = fixture.date.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`(\\{[^{}]*opponent:\"${escapedOpponent}\"[^{}]*date:\"${escapedDate}\"[^{}]*score:)(?:null|\"[^\"]*\")`);
  if (!re.test(source)) throw new Error(`Fixture row not found: ${fixture.opponent} ${fixture.date}`);
  return source.replace(re, `$1${js(`${result.spurs}-${result.opponent}`)}`);
}

function renderStandings(rows) {
  return rows.map((r, index) =>
    `  {pos:${index + 1},team:${js(r.team)},w:${r.w},d:${r.d},l:${r.l},gf:${r.gf},ga:${r.ga},gd:${r.gd},pts:${r.pts}${r.team === 'Tottenham Hotspur' ? ',isSpurs:true' : ''}},`
  );
}

function renderLastFive(rows) {
  return rows.slice(0, 5).map(r =>
    `  {date:${js(r.date)},home:${js(r.home)},away:${js(r.away)},score:${js(r.score)},r:${js(r.r)},scorer:${js(r.scorer || '')}},`
  );
}

function renderScorers(rows) {
  return rows.filter(r => r.g > 0 || r.a > 0).sort((a, b) => (b.g - a.g) || (b.a - a.a) || a.name.localeCompare(b.name)).map(r =>
    `  {name:${js(r.name)},g:${r.g},a:${r.a},apps:${r.apps}},`
  );
}

function updateSquad(source, players) {
  let next = source;
  for (const p of players) {
    const last = p.name.trim().split(/\s+/).pop().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`(\\{name:\"[^\"]*${last}[^\"]*\"[^{}]*?apps:)(\\d+)(,\\s*g:)(\\d+)`, 'i');
    const match = next.match(re);
    if (!match) continue;
    next = next.replace(re, (_, a, apps, g, goals) => `${a}${Number(apps) + Number(p.appearance || 0)}${g}${Number(goals) + Number(p.goals || 0)}`);
  }
  return next;
}

function readState(path) {
  if (!fs.existsSync(path)) return { processed: [] };
  return JSON.parse(fs.readFileSync(path, 'utf8'));
}

module.exports = {
  AFTER_KICKOFF_MS,
  applyFixtureScore,
  dueFixtures,
  fixtureKey,
  readState,
  renderLastFive,
  renderScorers,
  renderStandings,
  replaceExportedArray,
  ukLocalTimeMs,
  updateSquad,
};
