import { BackgroundOrbs } from "@/components/ui/background-orbs";
import { BookingWidget } from "@/components/booking/booking-widget";
import { Calendar } from "lucide-react";

export default function Home() {
  return (
    <>
      <BackgroundOrbs />
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
        {/* Booking widget */}
        <BookingWidget
          organizer={{
            name: "Josep Albiol",
            avatar: null,
            title: "Product Manager",
          }}
          meetingTitle="30 Minute Meeting"
          meetingDescription="Let's chat about how Lova can help your team."
          durations={[15, 30, 60]}
          defaultDuration={30}
        />

        {/* Powered by footer */}
        <div className="mt-6 flex items-center gap-2 text-xs text-lova-text-muted/50">
          <span>Powered by</span>
          <div className="flex items-center gap-1">
            <div className="flex h-4 w-4 items-center justify-center rounded bg-gradient-to-br from-lova-pink to-lova-pink-light">
              <Calendar className="h-2.5 w-2.5 text-white" />
            </div>
            <span className="font-heading font-semibold text-lova-text-muted/70">
              Lova
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
