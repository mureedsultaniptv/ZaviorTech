"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  ReactNode,
} from "react";
import { translations, Language } from "./translations";

type TranslationType = (typeof translations)[keyof typeof translations];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationType;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
const LANGUAGE_STORAGE_KEY = "zavior-language";
const LANGUAGE_CHANGE_EVENT = "zavior-language-change";
const DEFAULT_LANGUAGE: Language = "en";

function toLanguage(value: string | null): Language {
  return value === "ar" ? "ar" : DEFAULT_LANGUAGE;
}

function getStoredLanguage(): Language {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  return toLanguage(localStorage.getItem(LANGUAGE_STORAGE_KEY));
}

function subscribeToLanguageChange(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const notify = () => onStoreChange();
  window.addEventListener("storage", notify);
  window.addEventListener(LANGUAGE_CHANGE_EVENT, notify);

  return () => {
    window.removeEventListener("storage", notify);
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, notify);
  };
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(
    subscribeToLanguageChange,
    getStoredLanguage,
    () => DEFAULT_LANGUAGE,
  );

  const setLanguage = (lang: Language) => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT));
  };

  const dir = language === "ar" ? "rtl" : "ltr";
  const t = translations[language];

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [dir, language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
