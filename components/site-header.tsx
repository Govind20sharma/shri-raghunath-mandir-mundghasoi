"use client";

import { CmsText, useCmsContent, useCmsCopy } from "@/components/cms-content-provider";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const { settings: temple } = useCmsContent();
  const copy = useCmsCopy();
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
        <CmsText id="header.text001" /></a>
      <div className="blessing">
        <span><CmsText id="header.text002" /></span>
        <a href={temple.phoneHref}>{temple.contacts[0]?.name ?? temple.name} · {temple.displayPhone}</a>
      </div>
      <header className="site-header">
        <a
          className="brand"
          href="/#home"
          aria-label={copy("header.homeLabel", "", { name: temple.name })}
        >
          <span className="brand-mark" aria-hidden="true">
            <CmsText id="header.text004" /></span>
          <span>
            <strong>{temple.name}</strong>
            <small><CmsText id="header.text006" /></small>
          </span>
        </a>
        <button
          type="button"
          ref={menuButton}
          className="menu-toggle"
          aria-expanded={isOpen}
          aria-controls="navigation"
          aria-label={copy(isOpen ? "header.menuClose" : "header.menuOpen")}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav
          id="navigation"
          className={isOpen ? "open" : undefined}
          aria-label={copy("header.menuLabel")}
          onClick={(event) => {
            if (event.target instanceof Element && event.target.closest("a"))
              setIsOpen(false);
          }}
        >
          <a href="/#about"><CmsText id="header.text007" /></a>
          <a href="/#darshan"><CmsText id="header.text008" /></a>
          <a href="/#anushthan"><CmsText id="header.text009" /></a>
          <a href="/photos" aria-current={pathname === "/photos" ? "page" : undefined}>
            <CmsText id="header.text010" /></a>
          <a href="/#utsav"><CmsText id="header.text011" /></a>
          <a className="nav-contact" href="/#contact">
            <CmsText id="header.text012" /></a>
        </nav>
      </header>
    </>
  );
}
