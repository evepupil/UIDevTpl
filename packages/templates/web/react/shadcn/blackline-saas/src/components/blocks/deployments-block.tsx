import * as React from "react"

import { ArrowUpRight, GitBranch, MoreHorizontal, Rocket } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import {
  deployments,
  filterDeployments,
  type Deployment,
  type DeploymentStatus,
  type PlatformPage,
} from "../../lib/platform-data"
import {
  FilterBar,
  PageHeader,
  ResourceTable,
  StatusBadge,
  type ResourceColumn,
} from "../patterns"

export function DeploymentsBlock({
  onNavigate,
  onStatus,
}: {
  onNavigate?: (page: PlatformPage) => void
  onStatus?: (message: string) => void
}) {
  const [query, setQuery] = React.useState("")
  const [environment, setEnvironment] = React.useState<
    "all" | Deployment["environment"]
  >("all")
  const [status, setStatus] = React.useState<"all" | DeploymentStatus>("all")
  const rows = filterDeployments(deployments, query, environment, status)

  const columns: readonly ResourceColumn<Deployment>[] = [
    {
      id: "status",
      header: "Status",
      render: (deployment) => <StatusBadge status={deployment.status} />,
    },
    {
      id: "project",
      header: "Project",
      render: (deployment) => <strong>{deployment.project}</strong>,
    },
    {
      id: "environment",
      header: "Environment",
      render: (deployment) => <span>{deployment.environment}</span>,
    },
    {
      id: "commit",
      header: "Commit",
      render: (deployment) => (
        <div className="blackline-commit">
          <code>{deployment.commit}</code>
          <span>{deployment.message}</span>
        </div>
      ),
    },
    {
      id: "branch",
      header: "Branch",
      render: (deployment) => (
        <span className="blackline-inline-icon">
          <GitBranch aria-hidden="true" />
          {deployment.branch}
        </span>
      ),
    },
    {
      id: "duration",
      header: "Duration",
      render: (deployment) => (
        <span className="blackline-muted">{deployment.duration}</span>
      ),
    },
    {
      id: "actions",
      header: <span className="sr-only">Actions</span>,
      className: "w-px text-right",
      render: (deployment) => (
        <div className="blackline-row-actions">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate?.("deployment-detail")}
          >
            View
            <ArrowUpRight aria-hidden="true" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label={`More actions for ${deployment.id}`}
            onClick={() => onStatus?.(`Actions for ${deployment.id}`)}
          >
            <MoreHorizontal aria-hidden="true" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <>
      <PageHeader
        title="Deployments"
        actions={
          <Button onClick={() => onStatus?.("Deployment dialog opened")}>
            <Rocket aria-hidden="true" />
            Deploy
          </Button>
        }
      />
      <Card role="region" aria-label="Deployment filters">
        <CardContent className="grid gap-4">
          <FilterBar
            query={query}
            onQueryChange={setQuery}
            queryLabel="Search deployments"
            filters={[
              {
                label: "Environment",
                value: environment,
                onChange: (value) =>
                  setEnvironment(value as "all" | Deployment["environment"]),
                options: [
                  { value: "all", label: "All environments" },
                  { value: "Production", label: "Production" },
                  { value: "Preview", label: "Preview" },
                ],
              },
              {
                label: "Status",
                value: status,
                onChange: (value) =>
                  setStatus(value as "all" | DeploymentStatus),
                options: [
                  { value: "all", label: "All statuses" },
                  { value: "Ready", label: "Ready" },
                  { value: "Building", label: "Building" },
                  { value: "Failed", label: "Failed" },
                  { value: "Canceled", label: "Canceled" },
                ],
              },
            ]}
          />
          <div className="blackline-result-line">
            <span>{rows.length} deployments</span>
            <span className="blackline-muted">Atlas</span>
          </div>
        </CardContent>
      </Card>
      <Card className="gap-0" role="region" aria-label="Deployments list">
        <ResourceTable
          rows={rows}
          columns={columns}
          emptyLabel="No deployments found"
        />
      </Card>
    </>
  )
}
