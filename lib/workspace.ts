export type PlanId = "starter" | "pro" | "team";

export type Workspace = {
  id: string;
  name: string;
  plan: PlanId;
  /** Set while the workspace is trying a paid plan. */
  trialEndsAt: string | null;
  seats: { used: number; limit: number };
};

// One signed-in workspace is enough for this demo. A real app reads it from the session.
export async function currentWorkspace(): Promise<Workspace> {
  return {
    id: "ws_acme",
    name: "acme",
    plan: "pro",
    trialEndsAt: "2026-10-24T00:00:00.000Z",
    seats: { used: 4, limit: 5 },
  };
}
