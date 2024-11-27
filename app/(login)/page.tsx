"use client"

import Button from "@/components/button";
import Input from "@/components/input";
import { PASSWORD_MIN_LENGTH, USERNAME_MIN_LENGTH } from "@/lib/constants";
import { useActionState } from "react";
import { login } from "./action";

export default function Home() {
  const [state, dispatch] = useActionState(login, null);
  console.log(state?.fieldErrors)
  return (
    <div className="flex flex-col justify-center mt-52">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-8xl p-20">🔥</h1>
      </div>
      <form action={dispatch} className="flex flex-col gap-5">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name="username"
          type="text"
          placeholder="useranme"
          required
          // minLength={USERNAME_MIN_LENGTH}
          errors={state?.fieldErrors.username}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          // minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.password}
        />
        <Button text="Log in" />
        {state !== null && state?.fieldErrors === undefined ? <div className="flex items-center justify-start px-2 bg-green-400 h-16 rounded-xl gap-2 text-black font-bold">
          <div className="size-10">
            <svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
            </svg>
          </div>
          <h1>Welcome back!!</h1>
        </div> : ""}
      </form>
    </div>
  );
}
