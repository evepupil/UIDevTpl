import { buildPreviewPath, buildTemplatePath, type CatalogEntry } from "@uidevtpl/catalog";

export function templateHref(entry: CatalogEntry, fixedVersion = false): string {
  return buildTemplatePath(entry, fixedVersion);
}

export function previewHref(entry: CatalogEntry, showcaseId?: string): string {
  const origin = process.env.NEXT_PUBLIC_PREVIEW_ORIGIN ?? "http://localhost:5173";
  return `${origin}${buildPreviewPath(entry, showcaseId)}`;
}
