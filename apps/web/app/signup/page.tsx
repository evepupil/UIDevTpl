import { ReservedPanel } from "../../components/reserved-panel";
import { getSiteCopy } from "../../lib/copy";
import { getSiteLocale } from "../../lib/locale";

export default async function SignupPage() {
  const locale = await getSiteLocale();
  const copy = getSiteCopy(locale);
  return <ReservedPanel locale={locale} title={locale === "zh" ? `${copy.signup}${copy.unavailableTitle}` : `${copy.signup} ${copy.unavailableTitle}`} />;
}
