import 'intl-pluralrules'; // Import the polyfill
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './src/locals/en.json'; 
import fr from './src/locals/fr.json'; 

const resources = {
    en: { translation: en },
    fr: { translation: fr },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en', 
        debug: true, 
    });

export default i18n;
