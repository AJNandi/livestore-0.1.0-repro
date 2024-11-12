import { FolderPlusIcon } from "@heroicons/react/16/solid"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { useStore } from "@livestore/react"
import { mutations, useClientState } from "@repo/livestore"
import { nanoid } from "nanoid"

export default function FolderCreateDialog({ parentFolderId }: { parentFolderId: string }) {
  const { store } = useStore()
  const [clientState] = useClientState()
  
  const [isDialogOpen, setDialogOpen] = useState(false)
  
  const [folderName, setFolderName] = useState("Untitled")
  
  const createFolder = () => {
    store.mutate(mutations.createFolderWithMembership({
      id: nanoid(),
      membershipId: nanoid(),
      userId: clientState.activeUserId!,
      workspaceId: clientState.activeWorkspaceId!,
      parentFolderId,
      name: folderName,
      created: Date.now(),
      modified: Date.now(),
    }))
    setDialogOpen(false)
    setFolderName("Untitled")
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex">
          {" "}
          <FolderPlusIcon className="w-5 mr-2" />
          New Folder
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Name this folder</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              name="name"
              value={folderName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFolderName(e.target.value)}
              className="col-span-3"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  createFolder()
                }
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={async () => {
              createFolder()
            }}
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
