# Blackline SaaS

Blackline is a grey, black, and white SaaS workspace built with React, TypeScript, Vite, and shadcn/ui. It is designed to be adapted through reusable resources instead of editing a showcase page line by line.

## Reuse the template

1. Copy the source into a Vite React project with the same `@/` alias.
2. Keep `components.json` and `src/index.css` as the theme baseline.
3. Replace the records in `src/lib/platform-data.ts` with your domain data.
4. Compose the app from `src/components/patterns/` and `src/components/blocks/`.
5. Keep the generated shadcn primitives in `src/components/ui/` unchanged when adding application-specific behavior.

The resource map is available from `src/resource-manifest.ts`. It lists the shell, patterns, blocks, and their primitive dependencies.

## Available resources

- Shell: `WorkspaceShell`
- Patterns: `PageHeader`, `FilterBar`, `ResourceTable`, `StatusBadge`, `SummaryStrip`, `ActivityTimeline`, `EmptyState`
- Blocks: project overview, deployment list, deployment detail, model list, billing, and settings
- Data helpers: `filterByQuery`, `filterDeployments`, and `filterModels`

## Add an official shadcn primitive

Use the fixed shadcn setup when the resource layer needs another primitive:

```bash
npx shadcn@latest add button
```

The command writes to `src/components/ui`. Keep the generated source separate from custom patterns and blocks.
