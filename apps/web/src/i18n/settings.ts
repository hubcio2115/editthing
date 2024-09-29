export const FALLBACK_LANG = "en";
export const SUPPORTED_LANGUAGES = [
  { value: "en", label: "🇬🇧 English" },
  { value: "pl", label: "🇵🇱 Polski" },
] as const;
export const LANGUAGES = SUPPORTED_LANGUAGES.map((lang) => lang.value);
export const DEFAULT_NS = "translation";
export const COOKIE_NAME = "i18next";

export type SupportedLanguages = (typeof LANGUAGES)[number];

export function getOptions(
  lang: SupportedLanguages = FALLBACK_LANG,
  ns: string | string[] = DEFAULT_NS,
) {
  return {
    debug: true,
    supportedLngs: LANGUAGES,
    // preload: languages,
    fallbackLng: FALLBACK_LANG,
    lng: lang,
    fallbackNS: DEFAULT_NS,
    defaultNS: DEFAULT_NS,
    ns,
  };
}
