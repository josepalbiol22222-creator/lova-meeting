import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center px-6 pt-32 pb-20 text-center">
      {/* Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-lova-border bg-white/60 px-4 py-2 text-sm font-medium text-lova-text backdrop-blur-sm">
        <Calendar className="h-4 w-4 text-lova-pink" />
        <span>Meetings</span>
      </div>

      {/* Heading */}
      <h1 className="max-w-3xl font-heading text-5xl font-bold leading-tight tracking-tight text-lova-text sm:text-6xl lg:text-7xl">
        Schedule meetings{" "}
        <span className="bg-gradient-to-r from-lova-pink to-lova-pink-light bg-clip-text text-transparent">
          effortlessly
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-lova-text-muted">
        Share your availability, let others pick a time, and get meetings booked
        automatically. No more back-and-forth emails.
      </p>

      {/* CTAs */}
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="/demo"
          className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-lova-pink to-lova-pink-light px-8 py-4 text-base font-semibold text-white shadow-lg shadow-lova-pink/20 transition-all hover:shadow-xl hover:shadow-lova-pink/30 hover:brightness-105"
        >
          Try it free
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <Link
          href="#features"
          className="inline-flex items-center gap-2 rounded-2xl border border-lova-border bg-white/60 px-8 py-4 text-base font-medium text-lova-text backdrop-blur-sm transition-colors hover:bg-white/80"
        >
          See how it works
        </Link>
      </div>

      {/* Preview card */}
      <div className="mt-16 w-full max-w-2xl">
        <div className="rounded-3xl border border-lova-border bg-lova-card p-1 shadow-xl shadow-black/5 backdrop-blur-md">
          <div className="rounded-[20px] bg-gradient-to-br from-lova-pink to-lova-pink-light p-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                <Calendar className="h-7 w-7 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-heading text-xl font-bold text-white">
                  30 min Meeting
                </h3>
                <p className="text-sm text-white/70">
                  with Lova Team
                </p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-7 gap-2">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex h-10 items-center justify-center rounded-xl text-sm font-medium ${
                    i === 3
                      ? "bg-white text-lova-pink shadow-md"
                      : "bg-white/15 text-white/80"
                  }`}
                >
                  {17 + i}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
