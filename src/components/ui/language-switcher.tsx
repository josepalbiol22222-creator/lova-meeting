"use client";

import { usePathname } from "next/navigation";
import { useLocale } from "@/i18n/locale-context";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function switchLocale(newLocale: Locale) {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    window.location.href = segments.join("/");
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-full border border-navy-10/60 bg-white/80 px-3 py-1.5 text-[11.5px] font-medium text-navy-60 shadow-sm transition-all hover:border-radical/20 hover:text-radical hover:shadow-md"
      >
        <Globe className="h-3 w-3" />
        {localeNames[locale]}
      </button>

      {open && (
        <div className="absolute bottom-full left-0 z-50 mb-1.5 min-w-[140px] animate-fade-up overflow-hidden rounded-xl border border-navy-10/60 bg-white shadow-lg">
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => { switchLocale(l); setOpen(false); }}
              className={`flex w-full items-center gap-2 px-3.5 py-2.5 text-left text-[12.5px] transition-colors ${
                l === locale
                  ? "bg-radical-50/60 font-semibold text-radical"
                  : "text-navy-60 hover:bg-navy-2"
              }`}
            >
              {localeNames[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
