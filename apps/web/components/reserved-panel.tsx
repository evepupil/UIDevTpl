import { ArrowLeft, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { getSiteCopy } from "../lib/copy";
import type { SiteLocale } from "../lib/locale";

export function ReservedPanel({ locale, title }: { locale: SiteLocale; title: string }) {
  const copy = getSiteCopy(locale);

  return (
    <main className="reserved-page">
      <div className="reserved-panel">
        <span className="reserved-icon" aria-hidden="true"><LockKeyhole size={20} /></span>
        <p className="section-eyebrow">UIDevTpl / Capability flag</p>
        <h1>{title}</h1>
        <p>{copy.unavailableBody}</p>
        <Link className="secondary-action" href="/"><ArrowLeft size={15} aria-hidden="true" />{locale === "zh" ? "返回首页" : "Back home"}</Link>
      </div>
    </main>
  );
}
