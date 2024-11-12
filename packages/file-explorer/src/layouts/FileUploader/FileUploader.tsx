import { CheckCircle, ExternalLink, FileIcon, Loader2, XCircle } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { useImportModal } from "../../hooks/useImportModal"

// eslint-disable-next-line
export function isSupportedFileExtension(extension: string | undefined): extension is SupportedFileExtensions {
  if (!extension) return false
  return extension.toLowerCase() === "csv" || extension.toLowerCase() === "sub" || extension.toLowerCase() === "xlsx"
}

export type SupportedFileExtensions = "csv" | "sub" | "xlsx"

export type UploadStatus = "waiting" | "uploading" | "creatingFile" | "savingToIDB" | "success" | "error"
``
export type UploadingFile = {
  file?: File
  extension: SupportedFileExtensions
  binary?: Uint8Array
  name: string
  id: string
  status: UploadStatus
}

const StatusIcon = (file: UploadingFile) => {
  switch (file.status) {
    case "uploading":
    case "creatingFile":
    case "savingToIDB":
      return <Loader2 className="h-4 w-4 animate-spin text-primary" />
    case "success":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "waiting":
      return <div className="w-4"></div>
    case "error":
      return <XCircle className="h-4 w-4 text-red-500" />
  }
}

export const FileUploadInput = () => {
  return (
    <div className="outline-[2px] outline-slate-100 p-4 rounded-md">
      <Input
        type="file"
        multiple
        onChange={() => {
          // TODO
        }}
        accept=".sub,.csv,.xlsx"
      />
    </div>
  )
}

export const FileUploadList = ({ onOpenFile }: { onOpenFile: (id: string) => void }) => {
  const { setOpen, files, setFiles } = useImportModal()

  return (
    <div className="space-y-2">
      {files.map((file) => {
        if (!file) return null
        return (
          <FileUploadItem
            key={file.id}
            file={file}
            openFile={(fileId: string) => {
              setOpen(false)
              setFiles([])
              onOpenFile(fileId)
            }}
            importFile={async () => {
              // TODO
            }}
          />
        )
      })}
    </div>
  )
}

export const FileUploadItem = ({ file, openFile, importFile }: { file: UploadingFile; openFile: (id: string) => void; importFile: () => void }) => {
  return (
    <div className="flex items-center space-x-2 p-2 border rounded-md">
      {StatusIcon(file)}
      <FileIcon className="h-4 w-4 text-primary" />
      <span className="flex-grow truncate" title={file.name}>
        {file.name}
      </span>
      {file.status === "waiting" && (
        <Button size="sm" variant="sky" onClick={() => importFile()} aria-label={`Open ${file.name}`}>
          Import
        </Button>
      )}
      {file.status === "success" && (
        <Button className="space-x-2" size="sm" variant="sky" onClick={() => openFile(file.id)} aria-label={`Open ${file.name}`}>
          <span>Open</span>
          <ExternalLink className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
