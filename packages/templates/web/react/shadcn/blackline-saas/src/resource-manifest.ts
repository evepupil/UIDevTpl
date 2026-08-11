export interface TemplateResource {
  id: string
  kind: "layout" | "pattern" | "block"
  name: string
  entry: string
  dependencies: readonly string[]
}

export const blacklineSaasResources: readonly TemplateResource[] = [
  { id: "app-shell", kind: "layout", name: "Workspace Shell", entry: "./components/patterns/page-shell", dependencies: ["sidebar", "breadcrumb", "separator", "tooltip"] },
  { id: "page-header", kind: "pattern", name: "Page Header", entry: "./components/patterns/page-header", dependencies: ["button"] },
  { id: "filter-bar", kind: "pattern", name: "Filter Bar", entry: "./components/patterns/filter-bar", dependencies: ["input", "select"] },
  { id: "resource-table", kind: "pattern", name: "Resource Table", entry: "./components/patterns/resource-table", dependencies: ["table"] },
  { id: "status-badge", kind: "pattern", name: "Status Badge", entry: "./components/patterns/status-badge", dependencies: ["badge"] },
  { id: "activity-timeline", kind: "pattern", name: "Activity Timeline", entry: "./components/patterns/activity-timeline", dependencies: ["separator"] },
  { id: "project-overview", kind: "block", name: "Project Overview", entry: "./components/blocks/overview-block", dependencies: ["app-shell", "resource-table", "status-badge"] },
  { id: "deployment-list", kind: "block", name: "Deployment List", entry: "./components/blocks/deployments-block", dependencies: ["page-header", "filter-bar", "resource-table"] },
  { id: "model-list", kind: "block", name: "Model List", entry: "./components/blocks/models-block", dependencies: ["page-header", "filter-bar", "resource-table"] },
  { id: "deployment-detail", kind: "block", name: "Deployment Detail", entry: "./components/blocks/deployment-detail-block", dependencies: ["page-header", "activity-timeline"] },
  { id: "settings-form", kind: "block", name: "Settings Form", entry: "./components/blocks/settings-block", dependencies: ["page-header", "input", "select"] },
]
