import type { PlatformPage } from "./platform-data"

export function pageFromHash(hash: string): PlatformPage | undefined {
  const value = hash.replace(/^#\/?/, "").split("/")[0]
  if (!value) return undefined

  const pages: PlatformPage[] = [
    "overview",
    "deployments",
    "deployment-detail",
    "models",
    "billing",
    "settings",
  ]
  return pages.includes(value as PlatformPage) ? (value as PlatformPage) : undefined
}

export function pageHash(page: PlatformPage): string {
  return `#${page}`
}

export function sidebarPage(page: PlatformPage): PlatformPage {
  return page === "deployment-detail" ? "deployments" : page
}
