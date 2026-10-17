import { cmsApi, cmsJson } from "@/lib/cms/api";
import { createAdminSession, SESSION_COOKIE, SESSION_DURATION_MS, sessionCookieOptions } from "@/lib/cms/auth";
import { assertSameOrigin, readJson } from "@/lib/cms/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return cmsApi(async () => {
    assertSameOrigin(request);
    const input = await readJson(request, 16000) as { idToken?: unknown };
    const session = await createAdminSession(input?.idToken);
    const response = cmsJson({ user: session.user });
    response.cookies.set(SESSION_COOKIE, session.cookie, { ...sessionCookieOptions, maxAge: SESSION_DURATION_MS / 1000 });
    return response;
  });
}

export async function DELETE(request: Request) {
  return cmsApi(async () => {
    assertSameOrigin(request);
    const response = cmsJson({ ok: true });
    response.cookies.set(SESSION_COOKIE, "", { ...sessionCookieOptions, maxAge: 0 });
    return response;
  });
}
