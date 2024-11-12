import { File, Folder } from "@repo/livestore"
import clsx from "clsx"
import { useState } from "react"
import { Button } from "../../components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../../components/ui/dropdown-menu"
import AllIcons, { IconPickerIcons } from "./Icons"

const BgColorToIconColor: Record<string, string> = {
  "bg-sky-500": "text-sky-500",
  "bg-indigo-500": "text-indigo-500",
  "bg-rose-500": "text-rose-500",
  "bg-amber-500": "text-amber-500",
  "bg-orange-500": "text-orange-500",
  "bg-emerald-600": "text-emerald-600",
  "bg-slate-700": "text-slate-700",
}

export function Icon({ icon, color }: { icon: string; color: string }) {
  const Icon = AllIcons[icon] ?? AllIcons["TableCellsIcon"]
  return <Icon className={clsx("w-5 p-0.5 items-center", color)} />
}

export function IconPicker({
  file,
  onSelectIcon,
  onSelectColor,
}: {
  file: File
  onSelectIcon: (icon: string) => void
  onSelectColor: (color: string) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="hover:bg-slate-200 rounded-md" asChild>
        <Button variant={"ghost"} className="w-7 h-7 p-0 my-2">
          <Icon icon={file.icon} color={file.color} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className=""
        align="center"
        aria-describedby={undefined}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        {" "}
        <div className="-mx-1.5 flex justify-evenly border-b border-gray-200 py-2">
          {Object.keys(BgColorToIconColor).map((color) => (
            <button
              key={`color-${color}`}
              className={clsx(
                "item-center flex h-5 w-5 cursor-pointer justify-center rounded-full ring-offset-1 hover:ring-2",
                color,
                color === file.color && "ring-2"
              )}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onSelectColor(BgColorToIconColor[color])
              }}
            ></button>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-[2px] pt-2">
          {Object.entries(IconPickerIcons).map(([key, Icon]) => (
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onSelectIcon(key)
                setOpen(false)
              }}
              id={key}
              key={`icon-${key}`}
              className={clsx("rounded-md p-1 transition-colors duration-500 hover:bg-gray-200 hover:transition-none hover:duration-0", file.color)}
            >
              <Icon className="w-5 p-0.5 hover:transition-none" />
            </button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function ColorOnlyPicker({ folder, onSelectColor }: { folder: Folder; onSelectColor: (color: string) => void }) {
  const [open, setOpen] = useState(false)

  if (!folder) return null

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="hover:bg-slate-200 rounded-md" asChild>
        <Button variant={"ghost"} className="w-7 h-7 p-0 my-2">
          <Icon icon={folder.icon} color={folder.color} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className=""
        align="center"
        aria-describedby={undefined}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        {" "}
        <div className="flex justify-evenly py-1 gap-1">
          {Object.keys(BgColorToIconColor).map((color) => (
            <button
              key={`color-${color}`}
              className={clsx(
                "item-center flex h-5 w-5 cursor-pointer justify-center rounded-full ring-offset-1 hover:ring-2",
                color,
                color === folder.color && "ring-2"
              )}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onSelectColor(BgColorToIconColor[color])
                setOpen(false)
              }}
            ></button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
