import { BackgroundOrbs } from "@/components/ui/background-orbs";
import { BookingWidget } from "@/components/booking/booking-widget";
import { FactorialLogo } from "@/components/ui/factorial-logo";

export default function Home() {
  return (
    <>
      <BackgroundOrbs />
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-10">
        <BookingWidget
          organizer={{
            name: "Josep Albiol",
            avatar: null,
            title: "Product Manager",
            company: "Lova",
          }}
          meetingTitle="30 Minute Meeting"
          meetingDescription="Book a time to chat — I'll share how Lova can help your team be more productive."
          durations={[15, 30, 60]}
          defaultDuration={30}
        />

        {/* Powered by Factorial */}
        <div className="mt-8 flex items-center gap-2.5 text-[11px] text-lova-text-muted/35">
          <div className="h-px w-5 bg-lova-text-muted/10" />
          <span className="tracking-widest uppercase">Powered by</span>
          <FactorialLogo
            variant="wordmark"
            className="h-[14px] opacity-30 transition-opacity hover:opacity-50"
            color="#25253D"
          />
          <div className="h-px w-5 bg-lova-text-muted/10" />
        </div>
      </div>
    </>
  );
}
