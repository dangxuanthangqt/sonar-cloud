import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import common from './translations/en/common.json';
import vehicles from './translations/en/vehicles.json';
import salesCode from './translations/en/salesCode.json';

i18n.use(initReactI18next).init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: 'en', // language to use
  resources: {
    en: {
      common, // 'common' is our custom namespace
      vehicles,
      salesCode,
    },
  },
  defaultNS: 'common',
});

export default i18n;
