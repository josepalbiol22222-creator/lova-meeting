import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { DictionaryProvider } from "@/i18n/dictionary-context";
import { LocaleProvider } from "@/i18n/locale-context";
import "../globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Lova Meetings",
  description: "Schedule meetings effortlessly.",
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!locales.includes(lang as Locale)) notFound();

  const dictionary = await getDictionary(lang as Locale);

  return (
    <html lang={lang} className={`${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <LocaleProvider locale={lang as Locale}>
          <DictionaryProvider dictionary={dictionary}>
            {children}
          </DictionaryProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
