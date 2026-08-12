import { Download, MoreHorizontal } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardHeader, CardTitle } from "@/components/ui/card"

import { invoices, type Invoice } from "../../lib/platform-data"
import {
  PageHeader,
  ResourceTable,
  StatusBadge,
  SummaryStrip,
  type ResourceColumn,
} from "../patterns"

export function BillingBlock({
  onStatus,
}: {
  onStatus?: (message: string) => void
}) {
  const columns: readonly ResourceColumn<Invoice>[] = [
    {
      id: "invoice",
      header: "Invoice",
      render: (invoice) => <code>{invoice.id}</code>,
    },
    {
      id: "date",
      header: "Date",
      render: (invoice) => <span>{invoice.date}</span>,
    },
    {
      id: "status",
      header: "Status",
      render: (invoice) => <StatusBadge status={invoice.status} />,
    },
    {
      id: "amount",
      header: "Amount",
      className: "text-right",
      render: (invoice) => <strong>{invoice.amount}</strong>,
    },
    {
      id: "method",
      header: "Payment method",
      render: (invoice) => (
        <div className="blackline-customer">
          <Avatar size="sm">
            <AvatarFallback>V</AvatarFallback>
          </Avatar>
          <span>{invoice.method}</span>
        </div>
      ),
    },
    {
      id: "actions",
      header: <span className="sr-only">Actions</span>,
      className: "w-px text-right",
      render: (invoice) => (
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={`More actions for ${invoice.id}`}
          onClick={() => onStatus?.(`Actions for ${invoice.id}`)}
        >
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
          <Button
            variant="outline"
            onClick={() => onStatus?.("Invoice export started")}
          >
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
      <Card className="gap-0" role="region" aria-labelledby="invoices-title">
        <CardHeader>
          <CardTitle id="invoices-title">Invoices</CardTitle>
          <CardAction>
            <span className="blackline-muted">{invoices.length} records</span>
          </CardAction>
        </CardHeader>
        <ResourceTable rows={invoices} columns={columns} />
      </Card>
    </>
  )
}
