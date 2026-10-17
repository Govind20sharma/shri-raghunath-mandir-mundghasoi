"use client";

import { getApp, getApps, initializeApp, type FirebaseOptions } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";

export type PublicFirebaseConfig = Pick<FirebaseOptions, "apiKey" | "authDomain" | "projectId" | "appId">;

export async function googleIdToken(config: PublicFirebaseConfig) {
  const app = getApps().length ? getApp() : initializeApp(config);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account", login_hint: "govindsharma5768@gmail.com" });
  const result = await signInWithPopup(getAuth(app), provider);
  return result.user.getIdToken(true);
}

export async function signOutFirebase() {
  if (getApps().length) await signOut(getAuth(getApp()));
}
