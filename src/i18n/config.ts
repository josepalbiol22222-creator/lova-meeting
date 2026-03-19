export const locales = ["en", "es", "pt", "it", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  pt: "Português",
  it: "Italiano",
  de: "Deutsch",
};
