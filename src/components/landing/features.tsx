import {
  Calendar,
  Clock,
  Globe,
  Users,
  Zap,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Smart Calendar",
    description:
      "Syncs with Google Calendar and Outlook. Only shows your real availability.",
  },
  {
    icon: Clock,
    title: "Flexible Durations",
    description:
      "Offer 15, 30, or 60-minute slots. Let your guests choose what works best.",
  },
  {
    icon: Globe,
    title: "Timezone Detection",
    description:
      "Automatically detects your visitor's timezone. No confusion, no missed meetings.",
  },
  {
    icon: Users,
    title: "Team Scheduling",
    description:
      "Round-robin or collective availability. Perfect for sales and support teams.",
  },
  {
    icon: Zap,
    title: "Instant Booking",
    description:
      "One click to book. Automatic confirmations and calendar invites sent instantly.",
  },
  {
    icon: Shield,
    title: "Custom Branding",
    description:
      "Match your brand colors and logo. Your scheduling page, your identity.",
  },
];

export function Features() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-lova-border bg-white/60 px-4 py-2 text-sm font-medium text-lova-pink backdrop-blur-sm">
            Features
          </div>
          <h2 className="font-heading text-4xl font-bold text-lova-text sm:text-5xl">
            Everything you need
          </h2>
          <p className="mt-4 text-lg text-lova-text-muted">
            A complete scheduling solution designed to save you time.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-lova-border bg-lova-card p-6 backdrop-blur-md transition-all hover:border-lova-pink/20 hover:shadow-lg hover:shadow-lova-pink/5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-lova-pink/10 to-lova-pink-light/10 transition-colors group-hover:from-lova-pink/20 group-hover:to-lova-pink-light/20">
                <feature.icon className="h-6 w-6 text-lova-pink" />
              </div>
              <h3 className="font-heading text-lg font-bold text-lova-text">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-lova-text-muted">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
