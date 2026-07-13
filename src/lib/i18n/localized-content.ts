import type { Language } from "./translations";

export function getLocalizedTitle(
  item: { title: string; titleAr?: string },
  language: Language,
) {
  return language === "ar" && item.titleAr ? item.titleAr : item.title;
}
