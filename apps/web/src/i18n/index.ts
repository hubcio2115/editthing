import {
  createInstance,
  type FlatNamespace,
  type KeyPrefix,
  type Namespace,
} from "i18next";
import { type FallbackNs } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions, type SupportedLanguages } from "./settings";

async function initI18next(lang: SupportedLanguages, ns: string | string[]) {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`),
      ),
    )
    .init(getOptions(lang, ns));
  return i18nInstance;
}

type $Tuple<T> = readonly [T?, ...T[]];
type $FirstNamespace<Ns extends Namespace> = Ns extends readonly any[]
  ? Ns[0]
  : Ns;

export async function translation<
  Ns extends FlatNamespace | $Tuple<FlatNamespace>,
  KPrefix extends KeyPrefix<
    FallbackNs<
      Ns extends FlatNamespace ? FlatNamespace : $FirstNamespace<FlatNamespace>
    >
  > = undefined,
>(lang: SupportedLanguages, ns?: Ns, options: { keyPrefix?: KPrefix } = {}) {
  const i18nextInstance = await initI18next(
    lang,
    Array.isArray(ns) ? (ns as string[]) : (ns as string),
  );
  return {
    t: Array.isArray(ns)
      ? i18nextInstance.getFixedT(lang, ns[0], options.keyPrefix)
      : i18nextInstance.getFixedT(lang, ns as FlatNamespace, options.keyPrefix),
    i18n: i18nextInstance,
  };
}
