"use client";

import {
  COOKIE_NAME,
  SUPPORTED_LANGUAGES,
  type SupportedLanguages,
} from "~/i18n/settings";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useTranslation } from "~/i18n/client";
import { useCookies } from "react-cookie";
import { usePathname, useRouter } from "next/navigation";

interface LocaleSelectProps {
  lang: SupportedLanguages;
}

export default function LocaleSelect({ lang }: LocaleSelectProps) {
  const { i18n } = useTranslation(lang, "translation");
  const router = useRouter();
  const pathname = usePathname();

  const [_cookies, setCookie] = useCookies([COOKIE_NAME]);

  function handleChangeLanguage(lang: SupportedLanguages) {
    const newPath = pathname.replace(`/${i18n.language}/`, `/${lang}/`);

    setCookie(COOKIE_NAME, lang, { path: "/" });
    router.replace(newPath);
  }

  return (
    <Select onValueChange={handleChangeLanguage} defaultValue={i18n.language}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {SUPPORTED_LANGUAGES.map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
