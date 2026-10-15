import { db } from "@/lib/db";
import { currentWorkspace } from "@/lib/workspace";

export async function GET() {
  const workspace = await currentWorkspace();
  return Response.json({ invoices: db.invoices.forWorkspace(workspace.id) });
}
