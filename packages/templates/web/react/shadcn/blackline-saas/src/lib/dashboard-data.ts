export type RevenueRange = "7d" | "30d" | "90d"

export type ActivityStatus = "Paid" | "Trial" | "Past due"

export interface ActivityRow {
  id: string
  customer: string
  initials: string
  plan: "Pro" | "Team" | "Enterprise"
  status: ActivityStatus
  amount: number
}

export const revenueRanges: ReadonlyArray<{ value: RevenueRange; label: string }> = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
]

export const revenueSeries: Record<RevenueRange, readonly number[]> = {
  "7d": [42, 58, 49, 71, 63, 84, 76],
  "30d": [44, 52, 47, 61, 57, 70, 66, 78, 73, 88, 81, 94],
  "90d": [32, 38, 35, 42, 48, 45, 54, 60, 57, 68, 72, 79],
}

export const activityRows: readonly ActivityRow[] = [
  { id: "acme", customer: "Acme Inc.", initials: "AI", plan: "Enterprise", status: "Paid", amount: 12800 },
  { id: "lattice", customer: "Lattice", initials: "LA", plan: "Team", status: "Trial", amount: 4200 },
  { id: "northstar", customer: "Northstar", initials: "NS", plan: "Pro", status: "Paid", amount: 8450 },
  { id: "vercel-labs", customer: "Vercel Labs", initials: "VL", plan: "Enterprise", status: "Paid", amount: 28600 },
  { id: "arc-studio", customer: "Arc Studio", initials: "AS", plan: "Team", status: "Past due", amount: 2960 },
  { id: "kinetic", customer: "Kinetic", initials: "KI", plan: "Pro", status: "Paid", amount: 6150 },
]

export function filterActivityRows(rows: readonly ActivityRow[], query: string): ActivityRow[] {
  const normalized = query.trim().toLocaleLowerCase()
  if (!normalized) return [...rows]

  return rows.filter((row) =>
    [row.customer, row.plan, row.status].some((value) => value.toLocaleLowerCase().includes(normalized))
  )
}

export function sumRevenue(rows: readonly ActivityRow[]): number {
  return rows.reduce((total, row) => total + row.amount, 0)
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}
