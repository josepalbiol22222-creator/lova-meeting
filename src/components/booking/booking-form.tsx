"use client";

import { useState, useCallback } from "react";
import { ArrowLeft, UserPlus, ArrowRight } from "lucide-react";

interface BookingFormProps {
  onSubmit: (data: { name: string; email: string }) => void;
  onBack: () => void;
}

export function BookingForm({ onSubmit, onBack }: BookingFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [guestEmails, setGuestEmails] = useState("");
  const [showGuests, setShowGuests] = useState(false);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearError = useCallback((field: string) => {
    setErrors((prev) => { if (!prev[field]) return prev; const next = { ...prev }; delete next[field]; return next; });
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!firstName.trim()) errs.firstName = "Required";
    if (!lastName.trim()) errs.lastName = "Required";
    if (!email.trim()) errs.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email";
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setIsSubmitting(true);
    setTimeout(() => onSubmit({ name: `${firstName.trim()} ${lastName.trim()}`, email: email.trim() }), 600);
  }, [firstName, lastName, email, onSubmit]);

  const inputCls = (field: string) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-[13.5px] text-navy placeholder:text-navy-20 transition-colors focus:outline-none focus:ring-2 ${
      errors[field] ? "border-radical/40 focus:border-radical focus:ring-radical/10" : "border-navy-10 focus:border-radical/30 focus:ring-radical/10"
    }`;

  return (
    <form onSubmit={handleSubmit}>
      <button type="button" onClick={onBack} className="group mb-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-navy-40 transition-colors hover:text-radical">
        <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" /> Back
      </button>

      <h3 className="mb-6 text-[17px] font-semibold text-navy">Your details</h3>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="firstName" className="mb-1.5 block text-[13px] font-medium text-navy-80">First name<span className="ml-0.5 text-radical">*</span></label>
            <input id="firstName" value={firstName} onChange={(e) => { setFirstName(e.target.value); clearError("firstName"); }} placeholder="John" className={inputCls("firstName")} />
            {errors.firstName && <p className="mt-1 text-[11px] font-medium text-radical">{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="mb-1.5 block text-[13px] font-medium text-navy-80">Last name<span className="ml-0.5 text-radical">*</span></label>
            <input id="lastName" value={lastName} onChange={(e) => { setLastName(e.target.value); clearError("lastName"); }} placeholder="Doe" className={inputCls("lastName")} />
            {errors.lastName && <p className="mt-1 text-[11px] font-medium text-radical">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-[13px] font-medium text-navy-80">Email<span className="ml-0.5 text-radical">*</span></label>
          <input id="email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); clearError("email"); }} placeholder="john@company.com" className={inputCls("email")} />
          {errors.email && <p className="mt-1 text-[11px] font-medium text-radical">{errors.email}</p>}
        </div>

        {!showGuests ? (
          <button type="button" onClick={() => setShowGuests(true)} className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-viridian-dark transition-colors hover:text-viridian">
            <UserPlus className="h-3.5 w-3.5" /> Add guests
          </button>
        ) : (
          <div className="animate-fade-up">
            <label htmlFor="guests" className="mb-1.5 block text-[13px] font-medium text-navy-80">Guest emails</label>
            <input id="guests" value={guestEmails} onChange={(e) => setGuestEmails(e.target.value)} placeholder="guest@company.com" className={inputCls("guests")} />
            <p className="mt-1 text-[10.5px] text-navy-20">Separate multiple emails with commas</p>
          </div>
        )}

        <div>
          <label htmlFor="notes" className="mb-1.5 block text-[13px] font-medium text-navy-80">Additional notes</label>
          <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything you'd like to discuss..." rows={3} className="w-full resize-none rounded-xl border border-navy-10 bg-white px-4 py-3 text-[13.5px] text-navy placeholder:text-navy-20 transition-colors focus:border-radical/30 focus:outline-none focus:ring-2 focus:ring-radical/10" />
        </div>
      </div>

      {/* Factorial-style pill CTA */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-radical px-6 py-3.5 text-[13.5px] font-semibold text-white shadow-md shadow-radical/12 transition-all hover:bg-radical-dark hover:shadow-lg hover:shadow-radical/18 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        ) : (
          <>Schedule Meeting <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" /></>
        )}
      </button>
    </form>
  );
}
