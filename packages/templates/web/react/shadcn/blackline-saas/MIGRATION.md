# Blackline SaaS migration

## Source boundary

Copy the template source into a Vite React project with the same `base-nova` shadcn configuration. Keep the generated files under `src/components/ui/` together; the page layer imports them through the `@/components/ui` alias.

The reusable layer is split into three levels:

- `src/components/ui/`: generated shadcn primitives. Treat these files as the fixed visual baseline.
- `src/components/patterns/`: reusable page patterns such as the workspace shell, page header, filter bar, resource table, status badge, summary strip, and activity timeline.
- `src/components/blocks/`: composable SaaS blocks backed by the data contracts in `src/lib/platform-data.ts`.

## Required changes

1. Install the package dependencies recorded in `package.json`.
2. Keep `src/index.css` and `components.json` aligned with the fixed template version.
3. Replace the sample records in `src/lib/platform-data.ts` with the project's adapter while preserving the exported resource shapes, or map the adapter into those shapes at the page boundary.
4. Compose pages from `patterns` and `blocks`. Keep `BlacklineSaasShowcase` as the app composition boundary and replace only the data, navigation, and event handlers required by the host product.
5. Add any new reusable pattern to `src/resource-manifest.ts` so the template catalog describes the actual resource surface.

The Sidebar, Base UI primitives, token names, and generated component APIs remain the source of truth for this version. The example pages demonstrate composition and can be removed or replaced without changing the UI primitives.
