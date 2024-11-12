import { useRow } from "@livestore/react"
import { DefaultLoadingComponent } from "@repo/file-explorer"
import { tables, useClientState } from "@repo/livestore"
import { createFileRoute } from "@tanstack/react-router"
import { useEffect } from "react"
import { z } from "zod"

export const Route = createFileRoute("/file/$fileId")({
  parseParams: (params) => ({
    fileId: z.string().parse(params.fileId),
  }),
  component: FileComponent,
})

function FileComponent() {
  const { fileId } = Route.useParams()
  const [clientState] = useClientState()

  const [file] = useRow(tables.file, fileId, {
    defaultValues: {
      workspaceId: clientState.activeWorkspaceId,
    },
  })

  useEffect(() => {
    if (file && file.name) {
      window.document.title = `${file.name} – Subset`
    }
  }, [file?.name])

  if (file === null) {
    return <DefaultLoadingComponent />
  }

  if (!file) {
    return <div>File not found</div>
  }

  return <div>Editor goes here</div>
}
