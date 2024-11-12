import { createFileRoute, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: Home,
  beforeLoad: async () => {
    throw redirect({
      to: "/files",
    })
  },
})

function Home() {
  return <div className="h-full"></div>
}
