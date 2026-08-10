import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Grid2X2 } from "lucide-react";
import { catalogCategories, catalogEntries, getCategoryBySlug, selectCatalogEntries } from "@uidevtpl/catalog";
import { CatalogFilters as CatalogFiltersForm } from "../../../components/catalog-filters";
import { EmptyState } from "../../../components/empty-state";
import { TemplateCard } from "../../../components/template-card";
import { getSiteCopy } from "../../../lib/copy";
import { getSiteLocale } from "../../../lib/locale";

export function generateStaticParams() {
  return catalogCategories.map((category) => ({ slug: category.id }));
}

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function CategoryPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: SearchParams }) {
  const locale = await getSiteLocale();
  const copy = getSiteCopy(locale);
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();
  const query = await searchParams;
  const filters = {
    query: first(query.q),
    category: slug,
    framework: first(query.framework),
    library: first(query.library),
    sort: first(query.sort) === "newest" ? "newest" as const : first(query.sort) === "name" ? "name" as const : "popular" as const
  };
  const entries = selectCatalogEntries(catalogEntries, filters);

  return (
    <main className="category-page">
      <Link className="back-link" href="/categories"><ArrowLeft size={15} aria-hidden="true" />{copy.categoryOverview}</Link>
      <section className="category-heading"><div><p className="section-eyebrow">{category.name.en}</p><h1>{category.name[locale]}</h1><p>{category.description[locale]}</p></div><span className="category-heading-icon" aria-hidden="true"><Grid2X2 size={25} /></span></section>
      <CatalogFiltersForm locale={locale} filters={filters} action={`/categories/${slug}`} category={slug} />
      {entries.length > 0 ? <div className="template-grid catalog-grid">{entries.map((entry) => <TemplateCard key={entry.id} entry={entry} locale={locale} />)}</div> : <EmptyState locale={locale} href={`/categories/${slug}`} />}
    </main>
  );
}
