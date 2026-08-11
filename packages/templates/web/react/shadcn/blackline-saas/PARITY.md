# Blackline SaaS parity

| Surface | Source of truth | Current state |
| --- | --- | --- |
| Sidebar foundation | `npx shadcn@latest add sidebar-07` | `Sidebar`, `Avatar`, `Breadcrumb`, `Button`, `Collapsible`, `DropdownMenu`, `Input`, `Separator`, `Sheet`, `Skeleton`, and `Tooltip`; generated files kept unchanged |
| Showcase foundation | `pnpm exec shadcn add select dialog table label card progress badge --yes` | `Select`, `Dialog`, `Table`, `Label`, `Card`, `Progress`, and `Badge`; added through the same `base-nova` registry style |
| Theme | `components.json` and `src/index.css` | `base-nova`, neutral, CSS variables |
| Primitive | `@base-ui/react` | `1.7.0` |
| Icons | `lucide-react` | `1.31.0` |
| Resource layer | `src/components/patterns/`, `src/components/blocks/`, `src/lib/platform-data.ts` | Shell, header, filters, table, status, summary, timeline, empty state, and six SaaS blocks are exported as reusable resources |
| Showcase | `src/blackline-saas.tsx` | Overview, deployments, deployment detail, models, billing, settings, and component lab compose the resource layer; page navigation uses hash routes |
| Component lab | `src/blackline-saas.tsx` | Buttons, status badges, loading, empty, table, and activity timeline states |

The generated shadcn files stay outside the custom composition layer. A later template version must regenerate them instead of editing this version in place. `resource-manifest.ts` is the catalog of reusable resources; showcase data is replaceable through `platform-data.ts`.
