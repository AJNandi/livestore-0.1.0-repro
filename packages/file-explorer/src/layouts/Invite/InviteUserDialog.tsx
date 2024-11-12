import { JazzWorkspace, shareWorkspace, useAccount } from "@repo/jazz"
import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"

export function InviteUserDialog({ customText, workspace }: { customText?: React.ReactNode; workspace: JazzWorkspace }) {
  const { me } = useAccount({ profile: true, root: {} })
  const [email, setEmail] = useState("")

  const [open, setOpen] = useState(false)

  if (!me) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="sky">{customText || "Invite to workspace"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite to workspace</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Email
            </Label>
            <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3" placeholder="Enter an email..." />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={async () => {
              // await inviteUser()
              const link = shareWorkspace(workspace, "writer")
              if (link) {
                navigator.clipboard.writeText(link)
              }
              setOpen(false)
            }}
          >
            Copy link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
