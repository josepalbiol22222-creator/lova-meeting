"use client";

import { useState } from "react";
import { Send, UserPlus } from "lucide-react";

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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) newErrors.firstName = "Required";
    if (!lastName.trim()) newErrors.lastName = "Required";
    if (!email.trim()) {
      newErrors.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      name: `${firstName.trim()} ${lastName.trim()}`,
      email: email.trim(),
    });
  };

  const clearError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const inputClass = (field: string) =>
    `w-full rounded-xl border bg-white/60 px-4 py-3 text-sm text-lova-text placeholder:text-lova-text-muted/40 backdrop-blur-sm transition-colors focus:border-lova-pink focus:outline-none focus:ring-2 focus:ring-lova-pink/20 ${
      errors[field] ? "border-red-400" : "border-lova-border"
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="firstName"
            className="mb-1.5 block text-sm font-medium text-lova-text"
          >
            First name <span className="text-red-400">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              clearError("firstName");
            }}
            placeholder="John"
            className={inputClass("firstName")}
          />
          {errors.firstName && (
            <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="mb-1.5 block text-sm font-medium text-lova-text"
          >
            Last name <span className="text-red-400">*</span>
          </label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              clearError("lastName");
            }}
            placeholder="Doe"
            className={inputClass("lastName")}
          />
          {errors.lastName && (
            <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium text-lova-text"
        >
          Email <span className="text-red-400">*</span>
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clearError("email");
          }}
          placeholder="john@company.com"
          className={inputClass("email")}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Add guests */}
      {!showGuests ? (
        <button
          type="button"
          onClick={() => setShowGuests(true)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-lova-pink hover:text-lova-pink-dark"
        >
          <UserPlus className="h-4 w-4" />
          Add guests
        </button>
      ) : (
        <div>
          <label
            htmlFor="guests"
            className="mb-1.5 block text-sm font-medium text-lova-text"
          >
            Guest email(s)
          </label>
          <input
            id="guests"
            type="text"
            value={guestEmails}
            onChange={(e) => setGuestEmails(e.target.value)}
            placeholder="guest@company.com, another@company.com"
            className={inputClass("guests")}
          />
          <p className="mt-1 text-xs text-lova-text-muted">
            Separate multiple emails with commas
          </p>
        </div>
      )}

      <div className="pt-2">
        <button
          type="submit"
          className="group w-full rounded-xl bg-gradient-to-r from-lova-pink to-lova-pink-light px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-lova-pink/20 transition-all hover:shadow-lg hover:shadow-lova-pink/30 hover:brightness-105"
        >
          Schedule Meeting
        </button>
      </div>
    </form>
  );
}
