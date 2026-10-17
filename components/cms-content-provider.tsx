"use client";

import { Fragment, createContext, useCallback, useContext, type ReactNode } from "react";
import { resolveCmsCopy } from "@/lib/cms/copy-fields";
import type { CmsContent } from "@/lib/cms/model";

const CmsContext = createContext<CmsContent | null>(null);

export function CmsContentProvider({ content, children }: { content: CmsContent; children: ReactNode }) {
  return <CmsContext.Provider value={content}>{children}</CmsContext.Provider>;
}

export function useCmsContent() {
  const content = useContext(CmsContext);
  if (!content) throw new Error("CMS components must be rendered inside CmsContentProvider.");
  return content;
}

export function useCmsCopy() {
  const content = useCmsContent();
  return useCallback((key: string, fallback = "", values: Record<string, string | number> = {}) => resolveCmsCopy(content, key, fallback, values), [content]);
}

export function CmsText({ id, fallback = "", values = {} }: { id: string; fallback?: string; values?: Record<string, string | number> }) {
  const copy = useCmsCopy();
  return <>{copy(id, fallback, values).split("\n").map((line, index) => <Fragment key={index}>{index > 0 && <br />}{line}</Fragment>)}</>;
}
