import { db } from "./db";

export type PlanId = "starter" | "pro" | "team";

export type Workspace = {
  id: string;
  name: string;
  plan: PlanId;
  /** Set while the workspace is trying a paid plan. */
  trialEndsAt: string | null;
  seats: { used: number; limit: number };
  stripeSubscriptionId: string | null;
};

// One signed-in workspace is enough for this demo. A real app reads it from the session.
export async function currentWorkspace(): Promise<Workspace> {
  const workspace = db.workspaces.find("ws_acme");
  if (!workspace) throw new Error("The demo workspace is missing");
  return workspace;
}
