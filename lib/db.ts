import type { PlanId, Workspace } from "./workspace";

export type Invoice = {
  id: string;
  workspaceId: string;
  issuedAt: string;
  plan: PlanId;
  amountCents: number;
  status: "paid" | "open" | "void";
  pdfUrl: string;
};

// An in-memory stand-in for the database, seeded with one workspace and its history.
const workspaces = new Map<string, Workspace>([
  [
    "ws_acme",
    {
      id: "ws_acme",
      name: "acme",
      plan: "pro",
      trialEndsAt: "2026-10-24T00:00:00.000Z",
      seats: { used: 4, limit: 5 },
      stripeSubscriptionId: "sub_acme",
    },
  ],
]);

const invoices: Invoice[] = [
  { id: "in_003", workspaceId: "ws_acme", issuedAt: "2026-10-01", plan: "pro", amountCents: 2900, status: "paid", pdfUrl: "/invoices/in_003.pdf" },
  { id: "in_002", workspaceId: "ws_acme", issuedAt: "2026-09-01", plan: "pro", amountCents: 2900, status: "paid", pdfUrl: "/invoices/in_002.pdf" },
  { id: "in_001", workspaceId: "ws_acme", issuedAt: "2026-08-01", plan: "starter", amountCents: 0, status: "paid", pdfUrl: "/invoices/in_001.pdf" },
];

export const db = {
  workspaces: {
    find: (id: string): Workspace | undefined => workspaces.get(id),
    setPlan(id: string, plan: PlanId): void {
      const workspace = workspaces.get(id);
      if (workspace) workspaces.set(id, { ...workspace, plan, trialEndsAt: null });
    },
  },
  invoices: {
    forWorkspace: (workspaceId: string): Invoice[] =>
      invoices.filter((invoice) => invoice.workspaceId === workspaceId).sort((a, b) => b.issuedAt.localeCompare(a.issuedAt)),
  },
};
