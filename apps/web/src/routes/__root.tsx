import { Auth, WorkspaceSelector } from "@repo/file-explorer"
import { useClientState } from "@repo/livestore"
import { Outlet, createRootRoute } from "@tanstack/react-router"

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const [clientState] = useClientState()

  if (!clientState.activeUserId) {
    return <Auth />
  }

  if (!clientState.activeWorkspaceId) {
    return <WorkspaceSelector />
  }

  return <Outlet />
}
