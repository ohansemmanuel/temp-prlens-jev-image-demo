"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SECTIONS = [
  { href: "/settings/general", label: "General" },
  { href: "/settings/members", label: "Members" },
  { href: "/settings/billing", label: "Billing" },
  { href: "/settings/api-keys", label: "API keys" },
  { href: "/settings/integrations", label: "Integrations" },
  { href: "/settings/audit-log", label: "Audit log" },
];

export function SettingsNav() {
  const path = usePathname();
  return (
    <nav className="side">
      {SECTIONS.map((section) => (
        <Link key={section.href} href={section.href} className={path === section.href ? "on" : undefined}>
          {section.label}
        </Link>
      ))}
    </nav>
  );
}
