import "server-only";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

export function firebaseClientConfig() {
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID || "",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  };
}

function credentials() {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    try {
      const value = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
      return { projectId: value.project_id, clientEmail: value.client_email, privateKey: value.private_key };
    } catch {
      return null;
    }
  }
  return {
    projectId: process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  };
}

export function isFirebaseConfigured() {
  const value = credentials();
  const client = firebaseClientConfig();
  return Boolean(value?.projectId && value?.clientEmail && value?.privateKey && client.apiKey && client.authDomain && client.appId);
}

function app() {
  const existing = getApps().find((item) => item.name === "mandir-cms");
  if (existing) return existing;
  const value = credentials();
  if (!value?.projectId || !value.clientEmail || !value.privateKey) throw new Error("Firebase Admin credentials are not configured.");
  return initializeApp({ credential: cert(value), projectId: value.projectId }, "mandir-cms");
}

export function firebaseAuth() { return getAuth(app()); }
export function firestore() { return getFirestore(app()); }

export function allowedAdminEmails() {
  return (process.env.CMS_ADMIN_EMAILS || "govindsharma5768@gmail.com")
    .split(",").map((value) => value.trim().toLowerCase()).filter(Boolean);
}
