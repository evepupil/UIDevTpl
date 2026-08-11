import Ajv2020, { type ErrorObject } from "ajv/dist/2020.js";

export const TEMPLATE_MANIFEST_SCHEMA_VERSION = 1 as const;
export const templateIdPattern = "^[a-z0-9-]+/[a-z0-9-]+/[a-z0-9-]+/[a-z0-9-]+$";

export type TemplateAvailability = "draft" | "review" | "published" | "withdrawn";

export interface TemplateManifest {
  schemaVersion: typeof TEMPLATE_MANIFEST_SCHEMA_VERSION;
  id: string;
  version: string;
  family: {
    id: string;
    version: string;
  };
  platform: "web";
  framework: {
    id: string;
    range: string;
  };
  componentLibrary: {
    id: string;
    range: string;
  };
  runtime: "browser";
  compatibility: {
    node: string;
    react: string;
    typescript: string;
    buildTools: string[];
  };
  target?: {
    library: {
      delivery: "source" | "registry";
      cliVersion: string;
      registrySchema: string;
    };
    style: string;
    primitive: string;
    iconLibrary: string;
  };
  sourceDirectory: string;
  artifact: {
    file: string;
    sha256: string;
  };
  availability: TemplateAvailability;
}

export interface CatalogEntry {
  id: string;
  templateId: string;
  templateVersion: string;
  showcaseId: string;
  categories: string[];
  visibility: "public" | "unlisted" | "private";
  moderationStatus: "pending" | "approved" | "rejected" | "withdrawn";
}

export interface PublishRecord {
  templateId: string;
  version: string;
  availability: TemplateAvailability;
  artifactUrl: string;
  sha256: string;
  publishedAt?: string;
}

export interface MigrationRecord {
  schemaVersion: 1;
  template: {
    id: string;
    version: string;
    family: string;
  };
  files: Array<{
    source: string;
    target: string;
    sourceSha256: string;
    status: "migrated" | "skipped" | "conflict";
  }>;
  dependencyChanges: string[];
  configurationChanges: string[];
  migratedAt: string;
}

export const templateManifestSchema = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://uidevtpl.com/schemas/template-manifest.schema.json",
  type: "object",
  additionalProperties: false,
  required: [
    "schemaVersion",
    "id",
    "version",
    "family",
    "platform",
    "framework",
    "componentLibrary",
    "runtime",
    "compatibility",
    "sourceDirectory",
    "artifact",
    "availability"
  ],
  properties: {
    schemaVersion: { type: "integer", const: TEMPLATE_MANIFEST_SCHEMA_VERSION },
    id: { type: "string", pattern: templateIdPattern },
    version: { type: "string", pattern: "^\\d+\\.\\d+\\.\\d+$" },
    family: {
      type: "object",
      additionalProperties: false,
      required: ["id", "version"],
      properties: {
        id: { type: "string", minLength: 1 },
        version: { type: "string", pattern: "^\\d+\\.\\d+\\.\\d+$" }
      }
    },
    platform: { type: "string", const: "web" },
    framework: {
      type: "object",
      additionalProperties: false,
      required: ["id", "range"],
      properties: {
        id: { type: "string", minLength: 1 },
        range: { type: "string", minLength: 1 }
      }
    },
    componentLibrary: {
      type: "object",
      additionalProperties: false,
      required: ["id", "range"],
      properties: {
        id: { type: "string", minLength: 1 },
        range: { type: "string", minLength: 1 }
      }
    },
    runtime: { type: "string", const: "browser" },
    compatibility: {
      type: "object",
      additionalProperties: false,
      required: ["node", "react", "typescript", "buildTools"],
      properties: {
        node: { type: "string", minLength: 1 },
        react: { type: "string", minLength: 1 },
        typescript: { type: "string", minLength: 1 },
        buildTools: { type: "array", minItems: 1, items: { type: "string", minLength: 1 } }
      }
    },
    target: {
      type: "object",
      additionalProperties: false,
      required: ["library", "style", "primitive", "iconLibrary"],
      properties: {
        library: {
          type: "object",
          additionalProperties: false,
          required: ["delivery", "cliVersion", "registrySchema"],
          properties: {
            delivery: { type: "string", enum: ["source", "registry"] },
            cliVersion: { type: "string", minLength: 1 },
            registrySchema: { type: "string", minLength: 1 }
          }
        },
        style: { type: "string", minLength: 1 },
        primitive: { type: "string", minLength: 1 },
        iconLibrary: { type: "string", minLength: 1 }
      }
    },
    sourceDirectory: { type: "string", minLength: 1 },
    artifact: {
      type: "object",
      additionalProperties: false,
      required: ["file", "sha256"],
      properties: {
        file: { type: "string", minLength: 1 },
        sha256: { type: "string", pattern: "^[a-f0-9]{64}$" }
      }
    },
    availability: { type: "string", enum: ["draft", "review", "published", "withdrawn"] }
  }
} as const;

const validator = new Ajv2020({ allErrors: true, strict: true }).compile<TemplateManifest>(templateManifestSchema);

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

function formatError(error: ErrorObject): string {
  return `${error.instancePath || "/"} ${error.message ?? "is invalid"}`;
}

export function validateTemplateManifest(value: unknown): ValidationResult {
  const valid = validator(value);
  return {
    valid,
    errors: valid ? [] : (validator.errors ?? []).map(formatError)
  };
}

export function isTemplateManifest(value: unknown): value is TemplateManifest {
  return validateTemplateManifest(value).valid;
}
