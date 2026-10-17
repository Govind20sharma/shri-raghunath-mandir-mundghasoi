import { cmsApi, cmsJson } from "@/lib/cms/api";
import { requireAdmin } from "@/lib/cms/auth";
import { assertSameOrigin, readJson } from "@/lib/cms/security";
import { getDraftContent, saveDraftContent } from "@/lib/cms/server";
import { validateContent, validateRevision } from "@/lib/cms/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return cmsApi(async () => { await requireAdmin(); return cmsJson(await getDraftContent()); });
}

export async function PUT(request: Request) {
  return cmsApi(async () => {
    assertSameOrigin(request);
    await requireAdmin();
    const input = await readJson(request) as { content?: unknown; revision?: unknown };
    return cmsJson(await saveDraftContent(validateContent(input?.content), validateRevision(input?.revision)));
  });
}
