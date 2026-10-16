import { planById } from "@/lib/plans";
import { currentWorkspace } from "@/lib/workspace";

import { InvoiceTable } from "./InvoiceTable";
import { PlanPicker } from "./PlanPicker";
import { UpgradeBanner } from "./UpgradeBanner";

const DAY_MS = 24 * 60 * 60 * 1000;

export default async function BillingPage() {
  const workspace = await currentWorkspace();
  const plan = planById(workspace.plan);
  const daysLeft = workspace.trialEndsAt === null ? null : Math.max(0, Math.ceil((Date.parse(workspace.trialEndsAt) - Date.now()) / DAY_MS));

  return (
    <>
      <h1>Billing</h1>
      {daysLeft !== null && <UpgradeBanner plan={plan.id} planName={plan.name} daysLeft={daysLeft} />}
      <PlanPicker current={workspace.plan} />
      <InvoiceTable />
    </>
  );
}
