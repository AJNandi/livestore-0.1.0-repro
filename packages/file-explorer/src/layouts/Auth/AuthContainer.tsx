import { useState } from "react"
import { SignupComponent } from "./SignupForm"
import { LoginComponent } from "./LoginForm"

export function Auth() {
  const [signupOrLogin, setSignupOrLogin] = useState<"signup" | "login">("login")

  if (signupOrLogin === "signup") {
    return (
      <SignupComponent
        login={() => {
          setSignupOrLogin("login")
        }}
      />
    )
  }

  return (
    <LoginComponent
      signup={() => {
        setSignupOrLogin("signup")
      }}
    />
  )
}
