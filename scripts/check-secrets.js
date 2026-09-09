#!/usr/bin/env node
// THFC Dashboard — secret scanner.
// Run before you zip/share/commit this project: `npm run check-secrets`
// Also runs automatically at the start of every `node build.js`.
//
// Scans every file in the project (except node_modules/, dist/, .git/) for
// patterns that look like a real Anthropic API key. If found anywhere other
// than automation/.env (which is gitignored and never shipped), it fails
// loudly and blocks the build — this is what should have caught last time.

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SKIP_DIRS = new Set(['node_modules', 'dist', '.git']);
const KEY_PATTERN = /sk-ant-api\d{2}-[A-Za-z0-9_-]{20,}/g;

// automation/.env is ALLOWED to hold a real key locally — it's gitignored
// and deleted before any zip/share. Everywhere else is a violation.
const ALLOWED_PATH = path.join(ROOT, 'automation', '.env');

let violations = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else {
      // Skip binary-ish files
      if (/\.(png|jpg|jpeg|gif|ico|zip|woff2?)$/i.test(entry.name)) continue;
      let text;
      try { text = fs.readFileSync(full, 'utf8'); } catch { continue; }
      const matches = text.match(KEY_PATTERN);
      if (matches && full !== ALLOWED_PATH) {
        violations.push({ file: path.relative(ROOT, full), count: matches.length });
      }
    }
  }
}

walk(ROOT);

// Also check automation/.env itself isn't about to be zipped — this script
// can't know your zip command, but it CAN warn if .env exists at all, since
// that's the file that leaked last time.
const envExists = fs.existsSync(ALLOWED_PATH);

if (violations.length > 0) {
  console.error('\n🚨 SECRET SCAN FAILED — live API key pattern found outside automation/.env:\n');
  violations.forEach(v => console.error(`   ${v.file}  (${v.count} match${v.count > 1 ? 'es' : ''})`));
  console.error('\nRemove the real key from these files before continuing. If this is meant to');
  console.error('be a placeholder, use a clearly fake value like sk-ant-YOUR-KEY-HERE.\n');
  process.exit(1);
}

if (envExists) {
  console.log('⚠️  automation/.env exists locally (expected for daily automation to work).');
  console.log('   It is gitignored and will NOT be included by build.js.');
  console.log('   Before zipping/sharing this project folder with anyone (including in a chat),');
  console.log('   delete or rename automation/.env first, or run: npm run check-secrets:strict\n');
} else {
  console.log('✓ Secret scan passed — no exposed API keys found, automation/.env not present.\n');
}
