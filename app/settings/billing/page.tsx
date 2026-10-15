import { currentWorkspace } from "@/lib/workspace";

const PLAN_NAMES = { starter: "Starter", pro: "Pro", team: "Team" } as const;

export default async function BillingPage() {
  const workspace = await currentWorkspace();
  return (
    <>
      <h1>Billing</h1>
      <section className="card">
        <h2>Current plan</h2>
        <p>
          You&apos;re on <b>{PLAN_NAMES[workspace.plan]}</b>. To change your plan or get a copy of an invoice, email{" "}
          <a href="mailto:billing@acme.dev">billing@acme.dev</a>.
        </p>
      </section>
    </>
  );
}
