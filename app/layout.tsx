import type { Metadata } from "next";
import Link from "next/link";

import "./globals.css";

export const metadata: Metadata = { title: "acme" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="top">
          <Link href="/" className="logo">
            <i aria-hidden="true" />
            acme
          </Link>
          <nav>
            <a>Projects</a>
            <a>Deploys</a>
            <a>Usage</a>
            <a>Docs</a>
          </nav>
          <span className="avatar" aria-label="Your account" />
        </header>
        {children}
      </body>
    </html>
  );
}
