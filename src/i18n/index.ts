import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import fr from './locales/fr/common.json';
import en from './locales/en/common.json';
import ha from './locales/ha/common.json';
import ar from './locales/ar/common.json';
import { DEFAULT_LANGUAGE } from './languages';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { common: fr },
      en: { common: en },
      ha: { common: ha },
      ar: { common: ar },
    },
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: ['fr', 'en', 'ha', 'ar'],
    defaultNS: 'common',
    ns: ['common'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
