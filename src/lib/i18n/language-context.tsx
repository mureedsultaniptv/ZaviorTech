"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  ReactNode,
} from "react";
import { translations, Language } from "./translations";

type TranslationType = (typeof translations)[keyof typeof translations];
export type TextDirection = "ltr" | "rtl";

export type LanguageOption = {
  code: Language;
  label: string;
  nativeLabel: string;
  locale: string;
  dir: TextDirection;
};

/**
 * Keep language codes aligned with the translation catalog while exposing the
 * display and document metadata needed by language controls.
 */
export const languageOptions: readonly LanguageOption[] = [
  {
    code: "en",
    label: "English",
    nativeLabel: "English",
    locale: "en-AE",
    dir: "ltr",
  },
  {
    code: "ar",
    label: "Arabic",
    nativeLabel: "العربية",
    locale: "ar-AE",
    dir: "rtl",
  },
] as const;

// Uppercase alias makes the catalog convenient for consumers that prefer
// constant-style imports while preserving the readable camelCase export.
export const LANGUAGE_OPTIONS = languageOptions;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationType;
  dir: TextDirection;
  locale: string;
  languageOption: LanguageOption;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
const LANGUAGE_STORAGE_KEY = "zavior-language";
const LANGUAGE_CHANGE_EVENT = "zavior-language-change";
export const DEFAULT_LANGUAGE: Language = "en";

export function isLanguage(value: string | null | undefined): value is Language {
  return languageOptions.some((option) => option.code === value);
}

export function getLanguageOption(language: Language): LanguageOption {
  return languageOptions.find((option) => option.code === language) ?? languageOptions[0];
}

function parseLanguage(value: string | null | undefined): Language | null {
  return isLanguage(value) ? value : null;
}

function readLanguageCookie(): Language | null {
  if (typeof document === "undefined") {
    return null;
  }

  const encodedKey = encodeURIComponent(LANGUAGE_STORAGE_KEY);
  const entry = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${encodedKey}=`));

  if (!entry) {
    return null;
  }

  try {
    return parseLanguage(decodeURIComponent(entry.slice(encodedKey.length + 1)));
  } catch {
    return null;
  }
}

function writeLanguageCookie(language: Language) {
  if (typeof document === "undefined") {
    return;
  }

  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${encodeURIComponent(LANGUAGE_STORAGE_KEY)}=${encodeURIComponent(language)}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
}

function getStoredLanguage(): Language {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  try {
    const storedLanguage = parseLanguage(localStorage.getItem(LANGUAGE_STORAGE_KEY));
    if (storedLanguage) {
      return storedLanguage;
    }
  } catch {
    // Storage can be blocked in privacy-focused browsers. The preference
    // cookie still gives us a safe fallback.
  }

  return readLanguageCookie() ?? DEFAULT_LANGUAGE;
}

function subscribeToLanguageChange(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const notify = () => onStoreChange();
  const onStorage = (event: StorageEvent) => {
    if (event.key === LANGUAGE_STORAGE_KEY || event.key === null) {
      notify();
    }
  };

  window.addEventListener("storage", onStorage);
  window.addEventListener(LANGUAGE_CHANGE_EVENT, notify);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(LANGUAGE_CHANGE_EVENT, notify);
  };
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore(
    subscribeToLanguageChange,
    getStoredLanguage,
    () => DEFAULT_LANGUAGE,
  );

  const setLanguage = useCallback((lang: Language) => {
    if (!isLanguage(lang)) {
      return;
    }

    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {
      // Cookie persistence below remains available when localStorage is not.
    }

    writeLanguageCookie(lang);
    window.dispatchEvent(new Event(LANGUAGE_CHANGE_EVENT));
  }, []);

  const languageOption = getLanguageOption(language);
  const { dir, locale } = languageOption;
  const t = translations[language];

  useEffect(() => {
    const root = document.documentElement;
    root.dir = dir;
    root.lang = locale;
    root.dataset.language = language;
  }, [dir, language, locale]);

  const contextValue = useMemo(
    () => ({ language, setLanguage, t, dir, locale, languageOption }),
    [dir, language, languageOption, locale, setLanguage, t],
  );

  return (
    <LanguageContext.Provider value={contextValue}>
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
