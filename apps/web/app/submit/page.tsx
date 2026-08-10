import { ReservedPanel } from "../../components/reserved-panel";
import { getSiteCopy } from "../../lib/copy";
import { getSiteLocale } from "../../lib/locale";

export default async function SubmitPage() {
  const locale = await getSiteLocale();
  const copy = getSiteCopy(locale);
  return <ReservedPanel locale={locale} title={locale === "zh" ? `${copy.share}${copy.unavailableTitle}` : `${copy.share} ${copy.unavailableTitle}`} />;
}
