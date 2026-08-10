"use client";

import {
  ArrowRight,
  Blocks,
  ChartNoAxesCombined,
  ChevronDown,
  Component,
  Languages,
  LogIn,
  Moon,
  Newspaper,
  PanelsTopLeft,
  Plus,
  Sparkles,
  Sun,
  type LucideIcon
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { catalogCategories } from "@uidevtpl/catalog";
import { getSiteCopy, type SiteCopy } from "../lib/copy";
import type { SiteLocale } from "../lib/locale";

const categoryIcons: Record<string, LucideIcon> = {
  blocks: Blocks,
  "chart-no-axes-combined": ChartNoAxesCombined,
  component: Component,
  "log-in": LogIn,
  newspaper: Newspaper,
  "panels-top-left": PanelsTopLeft
};

interface SiteHeaderProps {
  initialLocale: SiteLocale;
}

export function SiteHeader({ initialLocale }: SiteHeaderProps) {
  const router = useRouter();
  const [locale, setLocale] = useState<SiteLocale>(initialLocale);
  const [dark, setDark] = useState(false);
  const copy: SiteCopy = getSiteCopy(locale);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("uidevtpl-theme");
    const nextDark = storedTheme === "dark" || (!storedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDark(nextDark);
    document.documentElement.dataset.theme = nextDark ? "dark" : "light";
  }, []);

  function toggleTheme() {
    const nextDark = !dark;
    setDark(nextDark);
    window.localStorage.setItem("uidevtpl-theme", nextDark ? "dark" : "light");
    document.documentElement.dataset.theme = nextDark ? "dark" : "light";
  }

  function toggleLocale() {
    const nextLocale: SiteLocale = locale === "zh" ? "en" : "zh";
    setLocale(nextLocale);
    document.cookie = `uidevtpl-locale=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax`;
    document.documentElement.lang = nextLocale === "zh" ? "zh-CN" : "en";
    router.refresh();
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="UIDevTpl 首页">
          <span className="brand-mark" aria-hidden="true">UI</span>
          <span className="brand-name">UIDevTpl</span>
        </Link>
        <nav className="main-nav" aria-label="主导航">
          <details className="nav-menu-wrap">
            <summary className="nav-link is-active"><span>{copy.templates}</span><ChevronDown size={15} aria-hidden="true" /></summary>
            <div className="templates-menu">
              <Link className="menu-feature" href="/templates">
                <span><small>{copy.templates}</small><strong>{copy.browseAll}</strong></span>
                <span className="menu-art" aria-hidden="true"><i /><i /><i /><i /></span>
              </Link>
              <div className="menu-list">
                {catalogCategories.slice(0, 5).map((category) => {
                  const Icon = categoryIcons[category.icon] ?? Blocks;
                  return <Link className="menu-item" key={category.id} href={`/categories/${category.id}`}><Icon size={16} aria-hidden="true" /><span>{category.name[locale]}</span><ArrowRight size={13} aria-hidden="true" /></Link>;
                })}
              </div>
            </div>
          </details>
          <Link className="nav-link optional-docs" href="/docs/use-with-ai"><Sparkles size={15} aria-hidden="true" />{copy.docs}</Link>
        </nav>
        <div className="header-actions">
          <Link className="share-button" href="/submit"><Plus size={15} aria-hidden="true" />{copy.share}</Link>
          <button className="icon-button language-button" type="button" onClick={toggleLocale} title={copy.language} aria-label={copy.language}>
            <Languages size={16} aria-hidden="true" />
            <span>{locale === "zh" ? "中" : "EN"}</span>
          </button>
          <button className="icon-button" type="button" onClick={toggleTheme} title={`${copy.theme}: ${dark ? copy.dark : copy.light}`} aria-label={`${copy.theme}: ${dark ? copy.dark : copy.light}`}>
            {dark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
          </button>
          <Link className="login-button" href="/login">{copy.login}</Link>
          <Link className="signup-button" href="/signup">{copy.signup}</Link>
        </div>
      </div>
    </header>
  );
}
