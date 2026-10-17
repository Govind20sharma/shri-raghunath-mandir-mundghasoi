"use client";

import { useState } from "react";
import { useCmsContent, useCmsCopy } from "@/components/cms-content-provider";

export function CopyAddress() {
  const { settings: temple } = useCmsContent();
  const copy = useCmsCopy();
  const [status, setStatus] = useState("");

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(temple.address);
      setStatus(copy("copyAddress.success"));
    } catch {
      setStatus(
        copy("copyAddress.error"),
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
        {copy("copyAddress.label")}
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
