import { quietGridFamily } from "@uidevtpl/design-families";
import { AiProjectWorkspaceShowcase, QuietGridComponentLab } from "@uidevtpl/template-quiet-grid";

interface PreviewShellProps {
  entry: string;
}

export function resolvePreviewEntry(pathname: string, fallback: string): string {
  const normalized = pathname.toLocaleLowerCase();
  if (normalized.includes("component-lab")) return "component-lab";
  if (["/preview", "/workspace", "/publication", "/launch-room", "/field-notes"].some((segment) => normalized.includes(segment))) {
    return "preview";
  }
  return fallback;
}

const entryCopy: Record<string, { eyebrow: string; title: string; detail: string }> = {
  catalog: {
    eyebrow: "Vite MPA / Catalog",
    title: "Fixed preview assembly is ready.",
    detail: "这里会承载已经通过发布门禁的固定模板版本。"
  },
  preview: {
    eyebrow: "Quiet Grid / Showcase",
    title: "Quiet Grid preview entry.",
    detail: "这里会运行真实模板 Showcase，不读取主站运行时。"
  },
  "component-lab": {
    eyebrow: "Quiet Grid / Component Lab",
    title: "Component laboratory entry.",
    detail: "这里会展示组件 API、状态矩阵和键盘行为。"
  }
};

export function PreviewShell({ entry }: PreviewShellProps) {
  const copy = entryCopy[entry] ?? entryCopy.catalog;

  if (entry === "preview") return <AiProjectWorkspaceShowcase />;
  if (entry === "component-lab") return <QuietGridComponentLab />;

  return (
    <main className="preview-shell">
      <header className="preview-header">
        <span className="preview-brand">UIDevTpl / Preview</span>
        <span className="preview-version">{quietGridFamily.id}@{quietGridFamily.version}</span>
      </header>
      <section className="preview-stage">
        <div className="preview-copy">
          <span className="preview-eyebrow">{copy.eyebrow}</span>
          <h1>{copy.title}</h1>
          <p>{copy.detail}</p>
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
