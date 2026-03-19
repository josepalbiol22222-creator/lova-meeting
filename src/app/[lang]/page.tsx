import { BackgroundOrbs } from "@/components/ui/background-orbs";
import { BookingWidget } from "@/components/booking/booking-widget";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

export default function Home() {
  return (
    <>
      <BackgroundOrbs />

      {/* Language switcher — fixed top right */}
      <div className="fixed top-5 right-5 z-50">
        <LanguageSwitcher />
      </div>

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
      </div>
    </>
  );
}
