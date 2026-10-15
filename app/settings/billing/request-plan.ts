import type { PlanId } from "@/lib/workspace";

export async function requestPlan(plan: PlanId): Promise<void> {
  const response = await fetch("/api/billing/plan", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ plan }),
  });
  if (!response.ok) {
    const body: { error?: string } = await response.json().catch(() => ({}));
    throw new Error(body.error ?? "The plan did not change");
  }
}
