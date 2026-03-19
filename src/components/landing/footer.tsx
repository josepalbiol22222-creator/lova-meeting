import { Calendar } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-lova-border px-6 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-lova-pink to-lova-pink-light">
            <Calendar className="h-4 w-4 text-white" />
          </div>
          <span className="font-heading text-lg font-bold text-lova-text">
            Lova Meetings
          </span>
        </Link>

        <p className="text-center text-sm text-lova-text-muted">
          Made with{" "}
          <span className="text-lova-pink">&hearts;</span> for the Lova team
        </p>

        <div className="flex gap-6 text-sm text-lova-text-muted">
          <Link href="#" className="transition-colors hover:text-lova-text">
            Privacy
          </Link>
          <Link href="#" className="transition-colors hover:text-lova-text">
            Terms
          </Link>
          <Link href="#" className="transition-colors hover:text-lova-text">
            Contact
          </Link>
        </div>

        <p className="text-xs text-lova-text-muted/60">
          &copy; {new Date().getFullYear()} Lova by Factorial. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
