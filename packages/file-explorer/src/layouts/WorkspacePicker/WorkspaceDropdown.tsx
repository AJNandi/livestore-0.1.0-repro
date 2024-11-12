import { ArrowRightStartOnRectangleIcon, BuildingOffice2Icon, ChevronDownIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/outline"
import { useQuery, useRow } from "@livestore/react"
import { tables, useClientState, userWorkspaceIds$ } from "@repo/livestore"
import { useNavigate } from "@tanstack/react-router"
import clsx from "clsx"
import { Avatar, AvatarFallback } from "../../components/ui/avatar"
import { Button } from "../../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { getInitials } from "../../lib/user"
import WorkspaceTile from "./WorkspaceTile"

export default function WorkspaceDropdown({ onSignOut }: { onSignOut: () => void }) {
  const navigate = useNavigate()
  const [clientState, setClientState] = useClientState()

  const [activeWorkspace] = useRow(tables.workspace, clientState.activeWorkspaceId!)

  const workspaceIds = useQuery(userWorkspaceIds$)

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="pl-2 pr-4 space-x-1 justify-start w-full rounded-none hover:bg-slate-200/50 focus:outline-0">
            <>
              <Avatar className="rounded-sm h-7 w-7 text-[10px]">
                <AvatarFallback className={clsx("rounded-sm text-white", "bg-sky-500")}>{getInitials(activeWorkspace.name)}</AvatarFallback>
              </Avatar>
              <span className="pl-1 max-w-36 truncate text-[11px]">{activeWorkspace.name}</span>
              <ChevronDownIcon className="w-3" />
            </>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" collisionPadding={6}>
          <DropdownMenuGroup className="max-h-[256px] overflow-y-auto">
            {workspaceIds.map((id) => (
              <DropdownMenuItem
                key={id}
                onSelect={() => {
                  setClientState((_) => ({ ..._, activeWorkspaceId: id }))
                  navigate({ to: `/files` })
                }}
                className={clsx(clientState.activeWorkspaceId === id && "bg-slate-200/50")} // Highlight the active workspace
              >
                <WorkspaceTile id={id} />
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => {
              navigate({ to: `/onboarding` })
            }}
          >
            <BuildingOffice2Icon className="w-4 mr-2" />
            Create a new workspace
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <ClipboardDocumentListIcon className="w-4 mr-2" />
            Getting started
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => {
              setClientState((_) => ({ ..._, activeWorkspaceId: undefined, activeUserId: undefined }))
              onSignOut()
            }}
          >
            <ArrowRightStartOnRectangleIcon className="w-4 mr-2" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
