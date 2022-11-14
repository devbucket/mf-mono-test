import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { enUS } from './en-US';

i18n.use(LanguageDetector).init({
  compatibilityJSON: 'v3',
  resources: {
    'en-US': enUS,
  },
  fallbackLng: 'en-US',
  debug: false,
  ns: ['translations'],
  defaultNS: 'translations',
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
    skipOnVariables: false,
  },
  detection: {
    order: ['localStorage', 'navigator'],
  },
});

export { i18n };
