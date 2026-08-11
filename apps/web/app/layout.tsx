import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { getSiteLocale } from "../lib/locale";
import { Noto_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

const notoSans = Noto_Sans({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "UIDevTpl",
  description: "可预览、可下载、可迁移的 UI 模板平台"
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getSiteLocale();

  return (
    <html lang={locale === "zh" ? "zh-CN" : "en"} className={cn("font-sans", notoSans.variable)}>
      <body>
        <SiteHeader initialLocale={locale} />
        {children}
        <SiteFooter locale={locale} />
      </body>
    </html>
  );
}
