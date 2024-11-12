import { CreateWorkspace } from "@repo/file-explorer"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/onboarding")({
  component: () => <OnboardingComponent />,
})

function OnboardingComponent() {
  return <CreateWorkspace />
}
