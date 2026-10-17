import { cmsApi, cmsJson } from "@/lib/cms/api";
import { getAdminUser } from "@/lib/cms/auth";
import { firebaseClientConfig, isFirebaseConfigured } from "@/lib/cms/firebase";
import { isCloudinaryConfigured } from "@/lib/cms/cloudinary";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return cmsApi(async () => {
    const firebaseConfigured = isFirebaseConfigured();
    const cloudinaryConfigured = isCloudinaryConfigured();
    return cmsJson({ configured: firebaseConfigured && cloudinaryConfigured, firebaseConfigured, cloudinaryConfigured, firebaseConfig: firebaseClientConfig(), user: await getAdminUser() });
  });
}
