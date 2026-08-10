import { ArrowUpRight, Eye } from "lucide-react";
import Link from "next/link";
import type { CatalogEntry } from "@uidevtpl/catalog";
import { formatMetric, localized } from "@uidevtpl/catalog";
import { getSiteCopy } from "../lib/copy";
import { templateHref } from "../lib/paths";
import type { SiteLocale } from "../lib/locale";
import { LikeButton } from "./like-button";

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
      <Link className={`template-card-image visual-${entry.mood}`} href={href} aria-label={`${localized(entry.name, locale)} ${copy.details}`}>
        <img src={entry.image} alt="" />
        <span className="template-card-image-overlay"><span>{entry.englishName}</span><ArrowUpRight size={16} aria-hidden="true" /></span>
        <span className="template-status">{copy.draft}</span>
      </Link>
      <div className="template-card-body">
        <div className="template-card-heading">
          <div>
            <p className="template-kicker">{entry.englishName} / {entry.version}</p>
            <h3><Link href={href}>{localized(entry.name, locale)}</Link></h3>
          </div>
          <span className={`publisher-avatar tone-${entry.publisher.tone}`} title={`${publisherLabel(entry, locale)}: ${localized(entry.publisher.name, locale)}`}>{entry.publisher.initials}</span>
        </div>
        <p className="template-card-summary">{localized(entry.summary, locale)}</p>
        <div className="template-tag-list">
          {entry.tags.slice(0, 3).map((tag) => <span key={tag.en}>{localized(tag, locale)}</span>)}
        </div>
        <div className="template-card-meta">
          <span className="publisher-line"><span>{localized(entry.publisher.name, locale)}</span><small>{publisherLabel(entry, locale)}</small></span>
          <span className="metric"><Eye size={13} aria-hidden="true" />{formatMetric(entry.metrics.views, locale)}</span>
          <LikeButton entryId={entry.id} initialCount={entry.metrics.likes} locale={locale} />
        </div>
      </div>
    </article>
  );
}
