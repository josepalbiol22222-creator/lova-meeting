"use client";

import { useState } from "react";
import Link from "next/link";
import { Calendar, Menu, X } from "lucide-react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-lova-pink to-lova-pink-light">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <span className="font-heading text-xl font-bold text-lova-text">
            Lova
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 sm:flex">
          <Link
            href="#features"
            className="text-sm font-medium text-lova-text-muted transition-colors hover:text-lova-text"
          >
            Features
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-lova-text-muted transition-colors hover:text-lova-text"
          >
            Pricing
          </Link>
          <Link
            href="/demo"
            className="rounded-xl bg-gradient-to-r from-lova-pink to-lova-pink-light px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-lova-pink/15 transition-all hover:shadow-lg hover:shadow-lova-pink/25 hover:brightness-105"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-xl border border-lova-border bg-white/60 p-2 backdrop-blur-sm sm:hidden"
        >
          {open ? (
            <X className="h-5 w-5 text-lova-text" />
          ) : (
            <Menu className="h-5 w-5 text-lova-text" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-b border-lova-border bg-white/90 px-6 py-4 backdrop-blur-lg sm:hidden">
          <div className="flex flex-col gap-4">
            <Link
              href="#features"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-lova-text-muted"
            >
              Features
            </Link>
            <Link
              href="#"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-lova-text-muted"
            >
              Pricing
            </Link>
            <Link
              href="/demo"
              className="rounded-xl bg-gradient-to-r from-lova-pink to-lova-pink-light px-5 py-2.5 text-center text-sm font-semibold text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
