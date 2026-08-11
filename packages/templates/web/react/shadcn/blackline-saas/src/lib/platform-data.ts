export type PlatformPage =
  | "overview"
  | "deployments"
  | "deployment-detail"
  | "models"
  | "billing"
  | "settings"

export type DeploymentStatus = "Ready" | "Building" | "Failed" | "Canceled"
export type ModelStatus = "Ready" | "Building" | "Paused"
export type InvoiceStatus = "Paid" | "Open" | "Past due"

export interface Deployment {
  id: string
  project: string
  status: DeploymentStatus
  environment: "Production" | "Preview"
  branch: string
  commit: string
  message: string
  createdAt: string
  duration: string
  url: string
}

export interface ModelResource {
  id: string
  name: string
  version: string
  provider: string
  status: ModelStatus
  requests: string
  updatedAt: string
}

export interface Invoice {
  id: string
  date: string
  status: InvoiceStatus
  amount: string
  method: string
}

export interface ActivityEvent {
  id: string
  title: string
  detail: string
  time: string
  tone: "success" | "info" | "warning" | "danger"
}

export const projectSummary = {
  name: "Atlas",
  repository: "acme / atlas",
  productionUrl: "atlas.example.com",
  productionStatus: "Ready" as const,
  latestCommit: "8f31c2a",
  latestMessage: "Improve edge cache headers",
}

export const deployments: readonly Deployment[] = [
  {
    id: "dep-8f31c2a",
    project: "Atlas",
    status: "Ready",
    environment: "Production",
    branch: "main",
    commit: "8f31c2a",
    message: "Improve edge cache headers",
    createdAt: "2m ago",
    duration: "42s",
    url: "atlas.example.com",
  },
  {
    id: "dep-21a0e4c",
    project: "Atlas",
    status: "Ready",
    environment: "Preview",
    branch: "feat/command-menu",
    commit: "21a0e4c",
    message: "Add command menu shortcuts",
    createdAt: "18m ago",
    duration: "39s",
    url: "atlas-git-command-menu.example.com",
  },
  {
    id: "dep-7b6d110",
    project: "Atlas",
    status: "Building",
    environment: "Preview",
    branch: "fix/usage-chart",
    commit: "7b6d110",
    message: "Fix usage chart labels",
    createdAt: "31m ago",
    duration: "Running",
    url: "atlas-git-usage-chart.example.com",
  },
  {
    id: "dep-4d16b9e",
    project: "Atlas",
    status: "Failed",
    environment: "Preview",
    branch: "feat/billing-export",
    commit: "4d16b9e",
    message: "Add billing export",
    createdAt: "1h ago",
    duration: "18s",
    url: "atlas-git-billing-export.example.com",
  },
  {
    id: "dep-0c7aa82",
    project: "Atlas",
    status: "Canceled",
    environment: "Preview",
    branch: "chore/dependencies",
    commit: "0c7aa82",
    message: "Update dependencies",
    createdAt: "3h ago",
    duration: "12s",
    url: "atlas-git-dependencies.example.com",
  },
]

export const models: readonly ModelResource[] = [
  {
    id: "model-atlas-chat",
    name: "Atlas Chat",
    version: "v3.2",
    provider: "Atlas AI",
    status: "Ready",
    requests: "2.4M",
    updatedAt: "12m ago",
  },
  {
    id: "model-northstar-embed",
    name: "Northstar Embed",
    version: "v2.1",
    provider: "Northstar",
    status: "Ready",
    requests: "890K",
    updatedAt: "1h ago",
  },
  {
    id: "model-vector-lab",
    name: "Vector Lab",
    version: "v0.9",
    provider: "Vector Lab",
    status: "Building",
    requests: "124K",
    updatedAt: "3h ago",
  },
  {
    id: "model-rerank",
    name: "Rerank Pro",
    version: "v1.4",
    provider: "Atlas AI",
    status: "Paused",
    requests: "56K",
    updatedAt: "Yesterday",
  },
]

export const invoices: readonly Invoice[] = [
  { id: "INV-1048", date: "Aug 11, 2026", status: "Paid", amount: "$99", method: "Visa ending 4242" },
  { id: "INV-1047", date: "Jul 11, 2026", status: "Paid", amount: "$99", method: "Visa ending 4242" },
  { id: "INV-1046", date: "Jun 11, 2026", status: "Paid", amount: "$99", method: "Visa ending 4242" },
]

export const activityEvents: readonly ActivityEvent[] = [
  { id: "event-1", title: "Production deployment ready", detail: "main · 8f31c2a", time: "2m ago", tone: "success" },
  { id: "event-2", title: "Preview deployment started", detail: "feat/command-menu · 21a0e4c", time: "18m ago", tone: "info" },
  { id: "event-3", title: "Domain certificate renewed", detail: "atlas.example.com", time: "2h ago", tone: "success" },
  { id: "event-4", title: "Build failed", detail: "feat/billing-export · 4d16b9e", time: "1h ago", tone: "danger" },
]

export const deploymentSteps = [
  { id: "step-1", title: "Queued", detail: "Build accepted", time: "10:42:08", tone: "success" as const },
  { id: "step-2", title: "Building", detail: "Vite 8.2.1 · Node 24", time: "10:42:12", tone: "success" as const },
  { id: "step-3", title: "Deploying", detail: "14 assets uploaded", time: "10:42:41", tone: "success" as const },
  { id: "step-4", title: "Ready", detail: "Production traffic enabled", time: "10:42:50", tone: "success" as const },
]

export function filterByQuery<T>(items: readonly T[], query: string, fields: readonly (keyof T)[]): T[] {
  const normalized = query.trim().toLocaleLowerCase()
  if (!normalized) return [...items]

  return items.filter((item) =>
    fields.some((field) => String(item[field]).toLocaleLowerCase().includes(normalized))
  )
}

export function filterDeployments(
  items: readonly Deployment[],
  query: string,
  environment: "all" | Deployment["environment"],
  status: "all" | DeploymentStatus,
): Deployment[] {
  return filterByQuery(
    items.filter((item) =>
      (environment === "all" || item.environment === environment) &&
      (status === "all" || item.status === status),
    ),
    query,
    ["project", "branch", "commit", "message", "environment", "status"],
  )
}

export function filterModels(
  items: readonly ModelResource[],
  query: string,
  status: "all" | ModelStatus,
): ModelResource[] {
  return filterByQuery(
    items.filter((item) => status === "all" || item.status === status),
    query,
    ["name", "version", "provider", "status"],
  )
}
