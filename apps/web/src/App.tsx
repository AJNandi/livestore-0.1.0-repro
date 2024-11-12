import { BootStatus } from "@livestore/livestore"
import { LiveStoreProvider } from "@livestore/react"
import { makeAdapter } from "@livestore/web"
import LiveStoreSharedWorker from "@livestore/web/shared-worker?sharedworker"
import { DefaultErrorComponent, DefaultLoadingComponent, ImportModalProvider, TooltipProvider } from "@repo/file-explorer"
import { schema } from "@repo/livestore"
import { createRouter, RouterProvider } from "@tanstack/react-router"
import { unstable_batchedUpdates as batchUpdates } from "react-dom"
import { SkeletonTheme } from "react-loading-skeleton"
import LiveStoreWorker from "./livestore.worker?worker"
import { routeTree } from "./routeTree.gen"

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  defaultPendingComponent: () => <DefaultLoadingComponent show wait="delay-0" />,
  defaultErrorComponent: () => <DefaultErrorComponent />,
})

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const resetPersistence = import.meta.env.DEV && new URLSearchParams(window.location.search).get("reset") !== null

if (resetPersistence) {
  const searchParams = new URLSearchParams(window.location.search)
  searchParams.delete("reset")
  window.history.replaceState(null, "", `${window.location.pathname}?${searchParams.toString()}`)
}

const adapter = makeAdapter({
  worker: LiveStoreWorker,
  sharedWorker: LiveStoreSharedWorker,
  storage: { type: "opfs" },
  // syncing,
  // NOTE this should only be used for convenience when developing (i.e. via `?reset` in the URL) and is disabled in production
  resetPersistence,
})

export default function App() {
  return (
    <div className="h-full w-full bg-slate-200">
      <LiveStoreProvider schema={schema} storeId={"subset-dev-2"} adapter={adapter} renderLoading={renderBootStatus} batchUpdates={batchUpdates}>
        <ImportModalProvider>
          <SkeletonTheme baseColor="#e2e8f0" highlightColor="#cbd5e1">
            <TooltipProvider>
              <RouterProvider router={router} />
            </TooltipProvider>
          </SkeletonTheme>
        </ImportModalProvider>
      </LiveStoreProvider>
    </div>
  )
}

const renderBootStatus = (bootStatus: BootStatus) => {
  console.log('bootStatus:', bootStatus)
  switch (bootStatus.stage) {
    case "loading":
      return <div>Loading LiveStore...</div>
    case "migrating":
      return (
        <div>
          Migrating tables ({bootStatus.progress.done}/{bootStatus.progress.total})
        </div>
      )
    case "rehydrating":
      return (
        <div>
          Rehydrating state ({bootStatus.progress.done}/{bootStatus.progress.total})
        </div>
      )
    case "syncing":
      return (
        <div>
          Syncing state ({bootStatus.progress.done}/{bootStatus.progress.total})
        </div>
      )
    case "done":
      return <div>LiveStore ready</div>
  }
}
