import { updateDisplayName, updateEmail } from "@repo/instantdb"
import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { User } from "@instantdb/react"

export function CreateProfile({ authUser, onCompleted }: { onCompleted: () => void; authUser: User }) {
  const [displayName, setDisplayName] = useState("")

  return (
    <div className="h-full w-full overflow-y-auto py-36">
      <div className="flex flex-col mx-auto items-center space-y-16 ">
        <div className="space-y-4 mx-auto max-w-md">
          <div className="text-3xl text-heavy">Finish setting up your account</div>
          <div className="space-y-3">
            {/* <div className="">Avatar</div>
            <div>Profile picture</div>
            <div>
              <Input className="bg-white" type="file" title="upload" />
            </div> */}
            <div>
              <ProfileInput
                id={"name"}
                label={"Your name"}
                value={displayName}
                caption="Your display name is visible to others in your workspaces"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const name = e.target.value
                  setDisplayName(name)
                }}
              />
            </div>
          </div>
          <Button
            onClick={() => {
              updateDisplayName(authUser.id, displayName)
              updateEmail(authUser.id, authUser.email)
              onCompleted()
            }}
            className="bg-sky-500 px-16"
            variant={"default"}
            disabled={!displayName}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  )
}

function ProfileInput({
  id,
  label,
  value,
  onChange,
  caption,
  onBlur,
}: {
  id: string
  label: string
  value: string
  caption?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: () => void
}) {
  return (
    <div className="">
      <Label htmlFor={id} className="text-sm font-normal">
        {label}
      </Label>
      <Input
        id={id}
        className="max-w-xs text-xs bg-zinc-100 h-7 rounded-sm shadow-none"
        value={value}
        maxLength={45}
        onChange={onChange}
        onBlur={onBlur}
        autoFocus
      />
      <Label htmlFor={id} className="text-[12px] text-slate-500 font-normal">
        {caption}
      </Label>
    </div>
  )
}
