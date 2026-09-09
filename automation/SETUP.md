# THFC Dashboard — Daily Automation Setup

## ⚠️ Security first

You pasted a live API key into chat earlier — **revoke it now** at
console.anthropic.com → Settings → API Keys, and generate a fresh one.
Never paste a real API key into a chat conversation again — treat it
like a password.

---

## What this does

Every day at 7:00 AM, a script on your Mac:
1. Fetches all 6 RSS sources (same ones the News tab uses)
2. Sends fresh headlines + your current transfers/squad data to Claude
3. Claude identifies ONLY confirmed, verifiable changes — conservative by design
4. Updates `src/data/transfers.js` and `src/data/squad.js` automatically
5. Rebuilds the tracked `docs/` deployment output
6. Writes `automation/update-log.txt` — a plain-English summary for you to check

**It does NOT** auto-upload to GitHub. You still control what goes live —
review the changes, then commit the rebuilt `docs/` files when you're happy with them.

**It does NOT** touch `news.js` — the News tab already fetches RSS live
every time you open the dashboard, no automation needed there.

---

## Step 1 — Add your API key

```bash
cd spurs-modular/automation
cp .env.example .env
```

Open `.env` in TextEdit and replace the placeholder with your real
(new, rotated) key:

```
ANTHROPIC_API_KEY=sk-ant-api03-your-real-key-here
```

Save. This file never leaves your Mac and is excluded from git via `.gitignore`.

---

## Step 2 — Test it manually first

Before scheduling anything, run it once by hand to see it work:

```bash
cd spurs-modular
node automation/update-dashboard.js
```

You'll see live output showing each RSS source being fetched, then
Claude's analysis, then whether anything changed. Check
`automation/update-log.txt` afterwards to see the summary.

**If it updated something** — review `src/data/transfers.js` and
`src/data/squad.js` to make sure the change looks right, then:

```bash
node build.js
```

(the script already runs this automatically if changes were made —
this manual step is only if you want to rebuild again after your own edits)

---

## Step 3 — Schedule it for 7am daily

**This step used to require hand-editing `com.thfc.dailyupdate.plist`** —
pasting in your folder path and node path manually. That's exactly how this
broke last time (a stale path from an old "V3" copy of the project got left
in there, and separately, launchd couldn't find bare `node` because it
doesn't source your shell profile the way Terminal does). Both problems are
now handled automatically:

1. Make the installer executable (one-time):
   ```bash
   cd spurs-modular-v6
   chmod +x automation/install-launchd.sh
   ```

2. Run it:
   ```bash
   ./automation/install-launchd.sh
   ```
   It detects this folder's real path and this Mac's real node path, generates
   a correct plist from scratch, and loads it — no manual editing, nothing to
   get out of sync.

3. Confirm it's loaded:
   ```bash
   launchctl list | grep thfc
   ```
   You should see `com.thfc.dailyupdate` in the list.

4. Test it immediately without waiting for 7am:
   ```bash
   launchctl start com.thfc.dailyupdate
   tail -f automation/run-output.log
   ```

That's it — it will now run automatically at 7:00 AM every day your
Mac is on (lid closed is fine, fully shut down is not — see the GitHub
Actions option below if you want it to run even when your Mac is off).

**If you ever move the project folder or reinstall Node**, just re-run
`./automation/install-launchd.sh` — it regenerates the plist with the new
paths. To turn it off: `./automation/install-launchd.sh uninstall`.

---

## Checking it worked each morning

```bash
cat spurs-modular/automation/update-log.txt
```

This shows you:
- How many headlines were checked
- Whether anything changed
- A plain-English summary
- Anything flagged as "not confident enough to auto-apply" for you to check manually

If changes were applied, review the data files, then upload the new
Commit the rebuilt `docs/` deployment files to GitHub as usual.

---

## Turning it off

```bash
./automation/install-launchd.sh uninstall
```

---

## Cost

Roughly $0.02–0.05 per run (one Claude API call per day) →
**under $2/month** at daily frequency.

---

## What it will and won't catch

**Good at:** confirmed signings ("Here We Go", "official", contract signed),
clear likelihood shifts on rumours ("personal terms agreed" vs "linked with"),
injury status changes reported by multiple outlets.

**Conservative on purpose:** if headlines are ambiguous or contradictory,
it will list them under "flagged for your review" rather than guess.
This is intentional — matches how you and I have been verifying things
together, just automated for the easy/obvious cases.

**Won't touch:** World Cup panel (results change fast during the
tournament and deserve a manual check), club records, trophy history —
these rarely change and aren't worth the automation risk.

---

## Option 2 — run it in the cloud instead (recommended)

The local schedule above only fires if your Mac is on, awake, and online
at 7am. `.github/workflows/daily-transfer-update.yml` runs the identical
script on GitHub's servers instead, so it works even if your laptop is shut.

Setup (5 minutes, one time):

1. Push this repo to GitHub if it isn't already.
2. Repo → **Settings → Secrets and variables → Actions → New repository secret**.
   Name: `ANTHROPIC_API_KEY`. Value: your key.
3. That's it — it runs daily at 06:00 UTC and pushes any changes straight
   to `main` with commit message `Automated daily update — YYYY-MM-DD`.
   Trigger a run immediately from the **Actions** tab → *Daily transfer
   update* → *Run workflow* to test it.

**Cost:** effectively free — a few minutes/day is nowhere near GitHub
Actions' free monthly allowance (2,000 min/month private repos, unlimited
on public repos).

You can run both the local schedule and the GitHub Actions one, or just
the cloud one and retire the Mac-based schedule entirely
(`./automation/install-launchd.sh uninstall`). Cloud-only is the more
reliable setup if you don't want to think about it.

---
AUDERE EST FACERE · THFC 1882 · COYS
