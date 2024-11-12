import { Schema } from "effect"
import { querySQL, sql } from "@livestore/livestore"
import { useScopedQuery } from "@livestore/react"
import { CaretRightIcon } from "@radix-ui/react-icons"
import { Link } from "@tanstack/react-router"
import { Button } from "../../components/ui/button"
import FolderSettingsDropdown from "../Folders/FolderSettingsDropdown"

function FolderLink({ folder }: { folder: { id: string; name: string } }) {
  return (
    <Button variant={"ghost"} className="h-7 p-1" asChild>
      <Link to={`/files/${folder.id}`} className="group space-x-2">
        <span>{folder.name}</span>
      </Link>
    </Button>
  )
}

const FolderDivider = () => (
  <span className="text-slate-700">
    <CaretRightIcon />
  </span>
)

export function FolderPath({ folderId }: { folderId: string }) {
  const folderNames = useScopedQuery(
    () =>
      querySQL(
        () => sql`
        WITH RECURSIVE folder_hierarchy AS (
          -- Anchor member: start with the folder you want to find the parents for
          SELECT id, name, parentFolderId
          FROM folder
          WHERE id = '${folderId}' -- Replace with the ID of the folder you want to start from
          
          UNION ALL
          
          -- Recursive member: find the parent folder and repeat
          SELECT f.id, f.name, f.parentFolderId
          FROM folder f
          INNER JOIN folder_hierarchy fh ON f.id = fh.parentFolderId
          )
          
          SELECT * FROM folder_hierarchy;`,
        {
          schema: Schema.Array(Schema.Struct({ id: Schema.String, name: Schema.String, parentFolderId: Schema.NullishOr(Schema.String) })),
        }
      ),
    [folderId]
  )

  if (folderNames.length === 0) return null

  if (folderNames.length === 1) {
    return (
      <div className="flex items-center space-x-1 text-sm">
        <FolderLink folder={folderNames[0]} />
      </div>
    )
  }

  if (folderNames.length === 2) {
    return (
      <div className="flex items-center space-x-1 text-sm">
        <FolderLink folder={folderNames[1]} />
        <FolderDivider />
        <FolderLink folder={folderNames[0]} />
        <FolderSettingsDropdown folder={folderNames[0]} />
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-1 text-sm">
      <FolderLink folder={folderNames[folderNames.length - 1]} />
      <FolderDivider />
      <span className="select-none">...</span>
      <FolderDivider />
      <FolderLink folder={folderNames[0]} />
      <FolderSettingsDropdown folder={folderNames[0]} />
    </div>
  )
}
