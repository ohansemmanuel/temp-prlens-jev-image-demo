"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { PlanId } from "@/lib/workspace";

import { requestPlan } from "./request-plan";

/** Shown while a trial runs, so the workspace can keep the plan before the trial ends. */
export function UpgradeBanner({ plan, planName, daysLeft }: { plan: PlanId; planName: string; daysLeft: number }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function upgrade() {
    setBusy(true);
    try {
      await requestPlan(plan);
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="banner" role="status">
      <span>
        You&apos;re on the <b>{planName} trial</b> · {daysLeft} {daysLeft === 1 ? "day" : "days"} left
      </span>
      <button type="button" disabled={busy} onClick={upgrade}>
        {busy ? "Upgrading…" : `Upgrade to ${planName}`}
      </button>
    </div>
  );
}
