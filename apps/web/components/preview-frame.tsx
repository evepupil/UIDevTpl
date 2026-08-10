"use client";

import { ExternalLink, RotateCcw } from "lucide-react";
import { useState } from "react";
import { getSiteCopy } from "../lib/copy";
import type { SiteLocale } from "../lib/locale";

type Viewport = "mobile" | "tablet" | "desktop";

interface PreviewFrameProps {
  src: string;
  title: string;
  locale: SiteLocale;
  openHref: string;
}

const viewportLabels: Record<Viewport, string> = {
  mobile: "360",
  tablet: "768",
  desktop: "1440"
};

export function PreviewFrame({ src, title, locale, openHref }: PreviewFrameProps) {
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const copy = getSiteCopy(locale);

  return (
    <section className="preview-section" aria-labelledby="preview-heading">
      <div className="preview-toolbar">
        <div>
          <p className="section-eyebrow">{copy.showcase}</p>
          <h2 id="preview-heading">{title}</h2>
        </div>
        <div className="preview-toolbar-actions">
          <div className="viewport-switcher" aria-label="Viewport">
            {(Object.keys(viewportLabels) as Viewport[]).map((item) => (
              <button key={item} type="button" className={viewport === item ? "is-active" : ""} onClick={() => setViewport(item)} aria-pressed={viewport === item}>
                {viewportLabels[item]}
              </button>
            ))}
          </div>
          <a className="icon-button" href={openHref} target="_blank" rel="noreferrer" title={copy.openPreview} aria-label={copy.openPreview}>
            <ExternalLink size={15} aria-hidden="true" />
          </a>
          <button className="icon-button" type="button" onClick={() => setViewport("desktop")} title="Reset viewport" aria-label="Reset viewport">
            <RotateCcw size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className={`preview-frame viewport-${viewport}`}>
        <iframe src={src} title={title} loading="lazy" sandbox="allow-scripts" referrerPolicy="no-referrer" />
      </div>
    </section>
  );
}
