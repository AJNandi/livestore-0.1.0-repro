import { Button } from "../../components/ui/button"
import { RectangleGroupIcon } from "@heroicons/react/16/solid"

export function Spinner({ show, wait }: { show?: boolean; wait?: `delay-${number}` }) {
  return (
    <div
      className={`inline-block animate-spin px-3 transition ${(show ?? true) ? `opacity-1 duration-500 ${wait ?? "delay-300"}` : "duration-500 opacity-0 delay-0"}`}
    >
      <RectangleGroupIcon className="w-4" />
    </div>
  )
}

export function DefaultLoadingComponent({ show, wait }: { show?: boolean; wait?: `delay-${number}` }) {
  return (
    <div className="w-full h-full bg-slate-50 flex mx-auto justify-center items-center">
      <div className={` p-2`}>
        <div
          className={`inline-block animate-spin px-3 transition ${(show ?? true) ? `opacity-1 duration-500 ${wait ?? "delay-300"}` : "duration-500 opacity-0 delay-0"}`}
        >
          <RectangleGroupIcon className="w-8 text-slate-500" />
        </div>
      </div>
    </div>
  )
}

export function DefaultErrorComponent() {
  if (window.innerHeight < 400) {
    return <div className="min-h-screen flex flex-col items-center justify-center bg-background"></div>
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-2xl text-primary">Something went wrong.</h1>
        <p className="text-sm text-muted-foreground">We apologize for the inconvenience.</p>
        <Button
          onClick={() => {
            window.location.reload()
          }}
          className="px-6 py-3 text-sm"
        >
          Try again
        </Button>
      </div>
    </div>
  )
}
