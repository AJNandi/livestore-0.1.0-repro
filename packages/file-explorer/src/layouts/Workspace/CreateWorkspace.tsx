import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import NameWorkspace from "./NameWorkspace"
import SelectWorkspaceType from "./SelectWorkspaceType"
import { mutations, useClientState } from "@repo/livestore"
import { nanoid } from "nanoid"
import { useStore } from "@livestore/react"

export default function CreateWorkspace() {
  const [clientState, setClientState] = useClientState()

  const { store } = useStore()

  const navigate = useNavigate()

  const [selected, setSelected] = useState<"team" | "personal">("team")
  const [workspaceName, setWorkspaceName] = useState<string>("")
  const [page, setPage] = useState<"create" | "name">("create")

  const createWorkspace = (name: string) => {
    const workspaceId = nanoid()

    store.mutate(
      mutations.createWorkspaceWithMemberAndRootFolders({
        workspaceId,
        membershipId: nanoid(),
        folderId: nanoid(),
        folderMembershipId: nanoid(),
        personalFolderId: nanoid(),
        personalFolderMembershipId: nanoid(),
        name,
        created: Date.now(),
        modified: Date.now(),
        userId: clientState.activeUserId!,
      })
    )

    setClientState((_) => ({ ..._, activeWorkspaceId: workspaceId }))

    navigate({ to: `/files` })
  }

  switch (page) {
    case "create":
      return (
        <SelectWorkspaceType
          type={selected}
          updateType={setSelected}
          onContinue={async () => {
            if (selected === "team") {
              setPage("name")
            } else {
              createWorkspace("My Workspace")
            }
          }}
          onBack={() => {
            navigate({ to: "/files" })
          }}
        />
      )
    case "name":
      return (
        <NameWorkspace
          name={workspaceName}
          setName={setWorkspaceName}
          onContinue={async () => {
            createWorkspace(workspaceName)
          }}
          onBack={() => {
            setPage("create")
          }}
        />
      )
    default:
      return null
  }
}
