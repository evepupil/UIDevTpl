import { describe, expect, it } from "vitest"

import { pageFromHash, pageHash, sidebarPage } from "./navigation"

describe("Blackline page navigation", () => {
  it("normalizes supported hash routes", () => {
    expect(pageFromHash("#/deployments/dep-8f31c2a")).toBe("deployments")
    expect(pageFromHash("#models")).toBe("models")
    expect(pageFromHash("#unknown")).toBeUndefined()
  })

  it("creates hash routes and keeps detail pages under deployments", () => {
    expect(pageHash("settings")).toBe("#settings")
    expect(sidebarPage("deployment-detail")).toBe("deployments")
    expect(sidebarPage("overview")).toBe("overview")
  })
})
