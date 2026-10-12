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

## VKOS registration maintenance

Follow the [VKOS lifecycle and maintenance standard](https://github.com/viperkoder/vk-knowledge/blob/main/project-management/README.md#project-registration-and-lifecycle). Update this repository's existing maintenance checklist when scope, decisions, status, blockers or verification change; reconcile its entry in the [VKOS register](https://github.com/viperkoder/vk-ops/blob/main/projects/registry.yaml). Keep statistics authority here and preserve the independent Legion presentation boundary. If access prevents canonical capture, record the exact pending reconciliation and owner.

