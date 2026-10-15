import { currentWorkspace } from "@/lib/workspace";

export default async function GeneralPage() {
  const workspace = await currentWorkspace();
  return (
    <>
      <h1>General</h1>
      <p className="muted">Workspace name: {workspace.name}</p>
    </>
  );
}
