import { notFound } from "next/navigation";
import { catalogEntries, getCatalogEntryByRoute } from "@uidevtpl/catalog";
import { TemplateDetail } from "../../../../../../../components/template-detail";
import { getSiteLocale } from "../../../../../../../lib/locale";

export function generateStaticParams() {
  return catalogEntries.map((entry) => ({
    platform: entry.platform,
    framework: entry.framework.id,
    library: entry.library.id,
    slug: entry.slug,
    version: entry.version
  }));
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function FixedTemplatePage({ params, searchParams }: { params: Promise<{ platform: string; framework: string; library: string; slug: string; version: string }>; searchParams: SearchParams }) {
  const route = await params;
  const entry = getCatalogEntryByRoute(route);
  if (!entry) notFound();
  const query = await searchParams;
  return <TemplateDetail entry={entry} locale={await getSiteLocale()} fixedVersion showcaseId={first(query.showcase)} />;
}
