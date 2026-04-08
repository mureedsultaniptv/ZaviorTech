"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations, Language } from "./translations";

type TranslationType = (typeof translations)[keyof typeof translations];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationType;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("zavior-language") as Language | null;
      if (saved === "en" || saved === "ar") {
        return saved;
      }
    }

    return "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("zavior-language", lang);
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
