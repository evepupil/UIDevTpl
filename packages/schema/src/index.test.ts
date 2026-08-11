import { describe, expect, it } from "vitest";
import { validateTemplateManifest, type TemplateManifest } from "./index";

const manifest = {
  schemaVersion: 1,
  id: "web/react/shadcn/blackline-saas",
  version: "1.0.0",
  family: { id: "blackline-saas", version: "1.0.0" },
  platform: "web",
  framework: { id: "react", range: "19.x" },
  componentLibrary: { id: "shadcn", range: "4.x" },
  runtime: "browser",
  compatibility: {
    node: "24.x",
    react: "19.x",
    typescript: "7.x",
    buildTools: ["Vite 8.x", "Next.js 16.x"]
  },
  target: {
    library: { delivery: "source", cliVersion: "4.16.2", registrySchema: "new-york-v4" },
    style: "base-nova",
    primitive: "base-ui",
    iconLibrary: "lucide"
  },
  sourceDirectory: ".uidevtpl/web/react/shadcn/blackline-saas",
  artifact: {
    file: "uidevtpl-web-react-shadcn-blackline-saas-1.0.0.zip",
    sha256: "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
  },
  availability: "draft"
} satisfies TemplateManifest;

describe("template manifest schema", () => {
  it("accepts the Blackline SaaS shape", () => {
    expect(validateTemplateManifest(manifest)).toEqual({ valid: true, errors: [] });
  });

  it("accepts shadcn implementation metadata", () => {
    expect(validateTemplateManifest({ ...manifest, id: "web/react/shadcn/blackline-saas" })).toEqual({ valid: true, errors: [] });
  });

  it("rejects an invalid template id and checksum", () => {
    const result = validateTemplateManifest({ ...manifest, id: "blackline-saas", artifact: { ...manifest.artifact, sha256: "short" } });

    expect(result.valid).toBe(false);
    expect(result.errors.join(" ")).toContain("must match pattern");
  });
});
