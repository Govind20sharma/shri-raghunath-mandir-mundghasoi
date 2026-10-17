import { NextResponse } from "next/server";
import { CmsError } from "./errors";

export function cmsJson(value: unknown, status = 200) {
  return NextResponse.json(value, { status, headers: { "Cache-Control": "private, no-store, max-age=0", "X-Robots-Tag": "noindex, nofollow", Vary: "Cookie" } });
}

export async function cmsApi(action: () => Promise<NextResponse>) {
  try { return await action(); }
  catch (error) {
    if (error instanceof CmsError) return cmsJson({ error: error.message, code: error.code }, error.status);
    console.error("CMS request failed", error instanceof Error ? error.name : "unknown_error");
    return cmsJson({ error: "The CMS request could not be completed. Your saved content has not been reset. Please retry.", code: "server_error" }, 500);
  }
}
