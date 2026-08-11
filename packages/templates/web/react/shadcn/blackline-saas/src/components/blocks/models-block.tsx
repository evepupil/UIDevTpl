import * as React from "react"

import { ArrowUpRight, Bot, MoreHorizontal, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"

import { filterModels, models, type ModelResource, type ModelStatus } from "../../lib/platform-data"
import { FilterBar, PageHeader, ResourceTable, StatusBadge, SummaryStrip, type ResourceColumn } from "../patterns"

export function ModelsBlock({ onStatus }: { onStatus?: (message: string) => void }) {
  const [query, setQuery] = React.useState("")
  const [status, setStatus] = React.useState<"all" | ModelStatus>("all")
  const rows = filterModels(models, query, status)

  const columns: readonly ResourceColumn<ModelResource>[] = [
    {
      id: "name",
      header: "Model",
      render: (model) => (
        <div className="blackline-resource-name">
          <div className="blackline-resource-name__icon"><Bot aria-hidden="true" /></div>
          <div>
            <strong>{model.name}</strong>
            <span>{model.provider}</span>
          </div>
        </div>
      ),
    },
    { id: "version", header: "Version", render: (model) => <code>{model.version}</code> },
    { id: "status", header: "Status", render: (model) => <StatusBadge status={model.status} /> },
    { id: "requests", header: "Requests", render: (model) => <span>{model.requests}</span> },
    { id: "updated", header: "Updated", render: (model) => <span className="blackline-muted">{model.updatedAt}</span> },
    {
      id: "actions",
      header: <span className="sr-only">Actions</span>,
      className: "blackline-table__actions",
      render: (model) => (
        <div className="blackline-row-actions">
          <Button variant="ghost" size="sm" onClick={() => onStatus?.(`${model.name} opened`)}>
            View
            <ArrowUpRight aria-hidden="true" />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label={`More actions for ${model.name}`} onClick={() => onStatus?.(`Actions for ${model.name}`)}>
            <MoreHorizontal aria-hidden="true" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <>
      <PageHeader
        title="Models"
        actions={
          <Button onClick={() => onStatus?.("New model dialog opened")}>
            <Plus aria-hidden="true" />
            New model
          </Button>
        }
      />
      <SummaryStrip
        items={[
          { label: "Models", value: "12", detail: "4 active" },
          { label: "Requests", value: "3.5M", detail: "Last 30 days" },
          { label: "Latency", value: "184ms", detail: "p95" },
          { label: "Availability", value: "99.99%", detail: "This month" },
        ]}
      />
      <FilterBar
        query={query}
        onQueryChange={setQuery}
        queryLabel="Search models"
        filters={[
          {
            label: "Status",
            value: status,
            onChange: (value) => setStatus(value as "all" | ModelStatus),
            options: [
              { value: "all", label: "All statuses" },
              { value: "Ready", label: "Ready" },
              { value: "Building", label: "Building" },
              { value: "Paused", label: "Paused" },
            ],
          },
        ]}
      />
      <div className="blackline-result-line">
        <span>{rows.length} models</span>
        <span className="blackline-muted">Atlas workspace</span>
      </div>
      <section className="blackline-section blackline-section--table" aria-label="Models list">
        <ResourceTable rows={rows} columns={columns} emptyLabel="No models found" />
      </section>
    </>
  )
}
