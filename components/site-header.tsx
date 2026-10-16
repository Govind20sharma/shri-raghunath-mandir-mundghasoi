"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { temple } from "@/lib/temple";

export function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        menuButton.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 821px)");
    const onResize = () => {
      if (desktop.matches) setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [isOpen]);

  return (
    <>
      <a className="skip-link" href="#main">
        मुख्य सामग्री पर जाएँ
      </a>
      <div className="blessing">
        <span>॥ श्री सीतारामचन्द्राभ्यां नमः ॥</span>
        <a href={temple.phoneHref}>अजय शर्मा · {temple.displayPhone}</a>
      </div>
      <header className="site-header">
        <a
          className="brand"
          href="/#home"
          aria-label="श्री रघुनाथ मंदिर मुख्य पृष्ठ"
        >
          <span className="brand-mark" aria-hidden="true">
            ॐ
          </span>
          <span>
            <strong>श्री रघुनाथ मंदिर</strong>
            <small>मूंडघसोई · राजस्थान</small>
          </span>
        </a>
        <button
          type="button"
          ref={menuButton}
          className="menu-toggle"
          aria-expanded={isOpen}
          aria-controls="navigation"
          aria-label={isOpen ? "मेन्यू बंद करें" : "मेन्यू खोलें"}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav
          id="navigation"
          className={isOpen ? "open" : undefined}
          aria-label="मुख्य मेन्यू"
          onClick={(event) => {
            if (event.target instanceof Element && event.target.closest("a"))
              setIsOpen(false);
          }}
        >
          <a href="/#about">हमारा मंदिर</a>
          <a href="/#darshan">दर्शन समय</a>
          <a href="/#anushthan">अनुष्ठान</a>
          <a href="/photos" aria-current={pathname === "/photos" ? "page" : undefined}>
            तस्वीरें
          </a>
          <a href="/#utsav">पर्व एवं उत्सव</a>
          <a className="nav-contact" href="/#contact">
            मंदिर पधारें
          </a>
        </nav>
      </header>
    </>
  );
}
