import * as React from "react"
import {
  ArrowUpRight,
  BarChart3,
  Check,
  CircleAlert,
  Clock3,
  CreditCard,
  Download,
  MoreHorizontal,
  Plus,
  Search,
  TrendingUp,
  Users,
} from "lucide-react"

import { AppSidebar } from "@/components/app-sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { TooltipProvider } from "@/components/ui/tooltip"
import {
  activityRows,
  filterActivityRows,
  formatCurrency,
  revenueRanges,
  revenueSeries,
  sumRevenue,
  type ActivityRow,
  type ActivityStatus,
  type RevenueRange,
} from "./lib/dashboard-data"

const metrics = [
  {
    label: "Total revenue",
    value: "$128,430",
    change: "+12.4%",
    icon: TrendingUp,
  },
  { label: "Active customers", value: "2,431", change: "+8.2%", icon: Users },
  { label: "Net revenue", value: "$92,840", change: "+5.7%", icon: CreditCard },
  { label: "Conversion rate", value: "6.8%", change: "+1.2%", icon: BarChart3 },
] as const

const planMix = [
  { label: "Enterprise", value: 48, amount: "$61.6k" },
  { label: "Pro", value: 32, amount: "$41.1k" },
  { label: "Team", value: 20, amount: "$25.7k" },
] as const

const statusClass: Record<ActivityStatus | "Open", string> = {
  Paid: "blackline-status--paid",
  Trial: "blackline-status--trial",
  Open: "blackline-status--trial",
  "Past due": "blackline-status--past-due",
}

function getInitials(value: string): string {
  return value
    .split(/\s+/)
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

function downloadCsv(rows: readonly ActivityRow[]) {
  const header = "Customer,Plan,Status,Amount"
  const content = rows
    .map((row) => `${row.customer},${row.plan},${row.status},${row.amount}`)
    .join("\n")
  const blob = new Blob([`${header}\n${content}`], {
    type: "text/csv;charset=utf-8",
  })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = "blackline-activity.csv"
  anchor.click()
  URL.revokeObjectURL(url)
}

function downloadInvoices() {
  const content = [
    "Invoice,Customer,Date,Status,Amount",
    "INV-1048,Acme Inc.,2026-08-11,Paid,$12,800",
    "INV-1047,Lattice,2026-08-08,Open,$4,200",
    "INV-1046,Northstar,2026-08-05,Paid,$8,450",
  ].join("\n")
  const url = URL.createObjectURL(
    new Blob([content], { type: "text/csv;charset=utf-8" })
  )
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = "blackline-invoices.csv"
  anchor.click()
  URL.revokeObjectURL(url)
}

function CreateProjectDialog({
  open,
  onOpenChange,
  onCreate,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreate: (name: string) => void
}) {
  const [name, setName] = React.useState("")

  React.useEffect(() => {
    if (open) setName("")
  }, [open])

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = name.trim()
    if (trimmed) onCreate(trimmed)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="blackline-dialog">
        <DialogHeader className="blackline-dialog__header">
          <DialogTitle>New project</DialogTitle>
        </DialogHeader>
        <form onSubmit={submit}>
          <div className="blackline-field">
            <Label htmlFor="project-name">Project name</Label>
            <Input
              id="project-name"
              autoFocus
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Growth dashboard"
            />
          </div>
          <DialogFooter className="blackline-dialog__actions">
            <DialogClose render={<Button variant="outline" type="button" />}>
              Cancel
            </DialogClose>
            <Button type="submit">
              <Plus aria-hidden="true" />
              Create project
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function MetricGrid() {
  return (
    <div className="blackline-metrics" aria-label="Key metrics">
      {metrics.map((metric) => {
        const Icon = metric.icon
        return (
          <Card className="blackline-metric" size="sm" key={metric.label}>
            <CardContent className="blackline-metric__content">
              <div className="blackline-metric__topline">
                <span>{metric.label}</span>
                <Icon aria-hidden="true" />
              </div>
              <strong>{metric.value}</strong>
              <span className="blackline-change">
                <ArrowUpRight aria-hidden="true" />
                {metric.change}
              </span>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

function RevenueSection({
  range,
  onRangeChange,
}: {
  range: RevenueRange
  onRangeChange: (range: RevenueRange) => void
}) {
  const values = revenueSeries[range]
  const rangeLabel =
    revenueRanges.find((option) => option.value === range)?.label ?? range
  return (
    <section className="blackline-section" aria-labelledby="revenue-title">
      <div className="blackline-section__header">
        <h2 id="revenue-title">Revenue</h2>
        <Select
          value={range}
          onValueChange={(value) =>
            value && onRangeChange(value as RevenueRange)
          }
        >
          <SelectTrigger
            size="sm"
            className="blackline-select"
            aria-label="Date range"
          >
            <SelectValue>{rangeLabel}</SelectValue>
          </SelectTrigger>
          <SelectContent align="end">
            {revenueRanges.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="blackline-chart" aria-label="Revenue trend">
        {values.map((value, index) => (
          <div className="blackline-chart__column" key={`${range}-${index}`}>
            <div
              className="blackline-chart__bar"
              style={{ height: `${value}%` }}
            />
            <span>{index + 1}</span>
          </div>
        ))}
      </div>
      <div className="blackline-chart__legend">
        <span>Jan 01</span>
        <span>Today</span>
      </div>
    </section>
  )
}

function PlanMixSection() {
  return (
    <section className="blackline-section" aria-labelledby="plan-mix-title">
      <div className="blackline-section__header">
        <h2 id="plan-mix-title">Plan mix</h2>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="More plan mix options"
        >
          <MoreHorizontal aria-hidden="true" />
        </Button>
      </div>
      <div className="blackline-plan-list">
        {planMix.map((plan) => (
          <div className="blackline-plan" key={plan.label}>
            <div className="blackline-plan__topline">
              <span>{plan.label}</span>
              <strong>{plan.amount}</strong>
            </div>
            <Progress
              value={plan.value}
              className="blackline-plan__progress"
              aria-label={`${plan.label} ${plan.value}%`}
            />
          </div>
        ))}
      </div>
      <div className="blackline-plan-total">
        <span>Monthly recurring revenue</span>
        <strong>{formatCurrency(sumRevenue(activityRows))}</strong>
      </div>
    </section>
  )
}

function ActivityTable({ rows }: { rows: readonly ActivityRow[] }) {
  return (
    <section className="blackline-section" aria-labelledby="activity-title">
      <div className="blackline-section__header">
        <h2 id="activity-title">Recent activity</h2>
        <Button variant="ghost" size="sm">
          <span>View all</span>
          <ArrowUpRight aria-hidden="true" />
        </Button>
      </div>
      <div className="blackline-table-wrap">
        <Table className="blackline-table">
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="blackline-table__amount">Amount</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <div className="blackline-customer">
                    <Avatar size="sm">
                      <AvatarFallback>{row.initials}</AvatarFallback>
                    </Avatar>
                    <span>{row.customer}</span>
                  </div>
                </TableCell>
                <TableCell>{row.plan}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`blackline-status ${statusClass[row.status]}`}
                  >
                    <span aria-hidden="true" />
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell className="blackline-table__amount">
                  {formatCurrency(row.amount)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label={`More actions for ${row.customer}`}
                  >
                    <MoreHorizontal aria-hidden="true" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {rows.length === 0 && (
          <div className="blackline-empty">
            <Search aria-hidden="true" />
            <span>No matching activity</span>
          </div>
        )}
      </div>
    </section>
  )
}

export function BlacklineSaasShowcase() {
  const [range, setRange] = React.useState<RevenueRange>("30d")
  const [query, setQuery] = React.useState("")
  const [rows, setRows] = React.useState<readonly ActivityRow[]>(activityRows)
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [notice, setNotice] = React.useState<string | null>(null)
  const filteredRows = React.useMemo(
    () => filterActivityRows(rows, query),
    [query, rows]
  )

  React.useEffect(() => {
    if (!notice) return undefined
    const timeout = window.setTimeout(() => setNotice(null), 3000)
    return () => window.clearTimeout(timeout)
  }, [notice])

  function createProject(name: string) {
    setRows((currentRows) => [
      {
        id: `project-${Date.now()}`,
        customer: name,
        initials: getInitials(name),
        plan: "Pro",
        status: "Trial",
        amount: 0,
      },
      ...currentRows,
    ])
    setDialogOpen(false)
    setNotice("Project created")
  }

  return (
    <TooltipProvider>
      <SidebarProvider className="blackline-root">
        <AppSidebar />
        <SidebarInset className="blackline-main">
          <header className="blackline-header">
            <div className="blackline-header__left">
              <SidebarTrigger aria-label="Toggle navigation" />
              <Separator
                orientation="vertical"
                className="blackline-header__separator"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Workspace</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Overview</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="blackline-header__actions">
              <Button
                variant="outline"
                size="sm"
                onClick={() => downloadCsv(filteredRows)}
              >
                <Download aria-hidden="true" />
                Export
              </Button>
              <Button size="sm" onClick={() => setDialogOpen(true)}>
                <Plus aria-hidden="true" />
                New project
              </Button>
            </div>
          </header>
          <main className="blackline-content">
            <div className="blackline-title-row">
              <h1>Overview</h1>
            </div>
            <MetricGrid />
            <div className="blackline-analytics">
              <RevenueSection range={range} onRangeChange={setRange} />
              <PlanMixSection />
            </div>
            <div className="blackline-table-toolbar">
              <div className="blackline-search">
                <Search aria-hidden="true" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search activity"
                  aria-label="Search activity"
                />
              </div>
              <span className="blackline-result-count">
                {filteredRows.length} records
              </span>
            </div>
            <ActivityTable rows={filteredRows} />
          </main>
        </SidebarInset>
        {notice && (
          <div className="blackline-notice" role="status">
            <Check aria-hidden="true" />
            {notice}
          </div>
        )}
        <CreateProjectDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onCreate={createProject}
        />
      </SidebarProvider>
    </TooltipProvider>
  )
}

export function BlacklineBillingShowcase() {
  const invoices = [
    {
      id: "INV-1048",
      customer: "Acme Inc.",
      date: "Aug 11, 2026",
      status: "Paid",
      amount: "$12,800",
    },
    {
      id: "INV-1047",
      customer: "Lattice",
      date: "Aug 08, 2026",
      status: "Open",
      amount: "$4,200",
    },
    {
      id: "INV-1046",
      customer: "Northstar",
      date: "Aug 05, 2026",
      status: "Paid",
      amount: "$8,450",
    },
    {
      id: "INV-1045",
      customer: "Vercel Labs",
      date: "Aug 01, 2026",
      status: "Paid",
      amount: "$28,600",
    },
  ] as const

  return (
    <TooltipProvider>
      <SidebarProvider className="blackline-root">
        <AppSidebar />
        <SidebarInset className="blackline-main">
          <header className="blackline-header">
            <div className="blackline-header__left">
              <SidebarTrigger aria-label="Toggle navigation" />
              <Separator
                orientation="vertical"
                className="blackline-header__separator"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Workspace</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Billing</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <Button variant="outline" size="sm" onClick={downloadInvoices}>
              <Download aria-hidden="true" />
              Export
            </Button>
          </header>
          <main className="blackline-content">
            <div className="blackline-title-row">
              <h1>Billing</h1>
              <span className="blackline-title-meta">
                <CreditCard aria-hidden="true" />
                Pro plan
              </span>
            </div>
            <div className="blackline-invoice-summary">
              <Card className="blackline-metric" size="sm">
                <CardContent className="blackline-metric__content">
                  <span className="blackline-invoice-label">Current plan</span>
                  <strong>Pro</strong>
                  <span className="blackline-invoice-meta">$99 / month</span>
                </CardContent>
              </Card>
              <Card className="blackline-metric" size="sm">
                <CardContent className="blackline-metric__content">
                  <span className="blackline-invoice-label">Next invoice</span>
                  <strong>Aug 31</strong>
                  <span className="blackline-invoice-meta">$99 due</span>
                </CardContent>
              </Card>
              <Card className="blackline-metric" size="sm">
                <CardContent className="blackline-metric__content">
                  <span className="blackline-invoice-label">
                    Payment method
                  </span>
                  <strong>•••• 4242</strong>
                  <span className="blackline-invoice-meta">Visa</span>
                </CardContent>
              </Card>
            </div>
            <section
              className="blackline-section"
              aria-labelledby="invoices-title"
            >
              <div className="blackline-section__header">
                <h2 id="invoices-title">Invoices</h2>
                <span className="blackline-result-count">
                  {invoices.length} records
                </span>
              </div>
              <div className="blackline-table-wrap">
                <Table className="blackline-table blackline-invoice-table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="blackline-table__amount">
                        Amount
                      </TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoices.map((invoice) => (
                      <TableRow key={invoice.id}>
                        <TableCell>{invoice.id}</TableCell>
                        <TableCell>
                          <div className="blackline-customer">
                            <Avatar size="sm">
                              <AvatarFallback>
                                {getInitials(invoice.customer)}
                              </AvatarFallback>
                            </Avatar>
                            <span>{invoice.customer}</span>
                          </div>
                        </TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`blackline-status ${statusClass[invoice.status]}`}
                          >
                            <span aria-hidden="true" />
                            {invoice.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="blackline-table__amount">
                          {invoice.amount}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label={`More actions for ${invoice.id}`}
                          >
                            <MoreHorizontal aria-hidden="true" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </section>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}

export function BlacklineComponentLab() {
  const [selected, setSelected] = React.useState("Default")
  const [loading, setLoading] = React.useState(false)

  return (
    <TooltipProvider>
      <main className="blackline-lab">
        <header className="blackline-lab__header">
          <h1>Component lab</h1>
        </header>
        <section
          className="blackline-lab__section"
          aria-labelledby="lab-actions-title"
        >
          <h2 id="lab-actions-title">Actions</h2>
          <div className="blackline-lab__row">
            <Button>
              <Plus aria-hidden="true" />
              New project
            </Button>
            <Button variant="outline">
              <Download aria-hidden="true" />
              Export
            </Button>
            <Button variant="ghost" size="icon" aria-label="More actions">
              <MoreHorizontal aria-hidden="true" />
            </Button>
            <Button disabled>
              <Clock3 aria-hidden="true" />
              Loading
            </Button>
          </div>
        </section>
        <section
          className="blackline-lab__section"
          aria-labelledby="lab-states-title"
        >
          <h2 id="lab-states-title">States</h2>
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
            {selected === "Loading" && (
              <div className="blackline-lab__skeleton">
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </div>
            )}
            {selected === "Empty" && (
              <div className="blackline-empty">
                <CircleAlert aria-hidden="true" />
                <span>No records</span>
              </div>
            )}
            {selected === "Default" && (
              <div className="blackline-lab__form">
                <Input
                  placeholder="Search customers"
                  aria-label="Search customers"
                />
                <Button onClick={() => setLoading((current) => !current)}>
                  {loading ? "Ready" : "Check"}
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
    </TooltipProvider>
  )
}
