import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { CatalogCategory, CatalogEntry } from "@uidevtpl/catalog";
import { localized } from "@uidevtpl/catalog";
import { getSiteCopy } from "../lib/copy";
import type { SiteLocale } from "../lib/locale";

interface CategoryCardProps {
  category: CatalogCategory;
  entries: readonly CatalogEntry[];
  locale: SiteLocale;
}

export function CategoryCard({ category, entries, locale }: CategoryCardProps) {
  const copy = getSiteCopy(locale);
  const images = entries.length > 0 ? entries : [{ image: "/assets/quiet-grid-workspace.jpg" }, { image: "/assets/quiet-grid-editorial.jpg" }];

  return (
    <article className="category-card">
      <Link href={`/categories/${category.id}`}>
        <span className="category-mosaic" aria-hidden="true">
          {[0, 1, 2, 3].map((index) => <span key={index} style={{ backgroundImage: `url(${images[index % images.length]!.image})` }} />)}
        </span>
        <span className="category-card-copy">
          <span>
            <strong>{localized(category.name, locale)}</strong>
            <small>{localized(category.description, locale)}</small>
          </span>
          <ArrowUpRight size={17} aria-hidden="true" />
        </span>
      </Link>
      <small className="category-card-count">{entries.length} {copy.templates.toLocaleLowerCase()}</small>
    </article>
  );
}
