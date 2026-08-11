import { Search, SlidersHorizontal } from "lucide-react";
import type { CatalogFilters, CatalogLocale } from "@uidevtpl/catalog";
import { getSiteCopy } from "../lib/copy";

interface CatalogFiltersProps {
  locale: CatalogLocale;
  filters: CatalogFilters;
  action?: string;
  category?: string;
}

export function CatalogFilters({ locale, filters, action = "/templates", category }: CatalogFiltersProps) {
  const copy = getSiteCopy(locale);

  return (
    <form className="catalog-filters" action={action} method="get">
      {category ? <input type="hidden" name="category" value={category} /> : null}
      <label className="filter-search">
        <Search size={16} aria-hidden="true" />
        <span className="sr-only">{copy.searchPlaceholder}</span>
        <input name="q" type="search" defaultValue={filters.query} placeholder={copy.searchPlaceholder} />
      </label>
      <label className="filter-select">
        <span>{copy.framework}</span>
        <select name="framework" defaultValue={filters.framework ?? ""}>
          <option value="">{copy.framework}</option>
          <option value="react">React</option>
          <option value="vue">Vue</option>
        </select>
      </label>
      <label className="filter-select">
        <span>{copy.library}</span>
        <select name="library" defaultValue={filters.library ?? ""}>
          <option value="">{copy.library}</option>
          <option value="shadcn">shadcn/ui</option>
        </select>
      </label>
      <label className="filter-select">
        <span>{copy.name}</span>
        <select name="sort" defaultValue={filters.sort ?? "popular"}>
          <option value="popular">{copy.popular}</option>
          <option value="newest">{copy.newest}</option>
          <option value="name">{copy.name}</option>
        </select>
      </label>
      <button className="filter-submit" type="submit" title={copy.search} aria-label={copy.search}>
        <SlidersHorizontal size={16} aria-hidden="true" />
        <span>{copy.search}</span>
      </button>
    </form>
  );
}
