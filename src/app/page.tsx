import { BackgroundOrbs } from "@/components/ui/background-orbs";
import { BookingWidget } from "@/components/booking/booking-widget";

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
          meetingDescription="Book a time to chat. I'll share how Lova can help your team be more productive."
          durations={[15, 30, 60]}
          defaultDuration={30}
        />

        {/* Powered by */}
        <div className="mt-8 flex items-center gap-1.5 text-[11px] tracking-wide text-lova-text-muted/40">
          <span>Powered by</span>
          <span className="font-heading font-bold text-lova-text-muted/50">
            Lova
          </span>
        </div>
      </div>
    </>
  );
}
