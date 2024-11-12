import Skeleton from "react-loading-skeleton"
import { CardContent } from "../ui/card"
import { ReactNode } from "react"

function SidebarGroup({ name, children }: { name?: string; children: ReactNode }) {
  return (
    <div className="">
      <div className="text-xs font-bold pb-1 px-2 py-2">{name}</div>
      {children}
    </div>
  )
}

export function SidebarSkeleton({ name, count }: { name: string; count: number }) {
  return (
    <div className="">
      <div className="text-xs font-bold pb-1 px-2 py-2">{name}</div>
      <div className="px-2 mt-2">
        <Skeleton count={count} className="" />
      </div>
    </div>
  )
}
export const FilesSkeleton: React.FC = () => {
  return (
    <div className="h-full w-full flex grow divide-x divide-gray-200">
      <div className="min-w-56 w-72 flex flex-col gap-2 text-lg bg-slate-50">
        <div className="px-2 mt-5">
          <Skeleton className="h-8" />
        </div>
        <nav className="flex flex-1 flex-col" aria-label="Sidebar">
          <ul role="list" className="space-y-2 divide-y">
            <SidebarGroup>
              <div className="px-2 mt-2">
                <Skeleton count={2} className="" />
              </div>
            </SidebarGroup>
            <SidebarGroup>
              <div className="px-4 mt-2">
                <Skeleton count={4} className="opacity-60" />
              </div>
            </SidebarGroup>
            <SidebarGroup>
              <div className="px-4 mt-2">
                <Skeleton count={4} className="opacity-30" />
              </div>
            </SidebarGroup>
            <SidebarGroup>
              <div className="px-4 mt-2 opacity-10">
                <Skeleton count={4} className="" />
              </div>
            </SidebarGroup>
            <SidebarGroup>
              <div className="px-4 mt-2 opacity-10">
                <Skeleton count={4} className="" />
              </div>
            </SidebarGroup>
          </ul>
        </nav>
      </div>
      <div className="h-full w-full bg-slate-50">
        <ContentSkeleton />
      </div>
    </div>
  )
}

export const ContentSkeleton: React.FC = () => {
  return (
    <div className="h-full">
      <div className="items-center border-b border-gray-300 py-6 px-6 h-20 w-full">
        <div className="w-56">
          <Skeleton className="h-8" />
        </div>
      </div>
      <div className="overflow-y-auto mt-12" style={{ height: "calc(100% - 5rem)" }}>
        <CardContent className="">
          <Skeleton className="h-6 px-8 my-3 opacity-100" />
          <Skeleton className="h-6 px-8 my-3 opacity-90" />
          <Skeleton className="h-6 px-8 my-3 opacity-80" />
          <Skeleton className="h-6 px-8 my-3 opacity-70" />
          <Skeleton className="h-6 px-8 my-3 opacity-60" />
          <Skeleton className="h-6 px-8 my-3 opacity-50" />
          <Skeleton className="h-6 px-8 my-3 opacity-40" />
          <Skeleton className="h-6 px-8 my-3 opacity-30" />
          <Skeleton className="h-6 px-8 my-3 opacity-20" />
          <Skeleton className="h-6 px-8 my-3 opacity-10" />
          <Skeleton className="h-6 px-8 my-3 opacity-10" />
          <Skeleton className="h-6 px-8 my-3 opacity-10" />
        </CardContent>
      </div>
    </div>
  )
}
