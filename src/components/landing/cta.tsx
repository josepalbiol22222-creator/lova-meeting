import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-lova-pink to-lova-pink-light p-12 text-center shadow-2xl shadow-lova-pink/20">
          {/* Decorative overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(at_20%_50%,rgba(255,255,255,0.2)_0%,transparent_60%)]" />

          <div className="relative">
            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
              Ready to simplify your scheduling?
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Join thousands of professionals who save hours every week with Lova
              Meetings.
            </p>
            <Link
              href="/demo"
              className="group mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-lova-pink shadow-lg transition-all hover:shadow-xl hover:brightness-95"
            >
              Get started for free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
