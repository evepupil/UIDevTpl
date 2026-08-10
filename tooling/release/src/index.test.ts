import { describe, expect, it } from "vitest";
import { buildReleaseArtifactPaths } from "./index";

describe("release artifact paths", () => {
  it("keeps artifacts under the immutable template version", () => {
    expect(buildReleaseArtifactPaths({
      id: "web/react/heroui/quiet-grid",
      version: "1.0.0",
      artifact: { file: "template.zip", sha256: "ignored-by-path-builder" }
    })).toEqual({
      templateZip: "artifacts/web/react/heroui/quiet-grid/1.0.0/template.zip",
      previewArchive: "artifacts/web/react/heroui/quiet-grid/1.0.0/preview.zip",
      checksums: "artifacts/web/react/heroui/quiet-grid/1.0.0/checksums.json"
    });
  });
});
