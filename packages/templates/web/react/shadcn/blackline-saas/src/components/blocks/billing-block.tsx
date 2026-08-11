import { Download, MoreHorizontal } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

import { invoices, type Invoice } from "../../lib/platform-data"
import { PageHeader, ResourceTable, StatusBadge, SummaryStrip, type ResourceColumn } from "../patterns"

export function BillingBlock({ onStatus }: { onStatus?: (message: string) => void }) {
  const columns: readonly ResourceColumn<Invoice>[] = [
    { id: "invoice", header: "Invoice", render: (invoice) => <code>{invoice.id}</code> },
    {
      id: "date",
      header: "Date",
      render: (invoice) => <span>{invoice.date}</span>,
    },
    { id: "status", header: "Status", render: (invoice) => <StatusBadge status={invoice.status} /> },
    { id: "amount", header: "Amount", className: "blackline-table__amount", render: (invoice) => <strong>{invoice.amount}</strong> },
    {
      id: "method",
      header: "Payment method",
      render: (invoice) => (
        <div className="blackline-customer">
          <Avatar size="sm"><AvatarFallback>V</AvatarFallback></Avatar>
          <span>{invoice.method}</span>
        </div>
      ),
    },
    {
      id: "actions",
      header: <span className="sr-only">Actions</span>,
      className: "blackline-table__actions",
      render: (invoice) => (
        <Button variant="ghost" size="icon-sm" aria-label={`More actions for ${invoice.id}`} onClick={() => onStatus?.(`Actions for ${invoice.id}`)}>
          <MoreHorizontal aria-hidden="true" />
        </Button>
      ),
    },
  ]

  return (
    <>
      <PageHeader
        title="Billing"
        actions={
          <Button variant="outline" onClick={() => onStatus?.("Invoice export started")}>
            <Download aria-hidden="true" />
            Export
          </Button>
        }
      />
      <SummaryStrip
        items={[
          { label: "Current plan", value: "Pro", detail: "$99 / month" },
          { label: "Next invoice", value: "Aug 31", detail: "$99 due" },
          { label: "Payment method", value: "Visa", detail: "Ending 4242" },
        ]}
      />
      <section className="blackline-section blackline-section--table" aria-labelledby="invoices-title">
        <div className="blackline-section__header">
          <h2 id="invoices-title">Invoices</h2>
          <span className="blackline-muted">{invoices.length} records</span>
        </div>
        <ResourceTable rows={invoices} columns={columns} />
      </section>
    </>
  )
}
