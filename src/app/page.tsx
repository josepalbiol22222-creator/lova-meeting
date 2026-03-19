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
            title: "SDR",
            company: "Factorial",
          }}
          meetingTitle="30 Minute Meeting"
          meetingDescription="Book a time to chat — I'd love to show you how Factorial can help your team."
          durations={[15, 30, 60]}
          defaultDuration={30}
        />

        {/* Powered by Lova */}
        <div className="mt-8 flex items-center gap-2 text-[10.5px] text-navy-20">
          <div className="h-px w-5 bg-navy-10/60" />
          <span className="tracking-widest uppercase">Powered by</span>
          <span className="font-heading font-bold tracking-wide text-navy-40">Lova</span>
          <div className="h-px w-5 bg-navy-10/60" />
        </div>
      </div>
    </>
  );
}
