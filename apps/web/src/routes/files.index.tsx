import { WebImportModal } from "@/components/WebImportModal"
import { ContentSkeleton, FileList, Header, Sidebar } from "@repo/file-explorer"
import { useFilesInFolder, useFoldersInFolder, usePersonalFolderId } from "@repo/livestore"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useCallback } from "react"

export const Route = createFileRoute("/files/")({
  component: FilesIndex,
  pendingComponent: () => <ContentSkeleton />,
})

function FilesIndex() {
  const navigate = useNavigate()

  const fileNavigationHandler = useCallback((fileId: string) => {
    navigate({ to: `/file/$fileId`, params: { fileId } })
  }, [])

  const personalRootFolder = usePersonalFolderId()

  const foldersInFolder = useFoldersInFolder(personalRootFolder)
  const filesInFolder = useFilesInFolder(personalRootFolder)

  return (
    <div className="h-full w-full flex grow divide-x divide-gray-200 bg-slate-50">
      <Sidebar fileNavigationHandler={fileNavigationHandler} onSignOut={() => {}} />
      <div className="h-full w-full">
        <div className="flex p-6">
          <Header fileNavigationHandler={fileNavigationHandler} folderId={personalRootFolder} />
        </div>
        <FileList files={filesInFolder} folders={foldersInFolder} />
      </div>
      <WebImportModal />
    </div>
  )
}
