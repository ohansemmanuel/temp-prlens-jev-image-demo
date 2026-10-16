import type { PlanId } from "./workspace";

export type Plan = {
  id: PlanId;
  name: string;
  priceCents: number;
  blurb: string;
  /** The Stripe price a subscription moves to. Starter is free and has none. */
  stripePrice: string | null;
};

export const PLANS: readonly Plan[] = [
  { id: "starter", name: "Starter", priceCents: 0, blurb: "3 projects · community support", stripePrice: null },
  { id: "pro", name: "Pro", priceCents: 2900, blurb: "Unlimited projects · preview deploys", stripePrice: "price_pro_monthly" },
  { id: "team", name: "Team", priceCents: 9900, blurb: "SSO · audit log · 10 seats", stripePrice: "price_team_monthly" },
];

export function planById(id: PlanId): Plan {
  const plan = PLANS.find((candidate) => candidate.id === id);
  if (!plan) throw new Error(`No plan called ${id}`);
  return plan;
}

export function isPlanId(value: unknown): value is PlanId {
  return PLANS.some((plan) => plan.id === value);
}

export const dollars = (cents: number): string => `$${(cents / 100).toFixed(2)}`;
