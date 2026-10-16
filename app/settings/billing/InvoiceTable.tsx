"use client";

import { useEffect, useState } from "react";

import type { Invoice } from "@/lib/db";
import { dollars, planById } from "@/lib/plans";

const DATE = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export function InvoiceTable() {
  const [invoices, setInvoices] = useState<Invoice[] | null>(null);

  useEffect(() => {
    let live = true;
    fetch("/api/invoices")
      .then((response) => response.json())
      .then((body: { invoices: Invoice[] }) => live && setInvoices(body.invoices));
    return () => {
      live = false;
    };
  }, []);

  return (
    <section aria-label="Invoices">
      <h2>Invoices</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Plan</th>
            <th>Amount</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {invoices === null ? (
            <tr>
              <td colSpan={5} className="muted">
                Loading invoices…
              </td>
            </tr>
          ) : (
            invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{DATE.format(new Date(invoice.issuedAt))}</td>
                <td>{planById(invoice.plan).name}</td>
                <td>{dollars(invoice.amountCents)}</td>
                <td className={invoice.status}>{invoice.status[0].toUpperCase() + invoice.status.slice(1)}</td>
                <td>
                  <a className="pdf" href={invoice.pdfUrl}>
                    PDF ↓
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}
