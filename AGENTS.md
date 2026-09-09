# Repository Rules

- GitHub `main` is the single authoritative source.
- Read `docs/dashboard-maintenance-checklist.md` before data or season updates.
- Edit source under `src/`; never hand-edit generated `docs/bundle.js` or
  `docs/index.html`.
- Rebuild `docs/` with `npm run build` after every source change.
- Prefer official and primary sources; preserve uncertainty in rumours.
- Never expose API keys or commit `automation/.env`.
- Keep transfers, squad and finances reconciled in the same change.
- Run the secret scan and build checks before publishing.
- Do not add paid services or dependencies without approval.
