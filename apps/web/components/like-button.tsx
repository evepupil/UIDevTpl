"use client";

import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import type { SiteLocale } from "../lib/locale";
import { getSiteCopy } from "../lib/copy";

interface LikeButtonProps {
  entryId: string;
  initialCount: number;
  locale: SiteLocale;
}

function readStoredLikes(): string[] {
  try {
    const stored = JSON.parse(window.localStorage.getItem("uidevtpl-likes") ?? "[]") as unknown;
    return Array.isArray(stored) ? stored.filter((value): value is string => typeof value === "string") : [];
  } catch {
    return [];
  }
}

export function LikeButton({ entryId, initialCount, locale }: LikeButtonProps) {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(readStoredLikes().includes(entryId));
  }, [entryId]);

  function toggleLike() {
    const likes = new Set(readStoredLikes());
    if (likes.has(entryId)) likes.delete(entryId);
    else likes.add(entryId);
    window.localStorage.setItem("uidevtpl-likes", JSON.stringify([...likes]));
    setLiked(!liked);
  }

  const copy = getSiteCopy(locale);

  return (
    <button className={`like-button${liked ? " is-liked" : ""}`} type="button" onClick={toggleLike} aria-pressed={liked} aria-label={copy.likes} title={copy.likes}>
      <Heart size={14} fill={liked ? "currentColor" : "none"} aria-hidden="true" />
      <span>{initialCount + (liked ? 1 : 0)}</span>
    </button>
  );
}
