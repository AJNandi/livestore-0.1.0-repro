import { useStore } from "@livestore/react"
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label } from "@repo/file-explorer"
import { mutations, useClientState } from "@repo/livestore"
import { nanoid } from "nanoid"
import { useState } from "react"
import { z } from "zod"

export function SignupComponent({ login }: { login: () => void }) {
  const { store } = useStore()
  const [, setClientState] = useClientState()

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")

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
    if (!validateEmail(email)) {
      alert("Please enter a valid email address")
      return
    }

    const userId = nanoid()
    store.mutate(
      mutations.createUser({
        id: userId,
        email,
        name,
        created: Date.now(),
        modified: Date.now(),
      })
    )

    setClientState((_) => ({ ..._, activeUserId: userId }))
  }

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>Enter your email and name below to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input id="name" type="name" placeholder="Eric Sheets" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <Button onClick={onSubmit} type="submit" className="w-full" disabled={!validateEmail(email) || name.length <= 3}>
              Sign Up
            </Button>
            {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
          </div>
          <div className="mt-4 text-center text-sm cursor-default">
            Already have an account?{" "}
            <Button variant={"ghost"} className="px-0 hover:bg-transparent cursor-default" onClick={() => login()} asChild>
              <div className="underline">Log in</div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
