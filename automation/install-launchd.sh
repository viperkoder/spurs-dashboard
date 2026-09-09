#!/bin/bash
# THFC Dashboard — installs/repairs the daily 7am automation on this Mac.
#
# Fixes the two things that silently broke it before:
#   1. The plist pointed at a stale "V3 automation/spurs-modular" folder from an
#      old copy of the project instead of wherever THIS copy actually lives.
#   2. The plist called bare `node`, but launchd does not source .zshrc/.bash_profile
#      the way an interactive terminal does — if node was installed via nvm or a
#      shell-managed PATH, launchd simply couldn't find it ("node: command not found").
#
# This script re-generates the plist from scratch every time it's run, using the
# REAL absolute path of this folder and the REAL absolute path of node on this
# machine — so it can't drift out of sync again. Safe to re-run any time you move
# the project folder or reinstall Node; just run this script again.
#
# Usage:
#   chmod +x automation/install-launchd.sh   (first time only)
#   ./automation/install-launchd.sh
#
# To remove the schedule entirely:
#   ./automation/install-launchd.sh uninstall

set -euo pipefail

LABEL="com.thfc.dailyupdate"
PLIST_DEST="$HOME/Library/LaunchAgents/${LABEL}.plist"

# Absolute path to automation/ (this script's own directory), resolved properly
# even if invoked via a relative path or symlink.
AUTOMATION_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "${AUTOMATION_DIR}/.." && pwd)"
UPDATE_SCRIPT="${AUTOMATION_DIR}/update-dashboard.js"

if [[ "${1:-}" == "uninstall" ]]; then
  echo "Unloading and removing ${LABEL}..."
  launchctl unload "${PLIST_DEST}" 2>/dev/null || true
  rm -f "${PLIST_DEST}"
  echo "Done. Daily automation is OFF."
  exit 0
fi

# ── Locate node robustly ────────────────────────────────────────────────────
NODE_BIN=""
if command -v node >/dev/null 2>&1; then
  NODE_BIN="$(command -v node)"
elif [[ -x "/opt/homebrew/bin/node" ]]; then
  NODE_BIN="/opt/homebrew/bin/node"          # Homebrew, Apple Silicon
elif [[ -x "/usr/local/bin/node" ]]; then
  NODE_BIN="/usr/local/bin/node"             # Homebrew, Intel
elif [[ -s "$HOME/.nvm/nvm.sh" ]]; then
  # shellcheck disable=SC1090
  source "$HOME/.nvm/nvm.sh"
  NODE_BIN="$(nvm which current 2>/dev/null || true)"
fi

if [[ -z "${NODE_BIN}" || ! -x "${NODE_BIN}" ]]; then
  echo "❌ Could not find a node binary on this machine."
  echo "   Install Node (https://nodejs.org, or 'brew install node') and re-run this script."
  exit 1
fi

echo "Project dir : ${PROJECT_DIR}"
echo "Node binary : ${NODE_BIN}"
echo "Update script: ${UPDATE_SCRIPT}"

if [[ ! -f "${AUTOMATION_DIR}/.env" ]]; then
  echo "⚠️  automation/.env not found yet — copy .env.example to .env and add your"
  echo "   ANTHROPIC_API_KEY before the schedule will actually do anything."
fi

# ── Generate the plist with real, absolute paths baked in ──────────────────
cat > "${PLIST_DEST}" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>${LABEL}</string>

    <key>ProgramArguments</key>
    <array>
        <string>${NODE_BIN}</string>
        <string>${UPDATE_SCRIPT}</string>
    </array>

    <key>WorkingDirectory</key>
    <string>${PROJECT_DIR}</string>

    <key>EnvironmentVariables</key>
    <dict>
        <key>PATH</key>
        <string>/usr/local/bin:/opt/homebrew/bin:/usr/bin:/bin</string>
    </dict>

    <key>StartCalendarInterval</key>
    <dict>
        <key>Hour</key>
        <integer>7</integer>
        <key>Minute</key>
        <integer>0</integer>
    </dict>

    <key>StandardOutPath</key>
    <string>${AUTOMATION_DIR}/run-output.log</string>

    <key>StandardErrorPath</key>
    <string>${AUTOMATION_DIR}/run-error.log</string>

    <key>RunAtLoad</key>
    <false/>
</dict>
</plist>
PLIST

# Calling node directly (not via bash -l -c "node ...") sidesteps the PATH
# problem entirely — no shell profile to fail to source in the first place.

launchctl unload "${PLIST_DEST}" 2>/dev/null || true
launchctl load "${PLIST_DEST}"

echo ""
echo "✓ Installed. Daily automation runs at 7:00 AM from:"
echo "  ${PROJECT_DIR}"
echo ""
echo "Test it right now without waiting for 7am:"
echo "  launchctl start ${LABEL}"
echo "  tail -f \"${AUTOMATION_DIR}/run-output.log\""
