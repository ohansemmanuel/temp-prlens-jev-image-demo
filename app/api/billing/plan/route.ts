import { db } from "@/lib/db";
import { isPlanId, planById } from "@/lib/plans";
import { switchSubscription } from "@/lib/stripe";
import { currentWorkspace } from "@/lib/workspace";

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const requested = typeof body === "object" && body !== null && "plan" in body ? body.plan : undefined;
  if (!isPlanId(requested)) return Response.json({ error: "Pick Starter, Pro or Team" }, { status: 400 });

  const workspace = await currentWorkspace();
  if (requested === workspace.plan) return Response.json({ plan: requested });

  const plan = planById(requested);
  try {
    await switchSubscription(workspace, plan);
  } catch {
    return Response.json({ error: "Stripe could not change the plan. Try again in a minute" }, { status: 502 });
  }
  db.workspaces.setPlan(workspace.id, plan.id);
  return Response.json({ plan: plan.id });
}
