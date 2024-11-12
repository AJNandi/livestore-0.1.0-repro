import { useQuery, useRow, useStore } from "@livestore/react"
import { mutations, tables, useClientState, userWorkspaceIds$ } from "@repo/livestore"
import { PlusCircle } from "lucide-react"
import { nanoid } from "nanoid"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { ScrollArea } from "../../components/ui/scroll-area"

export function WorkspaceSelector() {
  const { store } = useStore()
  const [clientState, setClientState] = useClientState()

  const workspaceIds = useQuery(userWorkspaceIds$)

  const handleCreateNewWorkspace = () => {
    if (!clientState.activeUserId) throw new Error("No active user found")
    // This function would handle the creation of a new workspace
    console.log("Creating new workspace")

    const workspaceId = nanoid()

    store.mutate(
      mutations.createWorkspaceWithMemberAndRootFolders({
        workspaceId,
        membershipId: nanoid(),
        folderId: nanoid(),
        folderMembershipId: nanoid(),
        personalFolderId: nanoid(),
        personalFolderMembershipId: nanoid(),
        name: "Workspace",
        created: Date.now(),
        modified: Date.now(),
        userId: clientState.activeUserId,
      })
    )

    setClientState((_) => ({ ..._, activeWorkspaceId: workspaceId }))
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <h2 className="text-2xl text-center mb-6">Select Workspace</h2>

          <ScrollArea className="max-h-[320px]">
            <div className="space-y-2">
              {workspaceIds.length === 0 && (
                <Button variant="default" className="w-full justify-start text-left font-normal" onClick={handleCreateNewWorkspace}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create New Workspace
                </Button>
              )}
              {workspaceIds.map((workspace) => (
                <WorkspaceRow key={workspace} workspaceId={workspace} />
              ))}
            </div>
          </ScrollArea>
          <Button
            variant="ghost"
            className="mt-4"
            onClick={() => {
              setClientState((_) => ({ ..._, activeWorkspaceId: undefined, activeUserId: undefined }))
            }}
          >
            Log out
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

const WorkspaceRow = ({ workspaceId }: { workspaceId: string }) => {
  const [workspace] = useRow(tables.workspace, workspaceId)
  const [, setClientState] = useClientState()

  return (
    <Button
      variant={"outline"}
      className="w-full justify-start text-left font-normal"
      asChild
      onClick={() => {
        setClientState((_) => ({ ..._, activeWorkspaceId: workspaceId }))
      }}
    >
      <div className="flex w-full">
        <div className="h-4 w-4 bg-gray-300 rounded-full mr-2" />
        <div>{workspace.name}</div>
      </div>
    </Button>
  )
}
