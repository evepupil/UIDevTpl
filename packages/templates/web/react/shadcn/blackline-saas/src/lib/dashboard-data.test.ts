import { describe, expect, it } from "vitest"

import { activityRows, filterActivityRows, sumRevenue } from "./dashboard-data"

describe("Blackline dashboard data", () => {
  it("returns every row for an empty query", () => {
    expect(filterActivityRows(activityRows, "")).toHaveLength(activityRows.length)
  })

  it("matches customers, plans, and statuses", () => {
    expect(filterActivityRows(activityRows, "enterprise").map((row) => row.customer)).toEqual(["Acme Inc.", "Vercel Labs"])
    expect(filterActivityRows(activityRows, "past due").map((row) => row.customer)).toEqual(["Arc Studio"])
  })

  it("sums the visible activity amounts", () => {
    expect(sumRevenue(activityRows)).toBe(63160)
  })
})
