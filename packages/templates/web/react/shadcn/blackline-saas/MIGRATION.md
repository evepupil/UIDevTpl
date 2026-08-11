# Blackline SaaS migration

## Source boundary

Copy the template source into a Vite React project with the same `base-nova` shadcn configuration. Keep the generated files under `src/components/ui/` together; the page layer imports them through the `@/components/ui` alias.

## Required changes

1. Install the package dependencies recorded in `package.json`.
2. Keep `src/index.css` and `components.json` aligned with the fixed template version.
3. Replace sample data in `src/lib/dashboard-data.ts` with the project's data adapter.
4. Keep `BlacklineSaasShowcase` as the page composition boundary and replace only the data and event handlers required by the host product.

The Sidebar, Base UI primitives, token names, and component APIs remain the source of truth for this version.
