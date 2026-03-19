import { Link2, CalendarCheck, Send } from "lucide-react";

const steps = [
  {
    icon: Link2,
    step: "01",
    title: "Share your link",
    description:
      "Send your personal booking link to anyone. Embed it on your website or share via email.",
  },
  {
    icon: CalendarCheck,
    step: "02",
    title: "They pick a time",
    description:
      "Visitors see your real-time availability and choose a slot that works for both of you.",
  },
  {
    icon: Send,
    step: "03",
    title: "Meeting confirmed",
    description:
      "Both parties get a calendar invite with all the details. Done in seconds.",
  },
];

export function HowItWorks() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        {/* Section header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-lova-border bg-white/60 px-4 py-2 text-sm font-medium text-lova-pink backdrop-blur-sm">
            How it works
          </div>
          <h2 className="font-heading text-4xl font-bold text-lova-text sm:text-5xl">
            Three simple steps
          </h2>
        </div>

        {/* Steps */}
        <div className="grid gap-8 sm:grid-cols-3">
          {steps.map((item, i) => (
            <div key={item.step} className="relative text-center">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute left-[calc(50%+40px)] top-10 hidden h-px w-[calc(100%-80px)] bg-gradient-to-r from-lova-pink/30 to-lova-pink-light/30 sm:block" />
              )}

              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-lova-pink to-lova-pink-light shadow-lg shadow-lova-pink/20">
                <item.icon className="h-9 w-9 text-white" />
              </div>
              <span className="mb-2 inline-block font-heading text-sm font-bold text-lova-pink">
                Step {item.step}
              </span>
              <h3 className="font-heading text-xl font-bold text-lova-text">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-lova-text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
