import { BuildingOffice2Icon, FaceSmileIcon } from "@heroicons/react/24/outline"
import { ChevronLeftIcon } from "@radix-ui/react-icons"
import clsx from "clsx"
import { Button } from "../../components/ui/button"
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group"
import { useClientState } from "@repo/livestore"

const isDev = import.meta.env.DEV

function Icon({ type }: { type: "team" | "personal" }) {
  if (type === "team") {
    return <BuildingOffice2Icon className="h-8 w-8" />
  } else {
    return <FaceSmileIcon className="h-8 w-8" />
  }
}

function WorkspaceTile({
  description,
  title,
  type,
  selected,
  setSelected,
}: {
  description: string
  title: string
  selected: boolean
  type: "team" | "personal"
  setSelected: (type: "team" | "personal") => void
}) {
  return (
    <div className="space-y-2">
      <Button
        onClick={() => {
          setSelected(type)
        }}
        variant={"outline"}
        className={clsx("p-4 text-center items-center justify-center space-y-2 w-56 h-72 flex-col text-wrap", selected && "outline outline-sky-500")}
      >
        <Icon type={type} />
        <div className="font-bold text-lg">{title}</div>
        <div>{description}</div>
      </Button>
      <RadioGroupItem className={clsx("w-6 h-6 text-sky-500 border-2", selected && "border-sky-500")} value={type} id={type} />
    </div>
  )
}

export default function SelectWorkspaceType({
  type,
  updateType,
  onContinue,
  onBack,
}: {
  type: "team" | "personal"
  updateType: (type: "team" | "personal") => void
  onContinue: () => void
  onBack: () => void
}) {
  const [, setClientState] = useClientState()

  return (
    <div className="h-full w-full overflow-y-auto py-36">
      <div className="flex flex-col mx-auto items-center space-y-16 ">
        <div className="absolute inset-x-5">
          <Button
            onClick={() => {
              onBack()
            }}
            variant={"ghost"}
          >
            <ChevronLeftIcon className="w-8 h-6" />
          </Button>

          {isDev && (
            <Button
              onClick={() => {
                setClientState((_) => ({ ..._, activeWorkspaceId: undefined, activeUserId: undefined }))
              }}
            >
              Logout
            </Button>
          )}
        </div>
        <div className="text-center space-y-4 mx-auto max-w-md">
          <div className="text-3xl text-heavy">How do you want to use Subset?</div>
          <div className="text-xl text-slate-500">This helps customize your experience</div>
          <RadioGroup value={type} onValueChange={(e) => updateType(e as "team" | "personal")}>
            <div className="flex space-x-4 font-normal text-sm">
              <WorkspaceTile
                setSelected={updateType}
                description="Collaborate on projects, share files, work with internal data."
                title="For my team"
                selected={type == "team"}
                type="team"
              />
              <WorkspaceTile
                setSelected={updateType}
                description="Budget, manage personal portfolios, track expenses."
                title="For personal use"
                selected={type == "personal"}
                type="personal"
              />
            </div>
          </RadioGroup>
        </div>
        <Button
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
