import { Dialog, DialogContent, DialogTitle, FileUploadInput, FileUploadList, useImportModal } from "@repo/file-explorer"
import { useNavigate } from "@tanstack/react-router"

export function WebImportModal() {
  const navigate = useNavigate()

  const { open, setOpen, setFiles } = useImportModal()

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
        if (!open) {
          setFiles([])
        }
      }}
    >
      <DialogContent className="" aria-describedby={undefined}>
        <DialogTitle>Import</DialogTitle>
        <FileUploadInput />
        <FileUploadList
          onOpenFile={(id: string) => {
            navigate({ to: `/file/${id}` })
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
