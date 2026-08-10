import { quietGridFamily } from "@uidevtpl/design-families";
import type { TemplateManifest } from "@uidevtpl/schema";

export const quietGridManifest = {
  schemaVersion: 1,
  id: "web/react/heroui/quiet-grid",
  version: "1.0.0",
  family: { id: quietGridFamily.id, version: quietGridFamily.version },
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
} as const satisfies TemplateManifest;

export { quietGridFamily };
export type { TemplateManifest } from "@uidevtpl/schema";
