import clsx from "clsx"
import { Avatar, AvatarFallback } from "../../components/ui/avatar"
import { getInitials } from "../../lib/user"
import { useRow } from "@livestore/react"
import { tables } from "@repo/livestore"

export default function WorkspaceTile({ id }: { id: string }) {
  const [workspace] = useRow(tables.workspace, id)

  return (
    <div className="flex items-center space-x-2">
      <Avatar className="rounded-sm h-7 w-7 text-[10px]">
        {/* <AvatarImage src={user?.picture} /> */}
        <AvatarFallback className={clsx("rounded-sm text-white bg-sky-600")}>{getInitials(workspace.name)}</AvatarFallback>
      </Avatar>
      <span className="max-w-36 truncate">{workspace.name ?? ""}</span>
    </div>
  )
}
