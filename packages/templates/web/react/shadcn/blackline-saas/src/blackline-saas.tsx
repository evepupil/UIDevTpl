import * as React from "react"

import {
  CircleAlert,
  Download,
  MoreHorizontal,
  Plus,
  RefreshCw,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { TooltipProvider } from "@/components/ui/tooltip"

import {
  BillingBlock,
  DeploymentDetailBlock,
  DeploymentsBlock,
  ModelsBlock,
  ProjectOverviewBlock,
  SettingsBlock,
} from "./components/blocks"
import {
  ActivityTimeline,
  EmptyState,
  PageHeader,
  ResourceTable,
  StatusBadge,
  WorkspaceShell,
  type ResourceColumn,
} from "./components/patterns"
import {
  activityEvents,
  models,
  type ModelResource,
  type PlatformPage,
} from "./lib/platform-data"
import { pageHash, pageFromHash, sidebarPage } from "./lib/navigation"

const pageLabels: Record<PlatformPage, string> = {
  overview: "Overview",
  deployments: "Deployments",
  "deployment-detail": "Deployment detail",
  models: "Models",
  billing: "Billing",
  settings: "Settings",
}

function WorkspaceApp({ initialPage }: { initialPage: PlatformPage }) {
  const [page, setPage] = React.useState<PlatformPage>(initialPage)
  const [notice, setNotice] = React.useState<string | null>(null)

  React.useEffect(() => {
    function handleHashChange() {
      const nextPage = pageFromHash(window.location.hash)
      if (nextPage) setPage(nextPage)
    }

    handleHashChange()
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  React.useEffect(() => {
    if (!notice) return undefined
    const timeout = window.setTimeout(() => setNotice(null), 2400)
    return () => window.clearTimeout(timeout)
  }, [notice])

  function navigate(nextPage: PlatformPage) {
    setPage(nextPage)
    if (window.location.hash !== pageHash(nextPage)) {
      window.history.pushState({}, "", pageHash(nextPage))
    }
  }

  function renderPage() {
    switch (page) {
      case "deployments":
        return <DeploymentsBlock onNavigate={navigate} onStatus={setNotice} />
      case "deployment-detail":
        return (
          <DeploymentDetailBlock onNavigate={navigate} onStatus={setNotice} />
        )
      case "models":
        return <ModelsBlock onStatus={setNotice} />
      case "billing":
        return <BillingBlock onStatus={setNotice} />
      case "settings":
        return <SettingsBlock />
      case "overview":
      default:
        return (
          <ProjectOverviewBlock onNavigate={navigate} onStatus={setNotice} />
        )
    }
  }

  return (
    <div className="blackline-app">
      <WorkspaceShell
        activePage={sidebarPage(page)}
        breadcrumb={pageLabels[page]}
        onNavigate={navigate}
      >
        {renderPage()}
      </WorkspaceShell>
      {notice ? (
        <div className="blackline-notice" role="status">
          <StatusBadge status="Ready" />
          <span>{notice}</span>
        </div>
      ) : null}
    </div>
  )
}

export function BlacklineSaasShowcase({
  initialPage = "overview",
}: { initialPage?: PlatformPage } = {}) {
  return <WorkspaceApp initialPage={initialPage} />
}

export function BlacklineDeploymentsShowcase() {
  return <WorkspaceApp initialPage="deployments" />
}

export function BlacklineDeploymentDetailShowcase() {
  return <WorkspaceApp initialPage="deployment-detail" />
}

export function BlacklineModelsShowcase() {
  return <WorkspaceApp initialPage="models" />
}

export function BlacklineBillingShowcase() {
  return <WorkspaceApp initialPage="billing" />
}

export function BlacklineSettingsShowcase() {
  return <WorkspaceApp initialPage="settings" />
}

export function BlacklineComponentLab() {
  const [selected, setSelected] = React.useState<
    "Default" | "Loading" | "Empty"
  >("Default")
  const modelColumns: readonly ResourceColumn<ModelResource>[] = [
    {
      id: "name",
      header: "Model",
      render: (model) => <strong>{model.name}</strong>,
    },
    {
      id: "version",
      header: "Version",
      render: (model) => <code>{model.version}</code>,
    },
    {
      id: "status",
      header: "Status",
      render: (model) => <StatusBadge status={model.status} />,
    },
    {
      id: "action",
      header: <span className="sr-only">Actions</span>,
      className: "w-px text-right",
      render: () => (
        <Button variant="ghost" size="icon-sm" aria-label="More actions">
          <MoreHorizontal aria-hidden="true" />
        </Button>
      ),
    },
  ]

  return (
    <TooltipProvider>
      <main className="blackline-lab">
        <PageHeader title="Component lab" />
        <Card
          className="blackline-lab__section"
          aria-labelledby="lab-actions-title"
        >
          <CardHeader>
            <CardTitle id="lab-actions-title">Actions</CardTitle>
          </CardHeader>
          <CardContent className="blackline-lab__row">
            <Button>
              <Plus aria-hidden="true" />
              New model
            </Button>
            <Button variant="outline">
              <Download aria-hidden="true" />
              Export
            </Button>
            <Button variant="ghost" size="icon" aria-label="More actions">
              <MoreHorizontal aria-hidden="true" />
            </Button>
            <Button variant="outline" onClick={() => setSelected("Loading")}>
              <RefreshCw aria-hidden="true" />
              Loading
            </Button>
          </CardContent>
        </Card>
        <Card
          className="blackline-lab__section"
          aria-labelledby="lab-status-title"
        >
          <CardHeader>
            <CardTitle id="lab-status-title">Statuses</CardTitle>
          </CardHeader>
          <CardContent className="blackline-lab__row">
            <StatusBadge status="Ready" />
            <StatusBadge status="Building" />
            <StatusBadge status="Failed" />
            <StatusBadge status="Paused" />
          </CardContent>
        </Card>
        <Card
          className="blackline-lab__section"
          aria-labelledby="lab-states-title"
        >
          <CardHeader>
            <CardTitle id="lab-states-title">States</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="blackline-lab__row blackline-lab__row--states">
              {(["Default", "Loading", "Empty"] as const).map((state) => (
                <Button
                  key={state}
                  variant={selected === state ? "default" : "outline"}
                  onClick={() => setSelected(state)}
                  aria-pressed={selected === state}
                >
                  {state}
                </Button>
              ))}
            </div>
            <div className="blackline-lab__preview">
              {selected === "Loading" ? (
                <div className="blackline-lab__skeleton">
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </div>
              ) : null}
              {selected === "Empty" ? (
                <EmptyState
                  icon={<CircleAlert aria-hidden="true" />}
                  title="No models found"
                />
              ) : null}
              {selected === "Default" ? (
                <ResourceTable
                  rows={models.slice(0, 2)}
                  columns={modelColumns}
                />
              ) : null}
            </div>
          </CardContent>
        </Card>
        <Card
          className="blackline-lab__section"
          aria-labelledby="lab-timeline-title"
        >
          <CardHeader>
            <CardTitle id="lab-timeline-title">Activity timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityTimeline events={activityEvents.slice(0, 2)} />
          </CardContent>
        </Card>
      </main>
    </TooltipProvider>
  )
}
