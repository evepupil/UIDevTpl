import type { TemplateManifest } from "@uidevtpl/schema";

export interface ReleaseArtifactPaths {
  templateZip: string;
  previewArchive: string;
  checksums: string;
}

export function buildReleaseArtifactPaths(manifest: Pick<TemplateManifest, "id" | "version" | "artifact">): ReleaseArtifactPaths {
  const prefix = `artifacts/${manifest.id}/${manifest.version}`;

  return {
    templateZip: `${prefix}/${manifest.artifact.file}`,
    previewArchive: `${prefix}/preview.zip`,
    checksums: `${prefix}/checksums.json`
  };
}
