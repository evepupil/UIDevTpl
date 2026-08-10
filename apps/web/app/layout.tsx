import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UIDevTpl",
  description: "可预览、可下载、可迁移的 UI 模板平台"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
