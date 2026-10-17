"use client";

import { useEffect, useState } from "react";
import { useCmsContent, useCmsCopy } from "@/components/cms-content-provider";
import { getCmsScheduleValues } from "@/lib/cms/copy-fields";

export function DarshanStatus() {
  const { settings } = useCmsContent();
  const copy = useCmsCopy();
  const schedule = getCmsScheduleValues(settings);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const parts = new Intl.DateTimeFormat("en-GB", { timeZone: settings.timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(now);
      const hour = Number(parts.find(part => part.type === "hour")?.value ?? 0) + Number(parts.find(part => part.type === "minute")?.value ?? 0) / 60;
      const { morning, evening } = settings.darshan;
      const key = hour >= morning.opens && hour < morning.closes ? "status.morning"
        : hour >= evening.opens && hour < evening.closes ? "status.evening"
        : hour >= morning.closes && hour < evening.opens ? "status.nextEvening"
        : hour >= evening.closes ? "status.nextTomorrow" : "status.nextMorning";
      setStatus(copy(key, "", getCmsScheduleValues(settings)));
    };
    update();
    const timer = window.setInterval(update, 60_000);
    document.addEventListener("visibilitychange", update);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", update);
    };
  }, [settings, copy]);

  return (
    <div className="darshan-status" id="darshan-status" role="status">
      {status ?? copy("status.initial", "", schedule)}
    </div>
  );
}
