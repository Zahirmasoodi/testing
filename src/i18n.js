import i18n from "i18next";
import backend from "i18next-xhr-backend";
import LanagugeDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n.use(backend).use(LanagugeDetector).use(initReactI18next).init({
  fallbackLng: "en",
  debug: true,
});

export default i18n;
