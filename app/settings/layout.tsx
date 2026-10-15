import { SettingsNav } from "./SettingsNav";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="wrap">
      <SettingsNav />
      <main className="main">{children}</main>
    </div>
  );
}
