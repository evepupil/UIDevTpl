import { ArrowRight, Check, CircleAlert, Download, FolderOpen, ScanSearch } from "lucide-react";
import Link from "next/link";
import { getSiteCopy } from "../../../lib/copy";
import { getSiteLocale } from "../../../lib/locale";

const steps = [
  { icon: FolderOpen, zh: "确认项目边界", en: "Confirm project boundaries", detailZh: "阅读项目规则、包管理器、现有改动和目标框架。", detailEn: "Read the project rules, package manager, existing changes, and target framework." },
  { icon: Download, zh: "下载固定版本", en: "Download the fixed version", detailZh: "使用固定地址获取模板包，保留版本和 SHA-256。", detailEn: "Fetch the fixed artifact and keep its version and SHA-256." },
  { icon: ScanSearch, zh: "校验并阅读", en: "Verify and read", detailZh: "校验失败立即停止，再阅读 Manifest、迁移说明、源码和参考图。", detailEn: "Stop on checksum failure, then read the Manifest, migration guide, source, and references." },
  { icon: Check, zh: "增量迁移", en: "Migrate incrementally", detailZh: "迁移 tokens、组件、布局和页面骨架，记录源文件与目标文件。", detailEn: "Migrate tokens, components, layouts, and page skeletons while recording source and target files." }
];

export default async function UseWithAiPage() {
  const locale = await getSiteLocale();
  const copy = getSiteCopy(locale);

  return (
    <main className="docs-page">
      <section className="docs-heading"><p className="section-eyebrow">UIDevTpl / Docs</p><h1>{copy.useWithAi}</h1><p>{copy.useWithAiBody}</p></section>
      <section className="docs-steps" aria-label={copy.useWithAi}>
        {steps.map(({ icon: Icon, zh, en, detailZh, detailEn }, index) => <article key={zh}><span className="docs-step-index">0{index + 1}</span><Icon size={19} aria-hidden="true" /><h2>{locale === "zh" ? zh : en}</h2><p>{locale === "zh" ? detailZh : detailEn}</p></article>)}
      </section>
      <section className="docs-warning"><CircleAlert size={19} aria-hidden="true" /><div><h2>{locale === "zh" ? "边界保持清楚" : "Keep the boundary clear"}</h2><p>{locale === "zh" ? "AI 需要把原始模板保留在 .uidevtpl/，运行时代码不能依赖这个参考目录，也不能静默覆盖用户文件。" : "AI should keep the original template under .uidevtpl/. Runtime code must not depend on that reference directory or silently overwrite user files."}</p></div></section>
      <Link className="secondary-action" href="/templates">{copy.browseAll}<ArrowRight size={15} aria-hidden="true" /></Link>
    </main>
  );
}
