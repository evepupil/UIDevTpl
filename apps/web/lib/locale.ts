import { cookies } from "next/headers";

export type SiteLocale = "zh" | "en";

export async function getSiteLocale(): Promise<SiteLocale> {
  const value = (await cookies()).get("uidevtpl-locale")?.value;
  return value === "en" ? "en" : "zh";
}

export function isSiteLocale(value: string | undefined): value is SiteLocale {
  return value === "zh" || value === "en";
}
