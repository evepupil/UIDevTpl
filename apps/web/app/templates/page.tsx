import Link from "next/link";
import type { CatalogFilters, CatalogSort } from "@uidevtpl/catalog";
import { catalogEntries, selectCatalogEntries } from "@uidevtpl/catalog";
import { CatalogFilters as CatalogFiltersForm } from "../../components/catalog-filters";
import { EmptyState } from "../../components/empty-state";
import { TemplateCard } from "../../components/template-card";
import { getSiteCopy } from "../../lib/copy";
import { getSiteLocale } from "../../lib/locale";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function getSort(value: string | undefined): CatalogSort {
  return value === "newest" || value === "name" ? value : "popular";
}

export default async function TemplatesPage({ searchParams }: { searchParams: SearchParams }) {
  const locale = await getSiteLocale();
  const copy = getSiteCopy(locale);
  const params = await searchParams;
  const filters: CatalogFilters = {
    query: first(params.q),
    category: first(params.category),
    framework: first(params.framework),
    library: first(params.library),
    sort: getSort(first(params.sort))
  };
  const entries = selectCatalogEntries(catalogEntries, filters);

  return (
    <main className="catalog-page">
      <section className="catalog-heading">
        <div><p className="section-eyebrow">UIDevTpl / Catalog</p><h1>{copy.allTemplates}</h1><p>{locale === "zh" ? "从真实模板代码、视觉家族和可迁移页面骨架中选择起点。" : "Choose a starting point from real template code, visual families, and migratable page skeletons."}</p></div>
        <span className="catalog-count">{entries.length} / {catalogEntries.length}</span>
      </section>
      <CatalogFiltersForm locale={locale} filters={filters} />
      {entries.length > 0 ? <div className="template-grid catalog-grid">{entries.map((entry) => <TemplateCard key={entry.id} entry={entry} locale={locale} />)}</div> : <EmptyState locale={locale} />}
      <div className="catalog-note"><span>{copy.draft}</span><p>{copy.internalFixture}</p><Link href="/docs/use-with-ai">{copy.useWithAi} <span aria-hidden="true">↗</span></Link></div>
    </main>
  );
}
