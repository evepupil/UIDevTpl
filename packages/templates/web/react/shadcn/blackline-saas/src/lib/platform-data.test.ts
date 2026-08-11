import { describe, expect, it } from "vitest"

import { deployments, filterByQuery, filterDeployments, filterModels, models } from "./platform-data"

describe("Blackline platform data", () => {
  it("returns a copy when a query is empty and matches fields case-insensitively", () => {
    const all = filterByQuery(models, "", ["name"])

    expect(all).toEqual(models)
    expect(all).not.toBe(models)
    expect(filterByQuery(models, "NORTHSTAR", ["name"]).map((model) => model.id)).toEqual(["model-northstar-embed"])
  })

  it("filters deployments by environment, status, and searchable fields", () => {
    expect(filterDeployments(deployments, "command menu", "Preview", "all").map((deployment) => deployment.id)).toEqual([
      "dep-21a0e4c",
    ])
    expect(filterDeployments(deployments, "", "Preview", "Building").map((deployment) => deployment.id)).toEqual([
      "dep-7b6d110",
    ])
  })

  it("filters models by status and provider or name", () => {
    expect(filterModels(models, "atlas", "Ready").map((model) => model.id)).toEqual(["model-atlas-chat"])
    expect(filterModels(models, "", "Paused").map((model) => model.id)).toEqual(["model-rerank"])
  })
})
