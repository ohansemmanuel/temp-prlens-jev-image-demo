import type { Plan } from "./plans";
import type { Workspace } from "./workspace";

const STRIPE_API = "https://api.stripe.com/v1";

/**
 * Moves the workspace's subscription to the plan's price, prorating the
 * difference onto the next invoice. Without a key the demo skips Stripe
 * and only the local record changes.
 */
export async function switchSubscription(workspace: Workspace, plan: Plan): Promise<void> {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || !workspace.stripeSubscriptionId) return;

  const path = `${STRIPE_API}/subscriptions/${workspace.stripeSubscriptionId}`;
  const response = plan.stripePrice
    ? await fetch(path, {
        method: "POST",
        headers: { authorization: `Bearer ${key}`, "content-type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ "items[0][price]": plan.stripePrice, proration_behavior: "create_prorations" }),
      })
    : await fetch(path, { method: "DELETE", headers: { authorization: `Bearer ${key}` } });

  if (!response.ok) throw new Error(`Stripe answered ${response.status}`);
}
