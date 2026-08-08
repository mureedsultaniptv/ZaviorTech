"use client";

import { useId } from "react";
import { ChevronDown, Globe2 } from "lucide-react";
import {
  isLanguage,
  languageOptions,
  useLanguage,
} from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";
import type { Language } from "@/lib/i18n/translations";

type LanguageSwitcherProps = {
  className?: string;
  label?: string;
  showLabel?: boolean;
  onLanguageChange?: (language: Language) => void;
};

/**
 * A native select gives keyboard and screen-reader users the same reliable
 * language control as pointer users, without requiring a bespoke menu.
 */
export function LanguageSwitcher({
  className,
  label = "Language",
  showLabel = false,
  onLanguageChange,
}: LanguageSwitcherProps) {
  const id = useId();
  const { language, setLanguage } = useLanguage();

  return (
    <label
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground shadow-xs transition-colors hover:bg-muted focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30",
        className,
      )}
      htmlFor={id}
    >
      <Globe2 aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
      <span className={showLabel ? "whitespace-nowrap" : "sr-only"}>{label}</span>
      <select
        id={id}
        value={language}
        dir="auto"
        aria-label={label}
        className="min-w-0 cursor-pointer appearance-none bg-transparent pr-0 text-sm font-medium outline-none"
        onChange={(event) => {
          const nextLanguage = event.target.value;
          if (isLanguage(nextLanguage)) {
            setLanguage(nextLanguage);
            onLanguageChange?.(nextLanguage);
          }
        }}
      >
        {languageOptions.map((option) => (
          <option key={option.code} value={option.code} dir={option.dir}>
            {option.nativeLabel}
          </option>
        ))}
      </select>
      <ChevronDown aria-hidden="true" className="size-3 shrink-0 text-muted-foreground" />
    </label>
  );
}
