import { describe, expect, it } from "vitest";
import {
  buildMigrationInstruction,
  buildPreviewPath,
  buildTemplatePath,
  catalogEntries,
  getCatalogEntryByRoute,
  selectCatalogEntries
} from "./index";

describe("catalog selection", () => {
  it("filters by category and sorts without mutating the source", () => {
    const result = selectCatalogEntries(catalogEntries, { category: "components", sort: "name" });

    expect(result.map((entry) => entry.slug)).toEqual(["quiet-grid", "signal-canvas"]);
    expect(catalogEntries[0]?.slug).toBe("quiet-grid");
  });

  it("matches the fixed version route", () => {
    const entry = getCatalogEntryByRoute({
      platform: "web",
      framework: "react",
      library: "heroui",
      slug: "quiet-grid",
      version: "1.0.0"
    });

    expect(entry?.templateId).toBe("web/react/heroui/quiet-grid");
    expect(buildTemplatePath(entry!, true)).toBe("/templates/web/react/heroui/quiet-grid/1.0.0");
  });

  it("pins the selected showcase to the fixed preview route", () => {
    const entry = catalogEntries[0]!;

    expect(buildPreviewPath(entry, "publication")).toBe("/preview/web/react/heroui/quiet-grid/1.0.0/publication");
  });
});

describe("migration instruction", () => {
  it("pins the artifact identity and target directory", () => {
    const instruction = buildMigrationInstruction(catalogEntries[0]!, "zh", "做一个项目管理页面");

    expect(instruction).toContain("web/react/heroui/quiet-grid");
    expect(instruction).toContain("1.0.0");
    expect(instruction).toContain(".uidevtpl/web/react/heroui/quiet-grid");
    expect(instruction).toContain("做一个项目管理页面");
  });
});
