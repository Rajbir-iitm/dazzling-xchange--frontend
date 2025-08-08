import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
  keySeparator: false, // Treat dotted keys as flat keys in JSON
    supportedLngs: [
      'en','es','fr','de','it','pt',
      'zh','ja','ko','ar','hi','ru',
      'th','vi','id','ms','tl','bn','ur','ta'
    ],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    backend: {
      loadPath: '/locales/{{lng}}.json'
    },
    react: { 
      useSuspense: false 
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;