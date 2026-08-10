import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { getSiteLocale } from "../lib/locale";

export const metadata: Metadata = {
  title: "UIDevTpl",
  description: "可预览、可下载、可迁移的 UI 模板平台"
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getSiteLocale();

  return (
    <html lang={locale === "zh" ? "zh-CN" : "en"}>
      <body>
        <SiteHeader initialLocale={locale} />
        {children}
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
