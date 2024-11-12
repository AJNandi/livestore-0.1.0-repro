import { useQuery, useRow, useStore } from "@livestore/react"
import { mutations, tables, useClientState, userFavorites$ } from "@repo/livestore"
import { useNavigate } from "@tanstack/react-router"
import { nanoid } from "nanoid"
import { CSSProperties, memo } from "react"
import AutoSizer from "react-virtualized-auto-sizer"
import * as ReactWindow from "react-window"
import { distanceToNowFromMilliseconds } from "../../lib/dates"
import { ColorOnlyPicker, IconPicker } from "../IconPicker/IconPicker"
import { FavoriteButton } from "./FavoriteButton"

const ITEM_HEIGHT = 36

type FileOrFolderWithType = { type: string; isFavorite: boolean; id: string }

export const FileList: React.FC<{ files: readonly string[]; folders: readonly string[] }> = ({ files, folders }) => {
  const favorites = useQuery(userFavorites$)

  const filesWithType = files.map((fileId) => ({ id: fileId, type: "file", isFavorite: favorites.some((favorite) => favorite.fileId === fileId) }))
  const foldersWithType = folders.map((folderId) => ({
    id: folderId,
    type: "folder",
    isFavorite: favorites.some((favorite) => favorite.folderId === folderId),
  }))

  const withType: FileOrFolderWithType[] = [...foldersWithType, ...filesWithType]

  return (
    <div className="w-full h-full">
      <AutoSizer>
        {({ height, width }: { width: number; height: number }) => (
          <ReactWindow.FixedSizeList
            height={height}
            itemCount={withType.length}
            itemSize={ITEM_HEIGHT}
            itemData={withType}
            overscanCount={10}
            width={width}
          >
            {VirtualRow}
          </ReactWindow.FixedSizeList>
        )}
      </AutoSizer>
    </div>
  )
}

const VirtualRow = ({ data, index, style }: { data: readonly FileOrFolderWithType[]; index: number; style: CSSProperties }) => {
  const { type, isFavorite, id } = data[index]

  if (type === "folder") return <VirtualFolderRow folderId={id} style={style} isFavorite={isFavorite} />
  if (type === "file") return <VirtualFileRow fileId={id} style={style} isFavorite={isFavorite} />
  return null
}

const VirtualFolderRow = memo(({ folderId, style, isFavorite }: { folderId: string; style: CSSProperties; isFavorite: boolean }) => {
  const [clientState] = useClientState()

  const navigate = useNavigate()

  const [folder] = useRow(tables.folder, folderId, { defaultValues: { workspaceId: clientState.activeWorkspaceId } })

  const { store } = useStore()

  const handleColorChange = (color: string) => {
    store.mutate(mutations.updateFolderColor({ id: folder.id, color }))
  }

  const favoriteFolder = () => {
    store.mutate(mutations.favoriteFolder({ id: nanoid(), folderId: folder.id, userId: clientState.activeUserId!, workspaceId: folder.workspaceId }))
  }

  const unfavoriteFolder = () => {
    store.mutate(mutations.unfavoriteFolder({ folderId: folder.id, userId: clientState.activeUserId! }))
  }

  return (
    <div
      id={folder.id}
      key={folder.id}
      className="flex cursor-default items-center flex-grow w-full min-w-0 pl-2 pr-8 text-sm border-b border-gray-100 hover:bg-slate-100 h-11 shrink-0 group"
      onClick={() => navigate({ to: `/files/${folder.id}` })}
      style={style}
    >
      <div className="flex-shrink-0 ml-4">
        <FavoriteButton isFavorite={isFavorite} onFavorite={favoriteFolder} onUnfavorite={unfavoriteFolder} />
      </div>
      <div className="flex-shrink-0 ml-3">
        <ColorOnlyPicker folder={folder} onSelectColor={handleColorChange} />
      </div>
      <div className="flex-wrap flex-shrink ml-3 overflow-hidden line-clamp-1 overflow-ellipsis">{folder.name.slice(0, 3000) || ""}</div>
      <div className="flex-shrink-0 hidden w-15 ml-auto font-normal text-xs text-gray-500 sm:block whitespace-nowrap">
        {distanceToNowFromMilliseconds(folder.created)}
      </div>
    </div>
  )
}, ReactWindow.areEqual)

const VirtualFileRow = memo(({ fileId, style, isFavorite }: { fileId: string; style: CSSProperties; isFavorite: boolean }) => {
  const [clientState] = useClientState()

  console.log('clientState.activeWorkspaceId:', clientState.activeWorkspaceId)
  const [file] = useRow(tables.file, fileId, { defaultValues: { workspaceId: clientState.activeWorkspaceId } })

  const navigate = useNavigate()
  const { store } = useStore()

  const handleIconChange = (icon: string) => {
    store.mutate(mutations.updateFileIcon({ id: file.id, icon }))
  }

  const handleColorChange = (color: string) => {
    store.mutate(mutations.updateFileColor({ id: file.id, color }))
  }

  const favoriteFile = () => {
    store.mutate(mutations.favoriteFile({ id: nanoid(), fileId: file.id, userId: clientState.activeUserId!, workspaceId: file.workspaceId }))
  }

  const unfavoriteFile = () => {
    store.mutate(mutations.unfavoriteFile({ fileId: file.id, userId: clientState.activeUserId! }))
  }

  return (
    <div
      id={file.id}
      key={file.id}
      className="flex cursor-default items-center flex-grow w-full min-w-0 pl-2 pr-8 text-sm border-b border-gray-100 hover:bg-slate-100 h-11 shrink-0 group"
      onClick={() => navigate({ to: `/file/${file.id}` })}
      style={style}
    >
      <div className="flex-shrink-0 ml-4">
        <FavoriteButton isFavorite={isFavorite} onFavorite={favoriteFile} onUnfavorite={unfavoriteFile} />
      </div>
      <div className="flex-shrink-0 ml-3">
        <IconPicker file={file} onSelectIcon={handleIconChange} onSelectColor={handleColorChange} />
      </div>
      <div className="flex-wrap flex-shrink ml-3 overflow-hidden line-clamp-1 overflow-ellipsis">{file.name.slice(0, 3000) || ""}</div>
      <div className="flex-shrink-0 hidden w-15 ml-auto font-normal text-xs text-gray-500 sm:block whitespace-nowrap">
        {distanceToNowFromMilliseconds(file.created)}
      </div>
    </div>
  )
}, ReactWindow.areEqual)
