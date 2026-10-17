import "server-only";
import { cookies } from "next/headers";
import { firebaseAuth, allowedAdminEmails, isFirebaseConfigured } from "./firebase";
import { CmsError } from "./errors";
import { hasRecentAuthentication, isAuthorizedGoogleIdentity } from "./security";

export const SESSION_COOKIE = "mandir_admin_session";
export const SESSION_DURATION_MS = 12 * 60 * 60 * 1000;
export const sessionCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
};

function authorized(token: { email?: string; email_verified?: boolean; firebase?: { sign_in_provider?: string } }) {
  return isAuthorizedGoogleIdentity(token, allowedAdminEmails());
}

export async function createAdminSession(idToken: unknown) {
  if (!isFirebaseConfigured()) throw new CmsError(503, "The CMS connection has not been configured.", "not_configured");
  if (typeof idToken !== "string" || idToken.length > 12000 || !idToken) throw new CmsError(400, "A Google sign-in token is required.", "invalid_token");
  try {
    const decoded = await firebaseAuth().verifyIdToken(idToken, true);
    if (!authorized(decoded)) throw new CmsError(403, "This Google account does not have CMS access.", "not_authorized");
    if (!hasRecentAuthentication(decoded.auth_time)) throw new CmsError(401, "Sign in with Google again to continue.", "recent_login_required");
    const cookie = await firebaseAuth().createSessionCookie(idToken, { expiresIn: SESSION_DURATION_MS });
    return { cookie, user: { email: decoded.email! } };
  } catch (error) {
    if (error instanceof CmsError) throw error;
    throw new CmsError(401, "Google sign-in could not be verified. Please sign in again.", "invalid_token");
  }
}

export async function getAdminUser() {
  if (!isFirebaseConfigured()) return null;
  const cookie = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!cookie) return null;
  try {
    const decoded = await firebaseAuth().verifySessionCookie(cookie, true);
    return authorized(decoded) ? { email: decoded.email! } : null;
  } catch { return null; }
}

export async function requireAdmin() {
  const user = await getAdminUser();
  if (!user) throw new CmsError(401, "Sign in with the authorized Google account.", "unauthenticated");
  return user;
}
