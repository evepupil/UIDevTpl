import Link from "next/link";
import { getSiteCopy } from "../lib/copy";
import type { SiteLocale } from "../lib/locale";

export function SiteFooter({ locale }: { locale: SiteLocale }) {
  const copy = getSiteCopy(locale);

  return (
    <footer className="site-footer">
      <div>
        <span className="footer-brand">UIDevTpl</span>
        <p>{locale === "zh" ? "为 AI 编程提供可预览、可下载、可迁移的真实 UI 模板。" : "Real UI systems for AI builders to preview, download, and migrate."}</p>
      </div>
      <nav aria-label="页脚导航">
        <Link href="/templates">{copy.templates}</Link>
        <Link href="/categories">{copy.categories}</Link>
        <Link href="/docs/use-with-ai">{copy.docs}</Link>
      </nav>
      <small>V1 / Development fixture</small>
    </footer>
  );
}
