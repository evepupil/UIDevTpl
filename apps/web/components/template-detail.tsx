import { ArrowUpRight, Check, Code2, Download, FileArchive, Layers3, ShieldCheck } from "lucide-react";
import Link from "next/link";
import type { CatalogEntry, CatalogLocale } from "@uidevtpl/catalog";
import { buildMigrationInstruction, formatBytes, formatMetric, localized } from "@uidevtpl/catalog";
import { getSiteCopy } from "../lib/copy";
import { previewHref, templateHref } from "../lib/paths";
import type { SiteLocale } from "../lib/locale";
import { CopyMigrationButton } from "./copy-migration-button";
import { PreviewFrame } from "./preview-frame";

interface TemplateDetailProps {
  entry: CatalogEntry;
  locale: SiteLocale;
  fixedVersion: boolean;
  showcaseId?: string;
}

function localizedLabel(value: { zh: string; en: string }, locale: CatalogLocale): string {
  return value[locale];
}

export function TemplateDetail({ entry, locale, fixedVersion, showcaseId }: TemplateDetailProps) {
  const copy = getSiteCopy(locale);
  const showcase = entry.showcases.find((item) => item.id === showcaseId) ?? entry.showcases[0]!;
  const previewUrl = previewHref(entry, showcase.id);
  const componentLabUrl = previewHref(entry, "component-lab");
  const instruction = buildMigrationInstruction(entry, locale);
  const detailPath = fixedVersion ? templateHref(entry, true) : templateHref(entry);

  return (
    <main className="detail-page">
      <div className="detail-breadcrumbs"><Link href="/templates">{copy.templates}</Link><span>/</span><span>{localized(entry.name, locale)}</span></div>
      <section className="detail-hero">
        <div className="detail-hero-media">
          <img src={entry.editorialImage} alt={localized(entry.name, locale)} />
          <span className="detail-media-caption">{entry.englishName} / {entry.version}</span>
        </div>
        <div className="detail-hero-copy">
          <div className="detail-status-row"><span className="template-status is-static">{copy.draft}</span><span className="detail-updated">{copy.updatedAt} {entry.updatedAt}</span></div>
          <p className="section-eyebrow">{entry.familyVersion}</p>
          <h1>{localized(entry.name, locale)}</h1>
          <p className="detail-summary">{localized(entry.summary, locale)}</p>
          <code className="template-id">{entry.templateId}@{entry.version}</code>
          <div className="detail-actions">
            <CopyMigrationButton instruction={instruction} locale={locale} />
            <a className="secondary-action" href={previewUrl} target="_blank" rel="noreferrer"><ArrowUpRight size={16} aria-hidden="true" />{copy.openPreview}</a>
          </div>
          <div className="detail-publisher">
            <span className={`publisher-avatar tone-${entry.publisher.tone}`}>{entry.publisher.initials}</span>
            <span><strong>{localized(entry.publisher.name, locale)}</strong><small>{copy[entry.publisher.kind]}</small></span>
          </div>
        </div>
      </section>

      <section className="detail-facts" aria-label={copy.compatibility}>
        <div><span>{copy.platform}</span><strong>{entry.platform} / {entry.runtime}</strong></div>
        <div><span>{copy.framework}</span><strong>{entry.framework.label} {entry.framework.range}</strong></div>
        <div><span>{copy.library}</span><strong>{entry.library.label} {entry.library.range}</strong></div>
        <div><span>{copy.theme}</span><strong>{entry.theme}</strong></div>
        <div><span>{copy.views}</span><strong>{formatMetric(entry.metrics.views, locale)}</strong></div>
        <div><span>{copy.likes}</span><strong>{formatMetric(entry.metrics.likes, locale)}</strong></div>
      </section>

      <PreviewFrame src={previewUrl} title={localized(showcase.label, locale)} locale={locale} openHref={previewUrl} />

      <section className="showcase-links" aria-labelledby="showcase-heading">
        <div className="section-heading-row"><div><p className="section-eyebrow">{copy.showcase}</p><h2 id="showcase-heading">{locale === "zh" ? "同一套规则，多个真实场景" : "One system, multiple real scenarios"}</h2></div><span>{entry.showcases.length} {copy.showcasesCount}</span></div>
        <div className="showcase-grid">
          {entry.showcases.map((item, index) => (
            <Link className={`showcase-link${item.id === showcase.id ? " is-active" : ""}`} key={item.id} href={`${detailPath}?showcase=${encodeURIComponent(item.id)}`}>
              <span className="showcase-index">0{index + 1}</span>
              <span><strong>{localized(item.label, locale)}</strong><small>{localized(item.shortLabel, locale)}</small></span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          ))}
          <Link className="showcase-link" href={componentLabUrl} target="_blank" rel="noreferrer"><span className="showcase-index">CL</span><span><strong>{copy.componentLab}</strong><small>{locale === "zh" ? "组件状态与 API" : "States and API"}</small></span><ArrowUpRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="detail-content-grid">
        <div className="detail-content-main">
          <section className="content-section" aria-labelledby="components-heading">
            <div className="section-heading-row"><div><p className="section-eyebrow">{copy.contract}</p><h2 id="components-heading">{copy.components}</h2></div><Code2 size={20} aria-hidden="true" /></div>
            <div className="component-groups">
              {entry.componentGroups.map((group) => <div className="component-group" key={group.label.en}><span>{localizedLabel(group.label, locale)}</span><div>{group.items.map((item) => <code key={item}>{item}</code>)}</div></div>)}
            </div>
          </section>
          <section className="content-section" aria-labelledby="skeletons-heading">
            <div className="section-heading-row"><div><p className="section-eyebrow">{copy.contract}</p><h2 id="skeletons-heading">{copy.skeletons}</h2></div><Layers3 size={20} aria-hidden="true" /></div>
            <div className="skeleton-list">
              {entry.skeletons.map((skeleton) => <div className="skeleton-item" key={skeleton.id}><span className="skeleton-icon" aria-hidden="true">{skeleton.id.slice(0, 1).toUpperCase()}</span><span><strong>{localized(skeleton.label, locale)}</strong><small>{localized(skeleton.description, locale)}</small></span><ArrowUpRight size={15} aria-hidden="true" /></div>)}
            </div>
          </section>
        </div>
        <aside className="detail-aside">
          <section className="aside-section">
            <div className="section-heading-row"><h2>{copy.artifact}</h2><FileArchive size={18} aria-hidden="true" /></div>
            <dl className="artifact-facts"><div><dt>{copy.version}</dt><dd>{entry.version}</dd></div><div><dt>{copy.artifact}</dt><dd>{formatBytes(entry.artifact.sizeBytes)}</dd></div><div><dt>SHA-256</dt><dd>{entry.artifact.sha256.slice(0, 12)}...{entry.artifact.sha256.slice(-8)}</dd></div></dl>
            <div className="artifact-notice"><ShieldCheck size={15} aria-hidden="true" /><span>{copy.internalFixture}</span></div>
            <a className="download-placeholder" href={entry.artifact.url} aria-disabled="true" onClick={(event) => event.preventDefault()}><Download size={15} aria-hidden="true" />{locale === "zh" ? "下载入口待发布" : "Download pending release"}</a>
          </section>
          <section className="aside-section">
            <h2>{copy.relatedCategories}</h2>
            <div className="related-links">{entry.categories.map((category) => <Link key={category} href={`/categories/${category}`}>#{category}</Link>)}</div>
          </section>
          <section className="aside-section aside-checks">
            <h2>{locale === "zh" ? "当前兼容声明" : "Compatibility statement"}</h2>
            <p><Check size={15} aria-hidden="true" />{entry.framework.label} {entry.framework.range}</p>
            <p><Check size={15} aria-hidden="true" />{entry.library.label} {entry.library.range}</p>
            <p><Check size={15} aria-hidden="true" />{entry.packageManagers.join(" / ")}</p>
          </section>
        </aside>
      </section>
    </main>
  );
}
