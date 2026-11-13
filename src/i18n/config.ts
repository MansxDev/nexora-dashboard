import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from '../locales/en/translation.json'
import id from '../locales/id/translation.json'

/**
 * Konfigurasi i18next.
 * Terjemahan di-bundle langsung (bukan fetch) supaya tidak ada kedipan key
 * mentah saat first paint dan tetap jalan offline.
 */
export const SUPPORTED_LOCALES = ['en', 'id'] as const
export type AppLocale = (typeof SUPPORTED_LOCALES)[number]

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      id: { translation: id },
    },
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LOCALES as unknown as string[],
    // 'en-US' → 'en'
    load: 'languageOnly',
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'nexora.locale',
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  })

// Sinkronkan atribut <html lang> setiap bahasa berubah.
function syncHtmlLang(lng: string) {
  if (typeof document !== 'undefined') document.documentElement.lang = lng
}
syncHtmlLang(i18n.language)
i18n.on('languageChanged', syncHtmlLang)

export default i18n
