import Link from "next/link";
import { getSiteCopy } from "../lib/copy";
import type { SiteLocale } from "../lib/locale";

export function EmptyState({ locale, href = "/templates" }: { locale: SiteLocale; href?: string }) {
  const copy = getSiteCopy(locale);

  return (
    <div className="empty-state">
      <span className="empty-state-mark" aria-hidden="true">/ /</span>
      <h2>{copy.noResults}</h2>
      <p>{copy.noResultsBody}</p>
      <Link className="text-action" href={href}>{copy.resetFilters} <span aria-hidden="true">↗</span></Link>
    </div>
  );
}
