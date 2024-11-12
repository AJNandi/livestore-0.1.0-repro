import { useStore } from "@livestore/react"
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label } from "@repo/file-explorer"
import { useClientState } from "@repo/livestore"
import { useState } from "react"
import { z } from "zod"

export function LoginComponent({ signup }: { signup: () => void }) {
  const { store } = useStore()
  const [, setClientState] = useClientState()

  const [email, setEmail] = useState("")

  const validateEmail = (email: string) => {
    try {
      z.string().email().parse(email)
      return true
    } catch (e) {
      return false
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const user = store.__select(`SELECT * FROM user WHERE email = '${email}'`)[0]
    if (!user) {
      alert("User not found")
      return
    } else {
      setClientState((_) => ({ ..._, activeUserId: user.id }))
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <Button onClick={onSubmit} type="submit" className="w-full" disabled={!validateEmail(email)}>
              Login
            </Button>
            {/* <Button variant="outline" className="w-full">
                Login with Google
              </Button> */}
          </div>
          <div className="mt-4 text-center text-sm cursor-default">
            Don&apos;t have an account?{" "}
            <Button variant={"ghost"} className="px-0 hover:bg-transparent cursor-default" onClick={() => signup()} asChild>
              <div className="underline">Sign up</div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
