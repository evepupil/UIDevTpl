import { Eye } from "lucide-react";
import Link from "next/link";
import type { CatalogEntry } from "@uidevtpl/catalog";
import { formatMetric, localized } from "@uidevtpl/catalog";
import { getSiteCopy } from "../lib/copy";
import { templateHref } from "../lib/paths";
import type { SiteLocale } from "../lib/locale";
import { LikeButton } from "./like-button";
import { TemplateVisual } from "./template-visual";

interface TemplateCardProps {
  entry: CatalogEntry;
  locale: SiteLocale;
  featured?: boolean;
}

function publisherLabel(entry: CatalogEntry, locale: SiteLocale): string {
  const copy = getSiteCopy(locale);
  return copy[entry.publisher.kind];
}

export function TemplateCard({ entry, locale, featured = false }: TemplateCardProps) {
  const copy = getSiteCopy(locale);
  const href = templateHref(entry);

  return (
    <article className={`template-card${featured ? " is-featured" : ""}`}>
      <Link className="template-preview-link" href={href} aria-label={`${localized(entry.name, locale)} ${copy.details}`}>
        <TemplateVisual entry={entry} />
      </Link>
      <div className="template-meta">
        <span className={`avatar ${entry.publisher.tone === "jade" ? "jade" : entry.publisher.tone === "coral" ? "coral" : ""}`} title={`${publisherLabel(entry, locale)}: ${localized(entry.publisher.name, locale)}`}>{entry.publisher.initials}</span>
        <div className="template-info">
          <p className="template-kicker">{entry.englishName}</p>
          <h3 className="template-title"><Link href={href}>{localized(entry.name, locale)}</Link></h3>
          <div className="byline">
            <span>{localized(entry.publisher.name, locale)}</span><span aria-hidden="true">·</span>
            <span><Eye size={15} aria-hidden="true" />{formatMetric(entry.metrics.views, locale)}</span><span aria-hidden="true">·</span>
            <LikeButton entryId={entry.id} initialCount={entry.metrics.likes} locale={locale} />
          </div>
        </div>
      </div>
    </article>
  );
}
