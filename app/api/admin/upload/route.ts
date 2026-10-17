import { cmsApi, cmsJson } from "@/lib/cms/api";
import { requireAdmin } from "@/lib/cms/auth";
import { createSignedUpload } from "@/lib/cms/cloudinary";
import { assertSameOrigin, readJson, validateUploadInput } from "@/lib/cms/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return cmsApi(async () => {
    assertSameOrigin(request);
    const user = await requireAdmin();
    return cmsJson(await createSignedUpload(validateUploadInput(await readJson(request, 3000)), user.email));
  });
}
