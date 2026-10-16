"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { PLANS, type Plan } from "@/lib/plans";
import type { PlanId } from "@/lib/workspace";

import { requestPlan } from "./request-plan";

export function PlanPicker({ current }: { current: PlanId }) {
  const router = useRouter();
  const [pending, setPending] = useState<PlanId | null>(null);
  const [error, setError] = useState<string | null>(null);
  const currentIndex = PLANS.findIndex((plan) => plan.id === current);

  async function choose(plan: Plan) {
    setPending(plan.id);
    setError(null);
    try {
      await requestPlan(plan.id);
      router.refresh();
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "The plan did not change");
    } finally {
      setPending(null);
    }
  }

  return (
    <section aria-label="Plans">
      <div className="plans">
        {PLANS.map((plan, index) => (
          <article key={plan.id} className={plan.id === current ? "plan current" : "plan"}>
            <h3>
              {plan.name}
              {plan.id === current && <span>Current</span>}
            </h3>
            <div className="price">
              ${plan.priceCents / 100}
              <small> /mo</small>
            </div>
            <p>{plan.blurb}</p>
            <button type="button" disabled={pending !== null} onClick={() => choose(plan)}>
              {pending === plan.id ? "Switching…" : plan.id === current ? "Manage" : index < currentIndex ? "Downgrade" : "Upgrade"}
            </button>
          </article>
        ))}
      </div>
      {error && <p className="error">{error}</p>}
    </section>
  );
}
