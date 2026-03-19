"use client";

import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";

interface BookingFormProps {
  onSubmit: (data: { name: string; email: string }) => void;
  onBack: () => void;
}

export function BookingForm({ onSubmit, onBack }: BookingFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string } = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({ name: name.trim(), email: email.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-medium text-lova-text"
        >
          Your name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
          }}
          placeholder="John Doe"
          className={`w-full rounded-xl border bg-white/60 px-4 py-3 text-sm text-lova-text placeholder:text-lova-text-muted/50 backdrop-blur-sm transition-colors focus:border-lova-pink focus:outline-none focus:ring-2 focus:ring-lova-pink/20 ${
            errors.name ? "border-red-400" : "border-lova-border"
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium text-lova-text"
        >
          Email address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email)
              setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          placeholder="john@company.com"
          className={`w-full rounded-xl border bg-white/60 px-4 py-3 text-sm text-lova-text placeholder:text-lova-text-muted/50 backdrop-blur-sm transition-colors focus:border-lova-pink focus:outline-none focus:ring-2 focus:ring-lova-pink/20 ${
            errors.email ? "border-red-400" : "border-lova-border"
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email}</p>
        )}
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 rounded-xl border border-lova-border bg-white/60 px-5 py-3 text-sm font-medium text-lova-text-muted transition-colors hover:bg-white/80 hover:text-lova-text"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <button
          type="submit"
          className="group inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-lova-pink to-lova-pink-light px-5 py-3 text-sm font-semibold text-white shadow-md shadow-lova-pink/20 transition-all hover:shadow-lg hover:shadow-lova-pink/30 hover:brightness-105"
        >
          Schedule Meeting
          <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </form>
  );
}
