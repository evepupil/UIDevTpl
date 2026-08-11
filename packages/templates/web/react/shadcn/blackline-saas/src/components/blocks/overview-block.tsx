import * as React from "react"

import { ArrowUpRight, Check, GitBranch, Globe2, Plus, Rocket, Server, ShieldCheck } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import {
  activityEvents,
  deployments,
  projectSummary,
  type PlatformPage,
} from "../../lib/platform-data"
import { ActivityTimeline, PageHeader, ResourceTable, StatusBadge, SummaryStrip, type ResourceColumn } from "../patterns"

function DeployDialog({
  open,
  onOpenChange,
  onDeploy,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onDeploy: () => void
}) {
  const [branch, setBranch] = React.useState("main")
  const [environment, setEnvironment] = React.useState("Production")

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onDeploy()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="blackline-dialog">
        <DialogHeader className="blackline-dialog__header">
          <DialogTitle>Deploy Atlas</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit}>
          <div className="blackline-form-stack">
            <div className="blackline-field">
              <Label htmlFor="deploy-branch">Branch</Label>
              <Input id="deploy-branch" value={branch} onChange={(event) => setBranch(event.target.value)} />
            </div>
            <div className="blackline-field">
              <Label htmlFor="deploy-environment">Environment</Label>
              <Select value={environment} onValueChange={(value) => value && setEnvironment(value)}>
                <SelectTrigger id="deploy-environment" aria-label="Environment">
                  <SelectValue>{environment}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Production">Production</SelectItem>
                  <SelectItem value="Preview">Preview</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter className="blackline-dialog__actions">
            <DialogClose render={<Button variant="outline" type="button" />}>Cancel</DialogClose>
            <Button type="submit">
              <Rocket aria-hidden="true" />
              Deploy
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function ProjectOverviewBlock({
  onNavigate,
  onStatus,
}: {
  onNavigate?: (page: PlatformPage) => void
  onStatus?: (message: string) => void
}) {
  const [deployOpen, setDeployOpen] = React.useState(false)

  const recentDeploymentColumns: readonly ResourceColumn<(typeof deployments)[number]>[] = [
    {
      id: "status",
      header: "Status",
      render: (deployment) => <StatusBadge status={deployment.status} />,
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
      id: "created",
      header: "Created",
      render: (deployment) => <span className="blackline-muted">{deployment.createdAt}</span>,
    },
    {
      id: "action",
      header: <span className="sr-only">Actions</span>,
      className: "blackline-table__actions",
      render: () => (
        <Button variant="ghost" size="sm" onClick={() => onNavigate?.("deployment-detail")}>
          View
          <ArrowUpRight aria-hidden="true" />
        </Button>
      ),
    },
  ]

  function deploy() {
    setDeployOpen(false)
    onStatus?.("Deployment queued")
  }

  return (
    <>
      <PageHeader
        title="Overview"
        meta={<StatusBadge status="Ready" />}
        actions={
          <Button onClick={() => setDeployOpen(true)}>
            <Rocket aria-hidden="true" />
            Deploy
          </Button>
        }
      />

      <section className="blackline-object-bar" aria-labelledby="project-title">
        <div className="blackline-object-bar__identity">
          <Avatar size="lg">
            <AvatarFallback>AT</AvatarFallback>
          </Avatar>
          <div>
            <h2 id="project-title">{projectSummary.name}</h2>
            <span>{projectSummary.repository}</span>
          </div>
        </div>
        <div className="blackline-object-bar__actions">
          <Button variant="outline" size="sm" onClick={() => onNavigate?.("deployment-detail")}>
            View deployment
            <ArrowUpRight aria-hidden="true" />
          </Button>
          <Button size="sm" onClick={() => setDeployOpen(true)}>
            <Plus aria-hidden="true" />
            New deployment
          </Button>
        </div>
      </section>

      <SummaryStrip
        items={[
          { label: "Production", value: "Ready", detail: projectSummary.productionUrl },
          { label: "Preview", value: "3 active", detail: "Last updated 18m ago" },
          { label: "Deployments", value: "24", detail: "This month" },
          { label: "Build time", value: "42s", detail: "Average" },
        ]}
      />

      <div className="blackline-content-grid blackline-content-grid--split">
        <section className="blackline-section" aria-labelledby="latest-deployment-title">
          <div className="blackline-section__header">
            <h2 id="latest-deployment-title">Latest deployment</h2>
            <StatusBadge status="Ready" />
          </div>
          <div className="blackline-deployment-hero">
            <div className="blackline-deployment-hero__title">
              <GitBranch aria-hidden="true" />
              <strong>main</strong>
              <code>{projectSummary.latestCommit}</code>
            </div>
            <span>{projectSummary.latestMessage}</span>
            <div className="blackline-deployment-hero__meta">
              <span><Check aria-hidden="true" /> Production</span>
              <span><Server aria-hidden="true" /> 42s</span>
              <span><Globe2 aria-hidden="true" /> {projectSummary.productionUrl}</span>
            </div>
          </div>
          <div className="blackline-section__footer">
            <Button variant="outline" size="sm" onClick={() => onNavigate?.("deployment-detail")}>
              Inspect deployment
              <ArrowUpRight aria-hidden="true" />
            </Button>
          </div>
        </section>

        <section className="blackline-section" aria-labelledby="environments-title">
          <div className="blackline-section__header">
            <h2 id="environments-title">Environments</h2>
            <Button variant="ghost" size="sm" onClick={() => onNavigate?.("settings")}>Manage</Button>
          </div>
          <div className="blackline-environment-list">
            <div className="blackline-environment-row">
              <div className="blackline-environment-row__name"><ShieldCheck aria-hidden="true" /><strong>Production</strong></div>
              <StatusBadge status="Ready" />
            </div>
            <div className="blackline-environment-row">
              <div className="blackline-environment-row__name"><Globe2 aria-hidden="true" /><strong>Preview</strong></div>
              <span className="blackline-muted">3 deployments</span>
            </div>
            <div className="blackline-environment-row">
              <div className="blackline-environment-row__name"><Server aria-hidden="true" /><strong>Development</strong></div>
              <span className="blackline-muted">Local only</span>
            </div>
          </div>
        </section>
      </div>

      <section className="blackline-section" aria-labelledby="recent-deployments-title">
        <div className="blackline-section__header">
          <h2 id="recent-deployments-title">Recent deployments</h2>
          <Button variant="ghost" size="sm" onClick={() => onNavigate?.("deployments")}>View all</Button>
        </div>
        <ResourceTable rows={deployments.slice(0, 3)} columns={recentDeploymentColumns} />
      </section>

      <section className="blackline-section" aria-labelledby="activity-title">
        <div className="blackline-section__header">
          <h2 id="activity-title">Activity</h2>
        </div>
        <ActivityTimeline events={activityEvents.slice(0, 3)} />
      </section>

      <DeployDialog open={deployOpen} onOpenChange={setDeployOpen} onDeploy={deploy} />
    </>
  )
}
