#!/usr/bin/env node
/**
 * THFC Dashboard — Daily Automated Update
 * Runs via macOS launchd at 7:00 AM daily.
 *
 * What it does:
 *   1. Fetches all RSS_SOURCES server-side (no CORS issues here, unlike the browser),
 *      including r/coys (Reddit) as a community/corroboration-only source
 *   1b. ALSO fetches direct Twitter/X posts via Agent Reach (see TWITTER_NEWSWORTHY /
 *      TWITTER_ANONYMOUS below) — this is the "Spurs Twitter Pulse" integration,
 *      distinct from RSS since it reads X directly rather than secondhand via news
 *      sites. Gracefully skipped (RSS-only) if Agent Reach isn't installed/configured yet.
 *   2. Sends fresh headlines + current dashboard data to Claude
 *   3. Claude returns confirmed transfer/injury changes (conservative) PLUS
 *      1-2 short anonymous "Daily Whispers" blurbs from the more ambiguous/rumour headlines
 *   4. Applies changes to src/data/transfers.js and src/data/squad.js
 *   5. ALWAYS refreshes the News tab's fallback headlines in src/data/news.js with
 *      today's real headlines — this is what the browser shows if live RSS fetch
 *      fails, so it's never more than a day stale even in the worst case
 *   6. Rebuilds the tracked docs/ deployment output automatically
 *   7. Writes a plain-English changelog to automation/update-log.txt
 *
 * What it does NOT do:
 *   - Auto-upload anything to GitHub — you stay in control of what goes live
 *   - Overwrite "confirmed" facts without strong new evidence
 *   - Add duplicate entries for a player already marked CONFIRMED/DEPARTED
 *   - Ever name/attribute a TWITTER_ANONYMOUS account in any output
 *
 * Run manually to test:  node automation/update-dashboard.js
 * Scheduled automatically by: com.thfc.dailyupdate.plist (see SETUP.md)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ── Load API key from local .env (never committed, never shared) ───────────
const ENV_PATH = path.join(__dirname, '.env');
if (!fs.existsSync(ENV_PATH)) {
  console.error('Missing automation/.env — copy .env.example to .env and add your API key.');
  process.exit(1);
}
const envText = fs.readFileSync(ENV_PATH, 'utf8');
const apiKeyMatch = envText.match(/ANTHROPIC_API_KEY=(.+)/);
const API_KEY = apiKeyMatch ? apiKeyMatch[1].trim() : null;
if (!API_KEY || API_KEY.startsWith('sk-ant-YOUR')) {
  console.error('ANTHROPIC_API_KEY not set in automation/.env');
  process.exit(1);
}

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const LOG_PATH = path.join(__dirname, 'update-log.txt');

// ── RSS sources — same list used by the live News tab ───────────────────────
// r/coys is a COMMUNITY source: it mostly reposts/quotes the journalists above,
// so analyzeWithClaude() treats it as a corroborating signal only — see the
// prompt instructions below. It should never single-handedly move a transfer
// brief to "confirmed" or push likelihood past a moderate ceiling.
const RSS_SOURCES = [
  { name: 'Sky Sports Spurs', url: 'https://www.skysports.com/rss/12040' },
  { name: 'BBC Sport Spurs',  url: 'https://feeds.bbci.co.uk/sport/football/teams/tottenham-hotspur/rss.xml' },
  { name: 'TEAMtalk',         url: 'https://www.teamtalk.com/feed' },
  { name: 'SpursWeb',         url: 'https://www.spurs-web.com/feed' },
  { name: 'football.london',  url: 'https://www.football.london/tottenham-hotspur-fc/?service=rss' },
  { name: 'Google News',      url: 'https://news.google.com/rss/search?q=Tottenham+Hotspur&hl=en-GB&gl=GB&ceid=GB:en' },
  { name: 'r/coys (Reddit)',  url: 'https://www.reddit.com/r/coys/new.rss', isCommunity: true },
];

// ── Spurs Twitter Pulse — direct X/Twitter reads via Agent Reach ────────────
// (https://github.com/Panniantong/Agent-Reach). Two groups, per the
// spurs-twitter-pulse skill spec — see claude/twitter-pulse-and-dashboard-context.md
// in the project. NEWSWORTHY accounts are attributed by name, same as any RSS
// source. ANONYMOUS accounts are NEVER named in output — their content only
// ever surfaces consolidated into Daily Whispers, and is capped at 45%
// likelihood on its own (same treatment as r/coys reposts above), reusing the
// existing "COMMUNITY REPOST" cap logic in analyzeWithClaude()'s prompt.
const TWITTER_NEWSWORTHY = [
  { name: 'Fabrizio Romano', handle: 'FabrizioRomano' },
  { name: 'David Ornstein',  handle: 'David_Ornstein' },
  { name: 'Alasdair Gold',   handle: 'AlasdairGold' },
  { name: 'Ben Jacobs',      handle: 'JacobsBen' },
];

const TWITTER_ANONYMOUS = [
  'pokeefe1', 'SzymonStefanik', 'szyexcl', 'RudolphN17', 'SB8308715342770',
  'HimothyReports', 'SecretPrem', 'Ekremkonur', 'thfcprof_intel', 'Kish_P14',
];

// NOTE: Agent Reach's exact CLI invocation hasn't been verified against a
// live install yet — the command below (`agent-reach twitter read <handle>
// --since 48h --json`) is a best guess based on its README and WILL need
// adjusting once Agent Reach is actually installed and `agent-reach --help`
// / `agent-reach twitter --help` can be checked. This function fails soft:
// if the CLI is missing or the command shape is wrong, it logs a warning and
// returns an empty array so the rest of the pipeline (RSS) still runs fine.
function isAgentReachAvailable() {
  try {
    execSync('agent-reach --version', { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

function fetchTwitterAccount(handle) {
  try {
    const out = execSync(`agent-reach twitter read ${handle} --since 48h --json`, {
      stdio: ['ignore', 'pipe', 'pipe'],
      timeout: 20000,
    }).toString('utf8');
    const parsed = JSON.parse(out);
    // Expect an array of { text, url, createdAt } — adjust mapping once the
    // real Agent Reach JSON shape is confirmed.
    return (Array.isArray(parsed) ? parsed : parsed.items || []).map(t => ({
      title: t.text || t.title || '',
      link: t.url || t.link || '',
      pubDate: t.createdAt || t.pubDate || '',
    }));
  } catch (e) {
    console.log(`    ✗ @${handle}: ${e.message.split('\n')[0]}`);
    return [];
  }
}

function fetchTwitterPulse() {
  if (!isAgentReachAvailable()) {
    console.log('Agent Reach not installed/configured — skipping Twitter Pulse (RSS-only run).');
    return [];
  }

  console.log(`Fetching Twitter Pulse: ${TWITTER_NEWSWORTHY.length} newsworthy + ${TWITTER_ANONYMOUS.length} anonymous accounts...`);
  const headlines = [];

  for (const acct of TWITTER_NEWSWORTHY) {
    const posts = fetchTwitterAccount(acct.handle);
    console.log(`  ✓ ${acct.name} (@${acct.handle}): ${posts.length} posts`);
    for (const p of posts) {
      headlines.push({ title: p.title, link: p.link, pubDate: p.pubDate, source: acct.name, isCommunity: false });
    }
  }

  for (const handle of TWITTER_ANONYMOUS) {
    const posts = fetchTwitterAccount(handle);
    if (posts.length) console.log(`  ✓ anonymous account: ${posts.length} posts`);
    for (const p of posts) {
      // source is intentionally generic — NEVER the real handle — since this
      // string can end up in logs/prompts and must never identify the account.
      headlines.push({ title: p.title, link: p.link, pubDate: p.pubDate, source: 'Twitter (anonymous)', isCommunity: true });
    }
  }

  return headlines.filter(h => isSpursRelevant(h.title));
}

// ── Spurs-relevance filter ───────────────────────────────────────────────
// Mirrors src/lib/shared.js#isSpursRelevant (duplicated here since this is a
// standalone Node script, not part of the esbuild bundle). Some "team-scoped"
// feeds — notably Sky Sports' /rss/12040 — leak general Sky Sports content
// (Wimbledon, rugby, F1, golf, NFL) during quiet news periods. Filtering here
// keeps that noise out of both the News tab fallback AND the headlines sent
// to Claude for reconciliation (cleaner signal, fewer tokens wasted).
function isSpursRelevant(title) {
  if (!title) return false;
  const t = title.toLowerCase();
  return t.includes('tottenham') || t.includes('spurs') || t.includes('hotspur') || t.includes('thfc');
}

// ── Simple regex-based RSS parser (no external deps, Node has no DOMParser) ─
function parseRSS(xml, sourceName, isCommunity) {
  const items = [];
  const itemBlocks = xml.split('<item>').slice(1);
  for (const block of itemBlocks.slice(0, 12)) {
    const title = (block.match(/<title>([\s\S]*?)<\/title>/) || [,''])[1]
      .replace(/<!\[CDATA\[|\]\]>/g, '').trim();
    const link = (block.match(/<link>([\s\S]*?)<\/link>/) || [,''])[1].trim();
    const pubDate = (block.match(/<pubDate>([\s\S]*?)<\/pubDate>/) || [,''])[1].trim();
    if (title) items.push({ title, link, pubDate, source: sourceName, isCommunity: !!isCommunity });
  }
  return items;
}

async function fetchAllFeeds() {
  console.log(`Fetching ${RSS_SOURCES.length} RSS sources...`);
  const results = await Promise.all(
    RSS_SOURCES.map(async src => {
      try {
        const res = await fetch(src.url, { signal: AbortSignal.timeout(10000) });
        const text = await res.text();
        const items = parseRSS(text, src.name, src.isCommunity);
        console.log(`  ✓ ${src.name}: ${items.length} items`);
        return items;
      } catch (e) {
        console.log(`  ✗ ${src.name}: failed (${e.message})`);
        return [];
      }
    })
  );
  const all = results.flat();
  const relevant = all.filter(h => isSpursRelevant(h.title));
  const dropped = all.length - relevant.length;
  if (dropped > 0) console.log(`  ℹ Filtered out ${dropped} off-topic item(s) from loosely-scoped feeds`);

  // Merge in Twitter Pulse (direct X reads) alongside the RSS set — same
  // headline shape, so the rest of the pipeline (analyzeWithClaude, news
  // fallback, fixture scores) treats them identically.
  const twitterHeadlines = fetchTwitterPulse();
  return relevant.concat(twitterHeadlines);
}

// ── Read current data files as context for Claude ───────────────────────────
function readFile(relPath) {
  return fs.readFileSync(path.join(SRC, relPath), 'utf8');
}

// ── Ask Claude to compare fresh news against current dashboard data ─────────
async function analyzeWithClaude(headlines, currentTransfers, currentSquad) {
  const headlinesText = headlines
    .slice(0, 60)
    .map(h => `[${h.source}${h.isCommunity ? ' — COMMUNITY/ANONYMOUS REPOST' : ''}] ${h.title}`)
    .join('\n');

  const prompt = `You are updating a Tottenham Hotspur fan dashboard. Below is today's fresh news headlines, followed by the CURRENT data files for transfers and squad/injuries.

Your job: identify ONLY genuinely new, verifiable changes. Be conservative — if a headline is ambiguous or you're not confident, DO NOT include it as a confirmed change. You can mark something as "confirmed" based on just ONE OR TWO credible sources (e.g. a named journalist like Romano/Ornstein/Gold/Jacobs, BBC, Sky Sports, or official club language like "official", "confirmed", "signs", "here we go") — you do NOT need many outlets all repeating the same story to reach confirmed. Additional sources beyond that are a bonus double-check, not a requirement. Rumours stay rumours with a likelihood percentage reflecting the latest reporting tone (e.g. "personal terms agreed" should read higher than "linked with").

IMPORTANT — headlines tagged "COMMUNITY/ANONYMOUS REPOST" come from two lower-trust sources treated identically: r/coys (Reddit, mostly reposts/quotes the named journalists elsewhere in this list) AND a set of anonymous Twitter/X insider accounts (source shown generically as "Twitter (anonymous)" — never a real handle, and must NEVER be named or quoted directly in your output). Treat ALL of these as a CORROBORATING signal only, never a primary source:
  - A community/anonymous repost that matches a primary-source headline on the same topic can nudge likelihood up slightly (independent corroboration on the same day).
  - A community/anonymous repost with NO matching primary-source headline must NOT move a player above 45% likelihood on its own, and must NEVER be used to mark a signing/departure as confirmed.
  - If a community/anonymous repost surfaces something no primary source has covered, prefer routing it into newWhispers (speculative, unverified tone) rather than a transferBriefsUpdates entry — and NEVER attribute the whisper to any specific account, named or anonymous.

Headlines WITHOUT that tag (including from the named Twitter accounts — Fabrizio Romano, David Ornstein, Alasdair Gold, Ben Jacobs — same as any RSS journalist) are primary sources and can be treated with full confidence, same as BBC/Sky/etc.

The likelihood percentages you assign are an editorial estimate reflecting reporting tone and source count — not a formal probability or betting odds. This is surfaced to the user with a disclaimer in the UI, so lean toward your honest best judgment rather than hedging everything toward 50%.

Separately, write 1-2 short "Daily Whispers" — anonymous, unverified insider-style intel blurbs (2-3 sentences each), based on the more ambiguous or speculative headlines that aren't solid enough to be a transfer brief. Match this existing tone/style exactly (no player likelihood percentages, just atmosphere and dressing-room chatter):
"Word from N17 is that Tonali has been told by his own representatives to be patient — Spurs are not walking away."
Only write a whisper if there's genuinely something speculative in today's headlines worth surfacing this way — if nothing fits, return an empty array rather than inventing filler.

TODAY'S HEADLINES:
${headlinesText}

CURRENT transfers.js:
${currentTransfers}

CURRENT squad.js (includes INJURIES):
${currentSquad}

Respond with ONLY valid JSON in this exact shape, no markdown fences, no commentary:
{
  "hasChanges": true or false,
  "summary": "one or two sentence plain-English summary of what changed, for a human to quickly read",
  "transferBriefsUpdates": [ { "player": "...", "likelihood": 0-100, "status": "hot|warm|cold", "reason": "short reason citing which headline" } ],
  "newConfirmedSignings": [ { "player": "...", "from": "...", "fee": "...", "note": "..." } ],
  "newDepartures": [ { "player": "...", "note": "..." } ],
  "injuryUpdates": [ { "player": "...", "issue": "...", "returnDate": "...", "severity": "long|medium" } ],
  "newWhispers": [ { "text": "..." } ],
  "flaggedForHumanReview": [ "any headline that seems important but you're not confident enough to auto-apply — describe it here so the user can check manually" ]
}

If nothing meaningfully changed, return hasChanges: false and empty arrays (newWhispers can still contain entries even if hasChanges is false).`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096, // bumped from 2000 (2026-08-10) — busy news days (41+ headlines)
                         // were truncating the JSON response mid-string, causing
                         // "Unterminated string in JSON" and a full run failure
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    throw new Error(`Claude API error: ${res.status} ${await res.text()}`);
  }
  const data = await res.json();
  const text = data.content.map(b => b.text || '').join('');
  const cleaned = text.replace(/```json|```/g, '').trim();
  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (parseErr) {
    console.error('\n❌ JSON parse failed. Raw Claude response (last 500 chars):');
    console.error(cleaned.slice(-500));
    throw parseErr;
  }

  // Defensive defaults — never let a missing field crash downstream logic
  return {
    hasChanges: !!parsed.hasChanges,
    summary: parsed.summary || '',
    transferBriefsUpdates: parsed.transferBriefsUpdates || [],
    newConfirmedSignings: parsed.newConfirmedSignings || [],
    newDepartures: parsed.newDepartures || [],
    injuryUpdates: parsed.injuryUpdates || [],
    newWhispers: parsed.newWhispers || [],
    flaggedForHumanReview: parsed.flaggedForHumanReview || [],
  };
}

// ── Apply changes into the source files using safe marker-based injection ───
// Extracts the array body text for a given exported const, e.g. "CONFIRMED"
function extractArrayBlock(content, arrayName) {
  const re = new RegExp(`export const ${arrayName} = \\[([\\s\\S]*?)\\n\\];`, 'm');
  const m = content.match(re);
  return m ? m[1] : '';
}

// True if a player already has an entry inside the named array block
function playerExistsIn(content, arrayName, player) {
  const block = extractArrayBlock(content, arrayName);
  const escaped = player.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`player:"${escaped}"`).test(block);
}

// Removes any TRANSFER_BRIEFS object for a given player (used once they're confirmed)
function removeFromBriefs(content, player) {
  const escaped = player.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Matches a single { ... } object within TRANSFER_BRIEFS containing this player
  const re = new RegExp(`\\s*\\{[^{}]*?player:"${escaped}"[^{}]*?\\},?`, 's');
  return content.replace(re, '');
}

function applyTransferUpdates(analysis) {
  if (analysis.newConfirmedSignings.length === 0 &&
      analysis.newDepartures.length === 0 &&
      analysis.transferBriefsUpdates.length === 0) return false;

  let content = readFile('data/transfers.js');
  let changed = false;

  // Update likelihood/status on existing briefs by player name match
  for (const upd of analysis.transferBriefsUpdates) {
    const re = new RegExp(
      `(player:"${upd.player.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^}]*?like:)\\d+(,\\s*st:")\\w+(")`,
      's'
    );
    if (re.test(content)) {
      content = content.replace(re, `$1${upd.likelihood}$2${upd.status}$3`);
      changed = true;
    }
  }

  // Prepend new confirmed signings — but ONLY if this player isn't already
  // in CONFIRMED (prevents the daily-duplicate bug where the same signing
  // gets re-added every day the news mentions it again).
  if (analysis.newConfirmedSignings.length > 0) {
    const toAdd = analysis.newConfirmedSignings.filter(
      s => !playerExistsIn(content, 'CONFIRMED', s.player)
    );
    if (toAdd.length > 0) {
      const newEntries = toAdd.map(s =>
        `  {\n    player:"${s.player}", e:"🏳️", from:"${s.from}", fee:"${s.fee}", role:"TBC", date:"${new Date().toISOString().slice(0,10)}",\n    note:"${s.note} — auto-added, verify flag/role manually"\n  },`
      ).join('\n');
      content = content.replace(
        'export const CONFIRMED = [',
        `export const CONFIRMED = [\n${newEntries}`
      );
      // Clean up: remove these players from TRANSFER_BRIEFS now that they're confirmed
      for (const s of toAdd) {
        content = removeFromBriefs(content, s.player);
      }
      changed = true;
    }
  }

  // Append new departures — same dedupe guard as CONFIRMED above
  if (analysis.newDepartures.length > 0) {
    const toAdd = analysis.newDepartures.filter(
      d => !playerExistsIn(content, 'DEPARTURES', d.player)
    );
    if (toAdd.length > 0) {
      const newEntries = toAdd.map(d =>
        `  {player:"${d.player}", note:"${d.note}"},`
      ).join('\n');
      content = content.replace(
        'export const DEPARTURES = [',
        `export const DEPARTURES = [\n${newEntries}`
      );
      changed = true;
    }
  }

  if (changed) fs.writeFileSync(path.join(SRC, 'data/transfers.js'), content);
  return changed;
}

function applyInjuryUpdates(analysis) {
  if (analysis.injuryUpdates.length === 0) return false;

  let content = readFile('data/squad.js');
  for (const upd of analysis.injuryUpdates) {
    const re = new RegExp(
      `(name:"${upd.player.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^}]*?issue:")[^"]*("[^}]*?ret:")[^"]*(")`,
      's'
    );
    if (re.test(content)) {
      content = content.replace(re, `$1${upd.issue}$2${upd.returnDate}$3`);
    }
  }
  fs.writeFileSync(path.join(SRC, 'data/squad.js'), content);
  return true;
}

// ── Daily Whispers — prepend new ones, keep only the most recent 6 ─────────
function applyWhisperUpdates(analysis) {
  if (!analysis.newWhispers || analysis.newWhispers.length === 0) return false;

  let content = readFile('data/transfers.js');
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

  const newEntries = analysis.newWhispers.map(w =>
    `  {\n    date:"${today}",\n    text:"${w.text.replace(/"/g, '\\"')}"\n  },`
  ).join('\n');

  content = content.replace(
    'export const ANON_BRIEFS = [',
    `export const ANON_BRIEFS = [\n${newEntries}`
  );

  // Trim to the most recent 6 whispers so this array doesn't grow forever
  const re = /export const ANON_BRIEFS = \[([\s\S]*?)\n\];/;
  const m = content.match(re);
  if (m) {
    const objs = m[1].match(/\{[^{}]*\}/gs) || [];
    if (objs.length > 6) {
      const trimmed = objs.slice(0, 6).join(',\n  ');
      content = content.replace(re, `export const ANON_BRIEFS = [\n  ${trimmed},\n];`);
    }
  }

  fs.writeFileSync(path.join(SRC, 'data/transfers.js'), content);
  return true;
}

// ── News fallback — ALWAYS refreshed daily with real headlines fetched ─────
// server-side (no CORS issues here). This is what the browser shows if the
// live in-browser RSS fetch fails, so the worst case is "this morning's
// headlines" instead of weeks-old hardcoded content.
function parseNewsTag(title) {
  const t = title.toLowerCase();
  if (t.includes('sign') || t.includes('official') || t.includes('done deal') || t.includes('confirmed')) return 'Official';
  if (t.includes('transfer') || t.includes('target') || t.includes('bid') || t.includes('link') || t.includes('deal') || t.includes('fee') || t.includes('million') || t.includes('contract')) return 'Transfer';
  if (t.includes('fixture') || t.includes('kick-off') || t.includes('match')) return 'Fixtures';
  if (t.includes('injury') || t.includes('injured') || t.includes('return')) return 'Injury';
  if (t.includes('says') || t.includes('interview') || t.includes("'") || t.includes('"')) return 'Interview';
  return 'Club';
}

function updateNewsFallback(headlines) {
  const withTs = headlines
    .filter(h => h.title && h.title.length > 10)
    .map(h => {
      const d = h.pubDate ? new Date(h.pubDate) : new Date();
      return { ...h, ts: isNaN(d.getTime()) ? Date.now() : d.getTime(), dateObj: isNaN(d.getTime()) ? new Date() : d };
    });

  const seen = new Set();
  const deduped = withTs
    .sort((a, b) => b.ts - a.ts)
    .filter(h => {
      const key = h.title.slice(0, 40).toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 14);

  if (deduped.length === 0) return false;

  const entries = deduped.map(h => {
    const title = h.title.replace(/"/g, '\\"');
    const dateStr = h.dateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const tag = parseNewsTag(h.title);
    const url = (h.link || '#').replace(/"/g, '\\"');
    return `  {title:"${title}", source:"${h.source}", date:"${dateStr}", tag:"${tag}", url:"${url}"},`;
  }).join('\n');

  let content = readFile('data/news.js');
  const re = /export const NEWS = \[[\s\S]*?\n\];/;
  if (!re.test(content)) {
    console.log('  ⚠ Could not find NEWS array in news.js — skipping news refresh');
    return false;
  }
  content = content.replace(re, `export const NEWS = [\n${entries}\n];`);
  fs.writeFileSync(path.join(SRC, 'data/news.js'), content);
  return true;
}

// ── Fixture scores ───────────────────────────────────────────────────────
// Detects confirmed full-time results from RSS headlines and fills the
// `score` field in fixtures.js automatically, matched by opponent name.
// Deliberately conservative: only fires on an explicit full-time signal
// ("FT", "full-time") plus a clear scoreline pattern, so a preview or
// prediction headline can't accidentally write a fake result.
// CAVEAT: if Spurs face the same opponent twice before either leg has been
// played, this fills the earlier (chronologically first) unplayed entry —
// worth a glance at update-log.txt in weeks with a repeat fixture.
const FT_PATTERNS = [
  /\b(?:ft|full[- ]time)\b[:\s]+tottenham\s+(\d+)\s*[-–]\s*(\d+)\s+([a-z .&']+)/i,
  /\b(?:ft|full[- ]time)\b[:\s]+([a-z .&']+?)\s+(\d+)\s*[-–]\s*(\d+)\s+tottenham/i,
];

function findScoreInHeadline(title) {
  let m = title.match(FT_PATTERNS[0]);
  if (m) return { spurs: parseInt(m[1], 10), opp: parseInt(m[2], 10), oppName: m[3].trim() };
  m = title.match(FT_PATTERNS[1]);
  if (m) return { spurs: parseInt(m[3], 10), opp: parseInt(m[2], 10), oppName: m[1].trim() };
  return null;
}

function applyFixtureScores(headlines) {
  let content = readFile('data/fixtures.js');
  let changed = false;
  for (const h of headlines) {
    if (!h.title) continue;
    const found = findScoreInHeadline(h.title);
    if (!found) continue;
    // Match on the opponent's first significant word (handles "Manchester
    // United" vs "Man Utd" style variance in headlines reasonably well).
    const firstWord = found.oppName.split(/\s+/)[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`(opponent:"[^"]*${firstWord}[^"]*"[^}]*?score:)null`, 's');
    if (re.test(content)) {
      content = content.replace(re, `$1"${found.spurs}-${found.opp}"`);
      changed = true;
      console.log(`  ⚽ Score filled: vs ${found.oppName} — Tottenham ${found.spurs}-${found.opp}`);
    }
  }
  if (changed) fs.writeFileSync(path.join(SRC, 'data/fixtures.js'), content);
  return changed;
}

// ── Squad sync ───────────────────────────────────────────────────────────
// This is the gap that let Tonali go missing: applyTransferUpdates() only
// ever touched data/transfers.js. A confirmed signing or departure never
// automatically became a squad.js change, so SQUAD could silently drift out
// of sync with CONFIRMED/DEPARTURES. This closes that gap — every call to
// applyTransferUpdates() should now be paired with this.
//
// New signings: added as a new SQUAD entry, always flagged "auto-added,
// verify" since position/number/contract need a human check the first day.
// Departures: removed from SQUAD entirely, since DEPARTURES already only
// tracks confirmed permanent exits (see applyTransferUpdates above).
function squadHasPlayer(content, fullName) {
  const lastName = fullName.trim().split(/\s+/).pop();
  const escaped = lastName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`name:"[^"]*${escaped}[^"]*"`, 'i').test(content);
}

function syncSquadWithTransfers(analysis) {
  const signings = analysis.newConfirmedSignings || [];
  const departures = analysis.newDepartures || [];
  if (signings.length === 0 && departures.length === 0) return false;

  let content = readFile('data/squad.js');
  let changed = false;

  const toAdd = signings.filter(s => !squadHasPlayer(content, s.player));
  if (toAdd.length > 0) {
    const newEntries = toAdd.map(s => {
      // "Sandro Tonali" -> "S. Tonali", matching the existing naming convention
      const parts = s.player.trim().split(/\s+/);
      const short = parts.length === 1 ? parts[0] : `${parts[0][0]}. ${parts.slice(1).join(' ')}`;
      return `  {name:"${short}", pos:"TBC", e:"🏳️", apps:0, g:0, con:"TBC", wc:null, st:"NEW — auto-added, verify pos/contract manually", sc:"cyan"},`;
    }).join('\n');
    content = content.replace(
      /export const SQUAD = \[/,
      `export const SQUAD = [\n${newEntries}`
    );
    changed = true;
    toAdd.forEach(s => console.log(`  👕 Squad: added ${s.player} (verify position manually)`));
  }

  for (const d of departures) {
    const lastName = d.player.trim().split(/\s+/).pop().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`\\s*\\{name:"[^"]*${lastName}[^"]*"[^}]*\\},?`, 'i');
    if (re.test(content)) {
      content = content.replace(re, '');
      changed = true;
      console.log(`  👕 Squad: removed ${d.player} (confirmed departure)`);
    }
  }

  if (changed) fs.writeFileSync(path.join(SRC, 'data/squad.js'), content);
  return changed;
}

// ── Main ──────────────────────────────────────────────────────────────────
(async () => {
  const timestamp = new Date().toLocaleString('en-GB');
  console.log(`\n=== THFC Dashboard Auto-Update — ${timestamp} ===\n`);

  try {
    const headlines = await fetchAllFeeds();
    console.log(`\nTotal headlines gathered: ${headlines.length}`);

    if (headlines.length === 0) {
      fs.writeFileSync(LOG_PATH, `${timestamp}\nAll RSS feeds failed. No update performed.\n`);
      console.log('No headlines fetched — aborting update.');
      return;
    }

    console.log('Asking Claude to analyze changes...');
    const analysis = await analyzeWithClaude(
      headlines,
      readFile('data/transfers.js'),
      readFile('data/squad.js')
    );

    let changed = false;
    if (analysis.hasChanges) {
      changed = applyTransferUpdates(analysis) || changed;
    changed = syncSquadWithTransfers(analysis) || changed;
      changed = applyInjuryUpdates(analysis) || changed;
    }
    changed = applyWhisperUpdates(analysis) || changed;
    changed = applyFixtureScores(headlines) || changed;
    // News fallback refreshes daily regardless of hasChanges — this is the
    // safety net the browser falls back to if live RSS fetch fails.
    changed = updateNewsFallback(headlines) || changed;

    // Write changelog
    const logLines = [
      `${timestamp}`,
      `Headlines checked: ${headlines.length} across ${RSS_SOURCES.length} RSS sources + Twitter Pulse`,
      `Changes applied: ${changed ? 'YES' : 'NO'}`,
      '',
      `Summary: ${analysis.summary || 'No significant changes detected.'}`,
      '',
    ];
    if (analysis.newWhispers && analysis.newWhispers.length > 0) {
      logLines.push(`🗣 Daily Whispers added: ${analysis.newWhispers.length}`);
      logLines.push('');
    }
    if (analysis.flaggedForHumanReview && analysis.flaggedForHumanReview.length > 0) {
      logLines.push('⚠ FLAGGED FOR YOUR REVIEW (not auto-applied):');
      analysis.flaggedForHumanReview.forEach(f => logLines.push(`  - ${f}`));
      logLines.push('');
    }
    fs.writeFileSync(LOG_PATH, logLines.join('\n'));
    console.log('\n' + logLines.join('\n'));

    if (changed) {
      console.log('Rebuilding docs/ deployment output...');
      // Use the same node binary running this script (process.execPath)
      // instead of relying on `node` being in PATH — launchd gives child
      // shells a minimal PATH that doesn't include /usr/local/bin, which is
      // why "node: command not found" was failing every run previously.
      execSync(`"${process.execPath}" build.js`, { cwd: ROOT, stdio: 'inherit' });
      console.log('\n✅ Dashboard updated — docs/ deployment output rebuilt automatically. Review automation/update-log.txt, then commit the tracked docs/ files to GitHub.');
    } else {
      console.log('\n✅ No changes needed today. Dashboard already up to date.');
    }
  } catch (err) {
    console.error('\n❌ Update failed:', err.message);
    fs.writeFileSync(LOG_PATH, `${timestamp}\nUpdate FAILED: ${err.message}\n`);
    process.exit(1);
  }
})();
