import { useRow } from "@livestore/react"
import { ChevronRightIcon } from "@radix-ui/react-icons"
import { tables, useClientState, useFoldersInFolder, usePersonalFolderId } from "@repo/livestore"
import { Link, ReactNode, useMatchRoute } from "@tanstack/react-router"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { Button } from "../../components/ui/button"
import { Icon } from "../IconPicker/IconPicker"
import WorkspaceDropdown from "../WorkspacePicker/WorkspaceDropdown"
import { SidebarFavorites } from "./SidebarFavorites"

function NestedFolderItem({ folderId }: { folderId: string }) {
  const [clientState] = useClientState()

  const matchRoute = useMatchRoute()
  const match = !!matchRoute({ to: `/files/${folderId}` })

  const [folder] = useRow(tables.folder, folderId, { defaultValues: { workspaceId: clientState.activeWorkspaceId } })

  return (
    <div>
      <Link
        to={`/files/${folder.id}`}
        className={clsx(
          match ? "font-medium bg-slate-200 text-slate-600" : "hover:bg-slate-200/50",
          "pl-6 text-gray-700 flex gap-x-2 py-1.5 text-xs leading-6 px-2 items-center group"
        )}
      >
        <Icon icon={folder.icon ?? "FolderIcon"} color={folder.color ?? ""} />
        <div className={clsx("flex-1")}>{folder.name}</div>
      </Link>
    </div>
  )
}

function SidebarItem({ folderId }: { folderId: string }) {
  const [open, setOpen] = useState(localStorage.getItem("folder-" + folderId) === "true")

  const [clientState] = useClientState()
  const matchRoute = useMatchRoute()
  const match = !!matchRoute({ to: `/files/${folderId}` })

  const [folder] = useRow(tables.folder, folderId, { defaultValues: { workspaceId: clientState.activeWorkspaceId } })

  const foldersInFolder = useFoldersInFolder(folderId)

  useEffect(() => {
    localStorage.setItem("folder-" + folderId, open ? "true" : "false")
  }, [folderId, open])

  return (
    <>
      <Link
        to={`/files/${folderId}`}
        className={clsx(
          match ? "font-medium bg-slate-200 text-slate-600" : "hover:bg-slate-200/50",
          "text-gray-700 flex gap-x-1.5 py-0.5 text-xs leading-6 px-2 items-center group font-semibold"
        )}
      >
        <Button
          variant={"ghost"}
          className="p-0"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setOpen(!open)
          }}
        >
          <ChevronRightIcon className={clsx("h-4 w-4 transition-transform duration-500", open && "transform rotate-90 ")} />
        </Button>
        <div>{folder.name}</div>
      </Link>
      <div className={clsx("overflow-hidden transition-all duration-500", open ? "max-h-96" : "max-h-0")}>
        {foldersInFolder.map((folderId) => (
          <NestedFolderItem key={`folderId-${folderId}`} folderId={folderId} />
        ))}
      </div>
    </>
  )
}

function SidebarGroup({ name, children }: { name?: string; children: ReactNode }) {
  return (
    <div className="">
      <div className="text-xs font-bold pb-1 px-2 py-2">{name}</div>
      {children}
    </div>
  )
}

export default function Sidebar({ onSignOut, fileNavigationHandler }: { fileNavigationHandler: (fileId: string) => void; onSignOut: () => void }) {
  const [clientState] = useClientState()

  const [workspace] = useRow(tables.workspace, clientState.activeWorkspaceId!)

  const personalRootFolder = usePersonalFolderId()

  return (
    <div className="min-w-56 w-72 flex flex-col gap-2 text-lg bg-slate-50">
      <div className="mt-5">
        <WorkspaceDropdown onSignOut={onSignOut} />
      </div>
      <nav className="flex flex-1 flex-col" aria-label="Sidebar">
        <ul role="list" className="space-y-2 divide-y">
          <SidebarGroup>
            <SidebarItem folderId={workspace.rootFolderId} />
          </SidebarGroup>
          <SidebarGroup>{personalRootFolder && <SidebarItem folderId={personalRootFolder} />}</SidebarGroup>
          <SidebarGroup>
            <SidebarFavorites fileNavigationHandler={fileNavigationHandler} />
          </SidebarGroup>
        </ul>
      </nav>
    </div>
  )
}
