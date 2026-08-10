import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { catalogCategories, catalogEntries, selectCatalogEntries } from "@uidevtpl/catalog";
import { CategoryCard } from "../components/category-card";
import { TemplateCard } from "../components/template-card";
import { getSiteCopy } from "../lib/copy";
import { getSiteLocale } from "../lib/locale";

export default async function HomePage() {
  const locale = await getSiteLocale();
  const copy = getSiteCopy(locale);
  const featured = catalogEntries.filter((entry) => entry.featured);
  const recent = selectCatalogEntries(catalogEntries, { sort: "newest" });

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero-copy">
          <p className="section-eyebrow">CURATED UI SYSTEMS FOR AI BUILDERS</p>
          <h1>{locale === "zh" ? "为 AI 开发找到好界面" : "Find a better interface for AI development"}</h1>
          <p>{locale === "zh" ? "浏览经过打磨的组件、页面与完整模板，让 AI 从真实代码延续同一套设计。" : "Browse polished components, pages, and complete templates so AI can continue one coherent design from real code."}</p>
          <form className="hero-search" action="/templates" method="get">
            <Search size={18} aria-hidden="true" />
            <label className="sr-only" htmlFor="home-search">{copy.searchPlaceholder}</label>
            <input id="home-search" name="q" type="search" placeholder={copy.searchPlaceholder} />
            <button type="submit">{copy.search}<span aria-hidden="true">↗</span></button>
          </form>
        </div>
        <div className="hero-signal" aria-hidden="true">
          <div className="hero-signal-top"><span>UIDEVTPL / 01</span><span>VISUAL SOURCE OF TRUTH</span></div>
          <div className="hero-signal-grid"><span /><span /><span /><span /></div>
          <div className="hero-signal-bottom"><strong>Real code.</strong><span>Fixed versions / Shared rules / Better continuity</span></div>
        </div>
      </section>

      <section className="home-section categories-section" aria-labelledby="category-heading">
        <div className="section-heading-row"><div><p className="section-eyebrow">Browse by use case</p><h2 id="category-heading">{copy.categories}</h2></div><Link className="text-action" href="/categories">{copy.browseAll} <ArrowRight size={15} aria-hidden="true" /></Link></div>
        <div className="category-grid home-category-grid">
          {catalogCategories.slice(0, 4).map((category) => <CategoryCard key={category.id} category={category} entries={catalogEntries.filter((entry) => entry.categories.includes(category.id))} locale={locale} />)}
        </div>
      </section>

      <section className="home-section featured-section" aria-labelledby="featured-heading">
        <div className="section-heading-row"><div><p className="section-eyebrow">Selected systems</p><h2 id="featured-heading">{copy.featured}</h2></div><span className="section-count">{featured.length} / {catalogEntries.length}</span></div>
        <div className="template-grid featured-grid">
          {featured.map((entry) => <TemplateCard key={entry.id} entry={entry} locale={locale} featured />)}
        </div>
      </section>

      <section className="home-section all-section" aria-labelledby="all-heading">
        <div className="section-heading-row"><div><p className="section-eyebrow">Keep exploring</p><h2 id="all-heading">{copy.allTemplates}</h2></div><Link className="text-action" href="/templates">{copy.browseAll} <ArrowRight size={15} aria-hidden="true" /></Link></div>
        <div className="template-grid compact-grid">
          {recent.map((entry) => <TemplateCard key={entry.id} entry={entry} locale={locale} />)}
        </div>
      </section>

      <section className="migration-callout">
        <div><p className="section-eyebrow">{copy.useWithAi}</p><h2>{copy.useWithAiBody}</h2></div>
        <Link className="secondary-action" href="/docs/use-with-ai">{locale === "zh" ? "查看流程" : "Read the flow"} <ArrowRight size={15} aria-hidden="true" /></Link>
      </section>
    </main>
  );
}
