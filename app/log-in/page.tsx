"use client"

import Button from "@/components/button";
import Input from "@/components/input";
import { useActionState } from "react";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { login } from "./action";
import Link from "next/link";

export default function LogIn() {
  //useActionState => login(null) return state => call again action 
  //=> login(prevState) return PrevState
  const [state, dispatch] = useActionState(login, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex justify-center">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-64" fill="white">
          <g>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z">
            </path>
          </g>
        </svg>
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
      <div className="flex items-center gap-5">
        <h1 className="text-xl">계정이 없으신가요? &rarr;</h1>
        <span className="text-lg text-cyan-400 underline">
          <Link href="/create-account">
            계정 만들러 가기
          </Link>
        </span>
      </div>
    </div>
  )
}