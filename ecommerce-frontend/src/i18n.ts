import { initReactI18next } from 'react-i18next';
import AR_LANG from './locales/ar/common.json';
import EN_LANG from './locales/en/common.json';
import i18next from 'i18next';
import { store } from './store/index';

const savedLanguage = store.getState().translate.language;

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { global: EN_LANG },
      ar: { global: AR_LANG },
    },
    lng: savedLanguage,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
