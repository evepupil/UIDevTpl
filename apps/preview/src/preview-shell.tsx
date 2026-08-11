import { blacklineSaasFamily } from "@uidevtpl/design-families";
import { BlacklineBillingShowcase, BlacklineComponentLab, BlacklineSaasShowcase } from "@uidevtpl/template-blackline-saas";

interface PreviewShellProps {
  entry: string;
}

export function resolvePreviewEntry(pathname: string, fallback: string): string {
  const normalized = pathname.toLocaleLowerCase();
  if (normalized.includes("component-lab")) return "component-lab";
  if (normalized.includes("/billing")) return "billing";
  if (["/preview", "/overview", "/workspace"].some((segment) => normalized.includes(segment))) {
    return "preview";
  }
  return fallback;
}

const entryCopy: Record<string, { eyebrow: string; title: string }> = {
  catalog: {
    eyebrow: "Blackline SaaS",
    title: "Overview"
  },
  preview: {
    eyebrow: "Blackline SaaS",
    title: "Overview"
  },
  "component-lab": {
    eyebrow: "Blackline SaaS",
    title: "Component lab"
  },
  billing: {
    eyebrow: "Blackline SaaS",
    title: "Billing"
  }
};

export function PreviewShell({ entry }: PreviewShellProps) {
  const copy = entryCopy[entry] ?? entryCopy.catalog;

  if (entry === "preview") return <BlacklineSaasShowcase />;
  if (entry === "billing") return <BlacklineBillingShowcase />;
  if (entry === "component-lab") return <BlacklineComponentLab />;

  return (
    <main className="preview-shell">
      <header className="preview-header">
        <span className="preview-brand">UIDevTpl / Preview</span>
        <span className="preview-version">{blacklineSaasFamily.id}@{blacklineSaasFamily.version}</span>
      </header>
      <section className="preview-stage">
        <div className="preview-copy">
          <span className="preview-eyebrow">{copy.eyebrow}</span>
          <h1>{copy.title}</h1>
        </div>
        <div className="preview-board" aria-label="预览占位画板">
          <aside><span /><span /><span /><i /></aside>
          <div className="board-main">
            <div className="board-heading"><span /><span /></div>
            <div className="board-grid"><span /><span /><span /><span /></div>
          </div>
        </div>
      </section>
    </main>
  );
}
