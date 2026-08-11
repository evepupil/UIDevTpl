# Blackline SaaS parity

| Surface | Source of truth | Current state |
| --- | --- | --- |
| Sidebar | `npx shadcn@latest add sidebar-07` | Generated files kept unchanged |
| Theme | `components.json` and `src/index.css` | `base-nova`, neutral, CSS variables |
| Primitive | `@base-ui/react` | `1.7.0` |
| Icons | `lucide-react` | `1.31.0` |
| Showcase | `src/blackline-saas.tsx` | SaaS overview with filter, export, create-project, and responsive states |
| Component lab | `src/blackline-saas.tsx` | Buttons, loading, empty, input, and action states |

The generated shadcn files are intentionally kept outside the custom composition layer. A later template version must regenerate them instead of editing this version in place.
