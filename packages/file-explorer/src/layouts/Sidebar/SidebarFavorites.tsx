import { useQuery, useRow, useStore } from "@livestore/react"
import { ChevronRightIcon, StarFilledIcon } from "@radix-ui/react-icons"
import { Favorite, mutations, tables, useClientState, userFavorites$ } from "@repo/livestore"
import { Link, useMatchRoute } from "@tanstack/react-router"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { Button } from "../../components/ui/button"
import { Icon } from "../IconPicker/IconPicker"

function SidebarFavFile({
  fileNavigationHandler,
  fileId,
  favoriteId,
}: {
  fileId: string
  favoriteId: string
  fileNavigationHandler: (fileId: string) => void
}) {
  const { store } = useStore()
  const [clientState] = useClientState()
  const [file] = useRow(tables.file, fileId, { defaultValues: { workspaceId: clientState.activeWorkspaceId } })

  return (
    <div
      className={clsx("hover:bg-slate-200/50 text-gray-700 flex gap-x-2 py-0.5 text-xs leading-6 px-2 items-center group pl-6")}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        fileNavigationHandler(fileId)
      }}
    >
      <Icon icon={file.icon} color={file.color} />
      <div className={clsx("flex-1 cursor-pointer")}>{file.name}</div>
      <button
        className="mr-4"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          console.log("favoriteId:", favoriteId)
          store.mutate(mutations.unfavoriteFile({ fileId: file.id, userId: clientState.activeUserId! }))
        }}
      >
        <StarFilledIcon className="text-yellow-500 group-hover:opacity-100 opacity-0" />
      </button>
    </div>
  )
}

function SidebarFavFolder({ folderId }: { favoriteId: string; folderId: string }) {
  const matchRoute = useMatchRoute()
  const match = !!matchRoute({ to: `/files/${folderId}` })
  const { store } = useStore()
  const [clientState] = useClientState()

  const [folder] = useRow(tables.folder, folderId, { defaultValues: { workspaceId: clientState.activeWorkspaceId } })

  return (
    <Link
      className={clsx(
        match ? "font-medium bg-slate-200 text-slate-600" : "hover:bg-slate-200/50",
        "hover:bg-slate-200/50 text-gray-700 flex gap-x-2 py-0.5 text-xs leading-6 px-2 items-center group pl-6"
      )}
      to={`/files/${folderId}`}
    >
      <Icon icon={folder.icon} color={folder.color} />
      <div className={clsx("flex-1")}>{folder.name}</div>
      <button
        className="mr-4"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          store.mutate(mutations.unfavoriteFolder({ folderId: folder.id, userId: clientState.activeUserId! }))
        }}
      >
        <StarFilledIcon className="text-yellow-500 group-hover:opacity-100 opacity-0" />
      </button>
    </Link>
  )
}

function SidebarFavItem({ fileNavigationHandler, fav }: { fav: Favorite; fileNavigationHandler: (fileId: string) => void }) {
  if (fav.fileId) {
    return <SidebarFavFile fileNavigationHandler={fileNavigationHandler} fileId={fav.fileId} favoriteId={fav.id} />
  }

  if (fav.folderId) {
    return <SidebarFavFolder favoriteId={fav.id} folderId={fav.folderId} />
  }

  return null
}

export function SidebarFavorites({ fileNavigationHandler }: { fileNavigationHandler: (fileId: string) => void }) {
  const [open, setOpen] = useState(localStorage.getItem("favorites-open") === "true")

  useEffect(() => {
    localStorage.setItem("favorites-open", open ? "true" : "false")
  }, [open])

  const favorites: readonly Favorite[] = useQuery(userFavorites$)

  return (
    <>
      <Button
        className={clsx(
          "text-gray-700 flex gap-x-1.5 py-0.5 text-xs leading-6 px-2 items-center group font-semibold w-full text-left justify-start rounded-none"
        )}
        variant={"ghost"}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setOpen(!open)
        }}
      >
        <ChevronRightIcon className={clsx("h-4 w-4 transition-transform duration-500", open && "transform rotate-90 ")} />
        <div>Favorites</div>
      </Button>
      <div className={clsx("overflow-hidden transition-all duration-500", open ? "max-h-96" : "max-h-0")}>
        {favorites.map((fav) => (
          <SidebarFavItem key={fav.id} fav={fav} fileNavigationHandler={fileNavigationHandler} />
        ))}
      </div>
    </>
  )
}
