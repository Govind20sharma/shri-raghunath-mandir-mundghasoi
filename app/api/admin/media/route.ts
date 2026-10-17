import { cmsApi, cmsJson } from "@/lib/cms/api";
import { requireAdmin } from "@/lib/cms/auth";
import { verifyUploadedImage } from "@/lib/cms/cloudinary";
import { CmsError } from "@/lib/cms/errors";
import { assertSameOrigin, readJson } from "@/lib/cms/security";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return cmsApi(async () => {
    assertSameOrigin(request);
    await requireAdmin();
    const input = await readJson(request, 1000) as { publicId?: unknown };
    return cmsJson({ photo: await verifyUploadedImage(input?.publicId) });
  });
}

export async function DELETE(request: Request) {
  return cmsApi(async () => {
    assertSameOrigin(request);
    await requireAdmin();
    throw new CmsError(409, "Use the gallery's Trash action. Files are retained so published content and restored photos remain intact.", "permanent_delete_disabled");
  });
}
