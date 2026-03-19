import { BackgroundOrbs } from "@/components/ui/background-orbs";
import { BookingWidget } from "@/components/booking/booking-widget";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";

export default function DemoPage() {
  return (
    <>
      <BackgroundOrbs />
      <div className="flex min-h-screen flex-col items-center px-6 py-8">
        {/* Back nav */}
        <div className="mb-8 flex w-full max-w-2xl items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-lova-text-muted transition-colors hover:text-lova-text"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-lova-pink to-lova-pink-light">
              <Calendar className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-heading text-sm font-bold text-lova-text">
              Lova Meetings
            </span>
          </div>
        </div>

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

        {/* Footer */}
        <p className="mt-8 text-xs text-lova-text-muted/60">
          Powered by Lova Meetings
        </p>
      </div>
    </>
  );
}
