import { catalogCategories, catalogEntries } from "@uidevtpl/catalog";
import { CategoryCard } from "../../components/category-card";
import { getSiteCopy } from "../../lib/copy";
import { getSiteLocale } from "../../lib/locale";

export default async function CategoriesPage() {
  const locale = await getSiteLocale();
  const copy = getSiteCopy(locale);

  return (
    <main className="categories-page">
      <section className="catalog-heading"><div><p className="section-eyebrow">UIDevTpl / Categories</p><h1>{copy.categoryOverview}</h1><p>{copy.categoryOverviewBody}</p></div><span className="catalog-count">{catalogCategories.length} {copy.categoriesCount}</span></section>
      <div className="category-grid categories-grid">
        {catalogCategories.map((category) => <CategoryCard key={category.id} category={category} entries={catalogEntries.filter((entry) => entry.categories.includes(category.id))} locale={locale} />)}
      </div>
    </main>
  );
}
