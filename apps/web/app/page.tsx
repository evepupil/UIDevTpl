import { ArrowUpRight, Boxes, Compass, Eye } from "lucide-react";
import { quietGridFamily } from "@uidevtpl/design-families";

const platformFacts = [
  { label: "固定版本", value: "Manifest-first" },
  { label: "预览方式", value: "Vite MPA" },
  { label: "迁移目录", value: ".uidevtpl/" }
];

export default function HomePage() {
  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="brand" href="/" aria-label="UIDevTpl 首页">
          <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span>UIDevTpl</span>
        </a>
        <nav className="site-nav" aria-label="主导航">
          <a className="is-active" href="#catalog">Templates</a>
          <a href="#families">Families</a>
          <a href="#docs">Docs</a>
        </nav>
        <span className="status-badge"><span /> Scaffold / M1</span>
      </header>

      <section className="catalog-intro" id="catalog">
        <div>
          <p className="eyebrow">A visual source of truth for AI coding</p>
          <h1>Start from a real interface system.</h1>
          <p className="intro-copy">
            模板平台骨架已经接通共享 Schema、视觉家族和固定版本预览入口。
          </p>
        </div>
        <a className="primary-action" href="#families">
          浏览家族
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </section>

      <section className="platform-grid" aria-label="平台状态">
        {platformFacts.map((fact) => (
          <div className="fact" key={fact.label}>
            <span>{fact.label}</span>
            <strong>{fact.value}</strong>
          </div>
        ))}
      </section>

      <section className="family-section" id="families">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Design families</p>
            <h2>已接入的视觉契约</h2>
          </div>
          <span className="section-count">01 family</span>
        </div>

        <article className="family-card">
          <div className="family-card-preview" aria-hidden="true">
            <div className="preview-sidebar"><span /><span /><span /><i /></div>
            <div className="preview-content">
              <span className="preview-line wide" />
              <span className="preview-line" />
              <div className="preview-panels"><span /><span /><span /></div>
            </div>
          </div>
          <div className="family-card-body">
            <div className="family-card-title">
              <div>
                <p className="eyebrow">{quietGridFamily.id} / {quietGridFamily.version}</p>
                <h3>{quietGridFamily.name}</h3>
              </div>
              <span className="family-status">Contract ready</span>
            </div>
            <p>{quietGridFamily.description}</p>
            <div className="family-tags">
              {quietGridFamily.traits.map((trait) => <span key={trait}>{trait}</span>)}
            </div>
            <div className="family-card-footer">
              <span>Web / Browser / React</span>
              <a href="#docs">查看契约 <ArrowUpRight size={14} aria-hidden="true" /></a>
            </div>
          </div>
        </article>
      </section>

      <section className="next-section" id="docs">
        <div className="next-item"><Compass size={18} aria-hidden="true" /><span>Catalog</span><small>Next: fixed records</small></div>
        <div className="next-item"><Eye size={18} aria-hidden="true" /><span>Preview</span><small>Vite MPA is ready</small></div>
        <div className="next-item"><Boxes size={18} aria-hidden="true" /><span>Migration</span><small>Next: release tooling</small></div>
      </section>
    </main>
  );
}
