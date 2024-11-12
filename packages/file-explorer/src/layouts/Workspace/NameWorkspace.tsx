import { ChevronLeftIcon } from "@radix-ui/react-icons"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"

export default function NameWorkspace({
  name,
  setName,
  onContinue,
  onBack,
}: {
  name: string
  setName: (name: string) => void
  onContinue: () => void
  onBack: () => void
}) {
  return (
    <div>
      <div className="flex flex-col mx-auto items-center pt-32 space-y-16">
        <div className="absolute inset-x-5">
          <Button
            onClick={() => {
              onBack()
            }}
            variant={"ghost"}
          >
            <ChevronLeftIcon className="w-8 h-6" />
          </Button>
        </div>
        <div className="space-y-4 mx-auto max-w-md">
          <div className="text-center space-y-2 ">
            <div className="text-3xl text-heavy">Give your workspace a name</div>
            <div className="text-lg text-slate-500">This helps identify your organization to collaborators</div>
          </div>
          <div className="rounded-lg bg-slate-400 mt-16 w-16 h-16 mx-auto flex items-center justify-center text-white font-light text-3xl">
            {name[0] ?? "S"}
          </div>
          <div className="justify-left">
            <Label htmlFor="name">Workspace name</Label>
            <Input className="bg-white" type="name" id="name" placeholder="Subset Inc." value={name} onChange={(e) => setName(e.target.value)} />
          </div>
        </div>
        <Button
          disabled={name.length === 0}
          onClick={() => {
            onContinue()
          }}
          className="bg-sky-500 px-16"
          variant={"default"}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
