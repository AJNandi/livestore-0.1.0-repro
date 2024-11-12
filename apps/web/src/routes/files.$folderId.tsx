import { ContentSkeleton, FileList, Header, Sidebar } from "@repo/file-explorer"
import { useFilesInFolder, useFoldersInFolder } from "@repo/livestore"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useCallback } from "react"
import { WebImportModal } from "../components/WebImportModal"

export const Route = createFileRoute("/files/$folderId")({
  component: Files,
  pendingComponent: () => <ContentSkeleton />,
})

function Files() {
  const { folderId } = Route.useParams()

  const navigate = useNavigate()

  const fileNavigationHandler = useCallback((fileId: string) => {
    navigate({ to: `/file/$fileId`, params: { fileId } })
  }, [])

  const foldersInFolder = useFoldersInFolder(folderId)
  const filesInFolder = useFilesInFolder(folderId)

  return (
    <div className="h-full w-full flex grow divide-x divide-gray-200 bg-slate-50">
      <Sidebar fileNavigationHandler={fileNavigationHandler} onSignOut={() => {}} />
      <div className="h-full w-full">
        <div className="flex p-6">
          <Header fileNavigationHandler={fileNavigationHandler} folderId={folderId} />
        </div>
        <FileList files={filesInFolder} folders={foldersInFolder} />
      </div>
      <WebImportModal />
    </div>
  )
}
