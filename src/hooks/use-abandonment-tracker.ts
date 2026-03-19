"use client";

import { useEffect, useRef, useCallback } from "react";

interface AbandonmentData {
  selectedDate: string;
  selectedTime: string;
  selectedDuration: number;
  timezone: string;
  timestamp: string;
}

interface UseAbandonmentTrackerParams {
  isOnFormStep: boolean;
  selectedDate: Date | null;
  selectedTime: string | null;
  selectedDuration: number;
  isConfirmed: boolean;
  onAbandonment: (data: AbandonmentData) => void;
}

const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes
const INTERACTION_EVENTS = ["mousemove", "keydown", "scroll", "touchstart"] as const;

export function useAbandonmentTracker({
  isOnFormStep,
  selectedDate,
  selectedTime,
  selectedDuration,
  isConfirmed,
  onAbandonment,
}: UseAbandonmentTrackerParams) {
  const sentRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onAbandonmentRef = useRef(onAbandonment);
  onAbandonmentRef.current = onAbandonment;

  const buildPayload = useCallback((): AbandonmentData | null => {
    if (!selectedDate || !selectedTime) return null;
    return {
      selectedDate: selectedDate.toISOString(),
      selectedTime,
      selectedDuration,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timestamp: new Date().toISOString(),
    };
  }, [selectedDate, selectedTime, selectedDuration]);

  useEffect(() => {
    if (isConfirmed) {
      sentRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    if (!isOnFormStep) {
      sentRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    // — Form step is active —

    const fire = () => {
      if (sentRef.current) return;
      const payload = buildPayload();
      if (!payload) return;
      sentRef.current = true;
      onAbandonmentRef.current(payload);
    };

    // beforeunload
    const handleBeforeUnload = () => fire();

    // Inactivity timer
    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(fire, INACTIVITY_TIMEOUT);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    for (const evt of INTERACTION_EVENTS) {
      window.addEventListener(evt, resetTimer, { passive: true });
    }
    resetTimer();

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      for (const evt of INTERACTION_EVENTS) {
        window.removeEventListener(evt, resetTimer);
      }
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isOnFormStep, isConfirmed, buildPayload]);
}
