# Blackline SaaS parity

| Surface | Source of truth | Current state |
| --- | --- | --- |
| Sidebar foundation | `npx shadcn@latest add sidebar-07` | `Sidebar`, `Avatar`, `Breadcrumb`, `Button`, `Collapsible`, `DropdownMenu`, `Input`, `Separator`, `Sheet`, `Skeleton`, and `Tooltip`; generated files kept unchanged |
| Showcase foundation | `pnpm exec shadcn add select dialog table label card progress badge --yes` | `Select`, `Dialog`, `Table`, `Label`, `Card`, `Progress`, and `Badge`; added through the same `base-nova` registry style |
| Theme | `components.json` and `src/index.css` | `base-nova`, neutral, CSS variables |
| Primitive | `@base-ui/react` | `1.7.0` |
| Icons | `lucide-react` | `1.31.0` |
| Showcase | `src/blackline-saas.tsx` | SaaS overview with component-backed range select, table, cards, badges, progress bars, dialog, filter, export, and responsive states |
| Component lab | `src/blackline-saas.tsx` | Buttons, loading, empty, input, and action states |

The generated shadcn files are intentionally kept outside the custom composition layer. A later template version must regenerate them instead of editing this version in place.
