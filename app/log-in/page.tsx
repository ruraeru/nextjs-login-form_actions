"use client"

import Button from "@/components/button";
import Input from "@/components/input";
import { useActionState } from "react";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { login } from "./action";

export default function LogIn() {
  //useActionState => login(null) return state => call again action 
  //=> login(prevState) return PrevState
  const [state, dispatch] = useActionState(login, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 
            *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in with email and password.
        </h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.password}
        />
        <Button text="Log in" />
      </form>
    </div>
  )
}