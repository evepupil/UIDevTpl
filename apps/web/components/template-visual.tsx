import type { CatalogEntry } from "@uidevtpl/catalog";

interface TemplateVisualProps {
  entry: CatalogEntry;
}

export function TemplateVisual({ entry }: TemplateVisualProps) {
  if (entry.mood === "expressive") {
    return (
      <div className="template-visual visual-signal" aria-hidden="true">
        <div className="signal-top"><b>FORM / 02</b><span>PRODUCT SIGNALS</span><span>MENU</span></div>
        <div className="signal-main">
          <div className="signal-copy"><small>OBJECT STUDY 024</small><strong>MAKE EVERY<br />SIGNAL COUNT.</strong><span>BUILT FOR MOTION</span></div>
          <div className="signal-image"><img src={entry.image} alt="" /><i /><b /><em>01 / 04</em></div>
        </div>
        <div className="signal-foot"><span>DISCOVER THE SYSTEM</span><span>SCROLL ↓</span></div>
      </div>
    );
  }

  return (
    <div className="template-visual visual-quiet" aria-hidden="true">
      <aside><b><i /><i /><i /><i /></b><span /><span /><em /></aside>
      <section>
        <header><span>ATELIER / AI</span><i /><i /></header>
        <div className="quiet-title"><span><small>TUESDAY, AUG 10</small><strong>Ship the work that matters.</strong></span><b>New task</b></div>
        <div className="quiet-board"><div className="quiet-rows"><i /><i /><i /><i /></div><img src={entry.image} alt="" /></div>
      </section>
    </div>
  );
}
