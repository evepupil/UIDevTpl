"use client";

import { Languages, Moon, Plus, Sun } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { catalogCategories } from "@uidevtpl/catalog";
import { getSiteCopy, type SiteCopy } from "../lib/copy";
import type { SiteLocale } from "../lib/locale";

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
          <span className="brand-mark" aria-hidden="true"><span /><span /><span /></span>
          <span>UIDevTpl</span>
        </Link>
        <nav className="site-nav" aria-label="主导航">
          <Link className="is-active" href="/templates">{copy.templates}</Link>
          <details className="category-menu">
            <summary>{copy.categories}<span aria-hidden="true">⌄</span></summary>
            <div className="category-menu-panel">
              <Link className="category-menu-all" href="/categories">{copy.browseAll}</Link>
              {catalogCategories.slice(0, 5).map((category) => (
                <Link key={category.id} href={`/categories/${category.id}`}>
                  <span>{category.name[locale]}</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </details>
          <Link href="/docs/use-with-ai">{copy.docs}</Link>
        </nav>
        <div className="header-actions">
          <button className="icon-button" type="button" onClick={toggleTheme} title={`${copy.theme}: ${dark ? copy.dark : copy.light}`} aria-label={`${copy.theme}: ${dark ? copy.dark : copy.light}`}>
            {dark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
          </button>
          <button className="icon-button language-button" type="button" onClick={toggleLocale} title={copy.language} aria-label={copy.language}>
            <Languages size={16} aria-hidden="true" />
            <span>{locale === "zh" ? "EN" : "中"}</span>
          </button>
          <Link className="header-link optional-link" href="/login">{copy.login}</Link>
          <Link className="header-link optional-link" href="/signup">{copy.signup}</Link>
          <Link className="header-share" href="/submit"><Plus size={15} aria-hidden="true" />{copy.share}</Link>
        </div>
      </div>
    </header>
  );
}
