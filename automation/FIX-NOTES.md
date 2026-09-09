# Daily transfer update — Actions run failure, fixed 2026-08-10

## Root cause
Run failed at "Run daily update" step: "Update failed: Unterminated string in JSON at..."
`automation/update-dashboard.js` line 272 had `max_tokens: 2000` on the Claude
reconciliation call. With 41 headlines gathered that run (all 6 RSS feeds working),
the JSON response got cut off before finishing, so JSON.parse() choked on a
truncated string.

## Fix
- max_tokens: 2000 -> 4096 (line ~272)
- JSON.parse wrapped in try/catch that logs the last 500 chars of the raw
  response before re-throwing, so a repeat failure is debuggable straight
  from the Actions log without needing to pull the repo

## To apply
1. Replace automation/update-dashboard.js in the repo with this file
2. node build.js (only if src/data/*.js also changed — not needed for this fix alone)
3. git pull --rebase && git add automation/update-dashboard.js && git commit -m "fix: bump max_tokens to prevent JSON truncation in daily automation" && git push

## Side note from the same run's log
TEAMtalk and r/coys both returned 0 items this run. Not the cause of the
failure, just flagging — worth a glance if it happens again on the next run.
