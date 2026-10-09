"use client";

import { useEffect, useState } from "react";
import { getDarshanStatus } from "@/lib/darshan";

export function DarshanStatus() {
  const [status, setStatus] = useState("दर्शन · सुबह 5–11 बजे और शाम 5–9 बजे");

  useEffect(() => {
    const update = () => setStatus(getDarshanStatus());
    update();
    const timer = window.setInterval(update, 60_000);
    document.addEventListener("visibilitychange", update);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <div className="darshan-status" id="darshan-status" role="status">
      {status}
    </div>
  );
}
