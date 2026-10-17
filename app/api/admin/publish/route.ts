import { cmsApi, cmsJson } from "@/lib/cms/api";
import { requireAdmin } from "@/lib/cms/auth";
import { assertSameOrigin, readJson } from "@/lib/cms/security";
import { publishDraftContent } from "@/lib/cms/server";
import { validateRevision } from "@/lib/cms/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  return cmsApi(async () => {
    assertSameOrigin(request);
    await requireAdmin();
    const input = await readJson(request, 1000) as { revision?: unknown };
    return cmsJson(await publishDraftContent(validateRevision(input?.revision)));
  });
}
