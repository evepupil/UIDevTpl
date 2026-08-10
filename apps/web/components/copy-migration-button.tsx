"use client";

import { Check, Clipboard, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { getSiteCopy } from "../lib/copy";
import type { SiteLocale } from "../lib/locale";

interface CopyMigrationButtonProps {
  instruction: string;
  locale: SiteLocale;
}

export function CopyMigrationButton({ instruction, locale }: CopyMigrationButtonProps) {
  const copy = getSiteCopy(locale);
  const [copied, setCopied] = useState(false);
  const [manual, setManual] = useState(false);

  async function copyInstruction() {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard API unavailable");
      await navigator.clipboard.writeText(instruction);
      setCopied(true);
      setManual(false);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setManual(true);
    }
  }

  return (
    <div className="copy-migration-wrap">
      <button className="primary-action" type="button" onClick={copyInstruction}>
        {copied ? <Check size={16} aria-hidden="true" /> : <Clipboard size={16} aria-hidden="true" />}
        {copied ? copy.copied : copy.copyForAi}
      </button>
      {manual ? (
        <div className="manual-copy-panel" role="alert">
          <div><TriangleAlert size={15} aria-hidden="true" /><span>{copy.manualCopy}</span></div>
          <textarea readOnly value={instruction} aria-label={copy.manualCopy} />
        </div>
      ) : null}
    </div>
  );
}
