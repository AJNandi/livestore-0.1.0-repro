import React, { createContext, useContext, useState, ReactNode } from "react"
import { UploadingFile, UploadStatus } from "../layouts/FileUploader/FileUploader"

// Define the shape of the context
interface ImportModalContextType {
  open: boolean
  setOpen: (open: boolean) => void
  files: UploadingFile[]
  setFiles: React.Dispatch<React.SetStateAction<UploadingFile[]>>
  updateFileStatus: (id: string, status: UploadStatus) => void
  addBinaryDataToFile: (id: string, binary: Uint8Array) => void
}

// Create the context with default values
const ImportModalContext = createContext<ImportModalContextType | undefined>(undefined)

// Create a provider component
export const ImportModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false)
  const [files, setFiles] = useState<UploadingFile[]>([])

  const updateFileStatus = (id: string, status: UploadingFile["status"]) => {
    setFiles((prevFiles) =>
      prevFiles.map((f) => {
        if (f.id === id) {
          return { ...f, status }
        }
        return f
      })
    )
  }

  const addBinaryDataToFile = (id: string, binary: Uint8Array) => {
    setFiles((prevFiles) =>
      prevFiles.map((f) => {
        if (f.id === id) {
          return { ...f, binary }
        }
        return f
      })
    )
  }

  return (
    <ImportModalContext.Provider value={{ open, setOpen, files, setFiles, updateFileStatus, addBinaryDataToFile }}>
      {children}
    </ImportModalContext.Provider>
  )
}

// Create a custom hook to use the ImportModalContext
export const useImportModal = (): ImportModalContextType => {
  const context = useContext(ImportModalContext)
  if (context === undefined) {
    throw new Error("useImportModal must be used within an ImportModalProvider")
  }
  return context
}
