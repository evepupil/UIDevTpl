import { describe, expect, it } from "vitest";
import { validateTemplateManifest, type TemplateManifest } from "./index";

const manifest = {
  schemaVersion: 1,
  id: "web/react/heroui/quiet-grid",
  version: "1.0.0",
  family: { id: "quiet-grid", version: "1.0.0" },
  platform: "web",
  framework: { id: "react", range: "19.x" },
  componentLibrary: { id: "heroui", range: "3.x" },
  runtime: "browser",
  compatibility: {
    node: "24.x",
    react: "19.x",
    typescript: "7.x",
    buildTools: ["Vite 8.x", "Next.js 16.x"]
  },
  sourceDirectory: ".uidevtpl/web/react/heroui/quiet-grid",
  artifact: {
    file: "uidevtpl-web-react-heroui-quiet-grid-1.0.0.zip",
    sha256: "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
  },
  availability: "draft"
} satisfies TemplateManifest;

describe("template manifest schema", () => {
  it("accepts the initial quiet-grid shape", () => {
    expect(validateTemplateManifest(manifest)).toEqual({ valid: true, errors: [] });
  });

  it("rejects an invalid template id and checksum", () => {
    const result = validateTemplateManifest({ ...manifest, id: "quiet-grid", artifact: { ...manifest.artifact, sha256: "short" } });

    expect(result.valid).toBe(false);
    expect(result.errors.join(" ")).toContain("must match pattern");
  });
});
