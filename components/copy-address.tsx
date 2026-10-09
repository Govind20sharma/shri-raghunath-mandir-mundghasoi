"use client";

import { useState } from "react";
import { temple } from "@/lib/temple";

export function CopyAddress() {
  const [status, setStatus] = useState("");

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(temple.address);
      setStatus("मंदिर का पता कॉपी हो गया।");
    } catch {
      setStatus(
        "पता कॉपी नहीं हो पाया। ऊपर दिए पते को चुनकर कॉपी कर सकते हैं।",
      );
    }
  }

  return (
    <>
      <button
        type="button"
        className="text-button"
        id="copy-address"
        onClick={copyAddress}
      >
        पता कॉपी करें
      </button>
      <p
        id="copy-status"
        className="copy-status"
        role="status"
        aria-live="polite"
      >
        {status}
      </p>
    </>
  );
}
