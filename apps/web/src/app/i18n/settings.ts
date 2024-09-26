export const FALLBACK_LANG = "en";
export const LANGUAGES = ["en", "pl"] as const;
export const DEFAULT_NS = "translation";
export const COOKIE_NAME = "i18next";

export type SupportedLanguages = (typeof LANGUAGES)[number];

export function getOptions (lang: SupportedLanguages = FALLBACK_LANG, ns: string | string[] = DEFAULT_NS) {
  return {
    debug: true,
    supportedLngs: LANGUAGES,
    // preload: languages,
    fallbackLng: FALLBACK_LANG,
    lng: lang,
    fallbackNS: DEFAULT_NS,
    defaultNS: DEFAULT_NS,
    ns,
  }
}
