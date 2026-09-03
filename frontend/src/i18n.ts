import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import ta from './locales/ta.json';
import hi from './locales/hi.json';

const resources = {
  en: { translation: en },
  ta: { translation: ta },
  hi: { translation: hi },
};

const savedLanguage = localStorage.getItem('nool_language') || 'en';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'nool_language',
    }
  });

export const changeAppLanguage = (lang: 'en' | 'ta' | 'hi') => {
  i18n.changeLanguage(lang);
  localStorage.setItem('nool_language', lang);
  document.documentElement.lang = lang;
};

export default i18n;
