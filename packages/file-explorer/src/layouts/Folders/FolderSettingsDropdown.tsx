import { ArrowUpTrayIcon, ChevronDownIcon, TrashIcon } from "@heroicons/react/24/outline"
import { Pencil2Icon } from "@radix-ui/react-icons"
import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"

export default function FolderSettingsDropdown({ folder }: { folder: { id: string; name: string } }) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [isDialogOpen, setDialogOpen] = useState(false)

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className=" h-8 w-8 p-0 px-1 space-x-2">
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-48" align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                setOpen(false)
                setDialogOpen(true)
              }}
            >
              <Pencil2Icon className="w-4 mr-2" />
              Rename this folder
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled
              onClick={() => {
                setOpen(false)
              }}
            >
              <ArrowUpTrayIcon className="w-4 mr-2" />
              Share
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              // deleteFolder(folder)
              console.log("delete folder")
              navigate({ to: "/files" })
            }}
            className="text-red-500"
          >
            <TrashIcon className="w-4 mr-2" />
            Delete
            {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Rename this folder</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                name="name"
                value={folder.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => (folder.name = e.target.value)}
                className="col-span-3"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setDialogOpen(false)
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={async () => {
                setDialogOpen(false)
              }}
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
