"use client"

import Button from "@/components/button";
import Input from "@/components/input";
import { useActionState, useEffect } from "react";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { login } from "./action";
import Link from "next/link";
import { EnvelopeIcon, KeyIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function LogIn() {
  //useActionState => login(null) return state => call again action 
  //=> login(prevState) return PrevState

  const [state, dispatch] = useActionState(login, null);
  // const router = useRouter()
  // useEffect(() => {
  //   if (state?.fieldErrors. === "redirect") {
  //     router.push("/");
  //     router.refresh();
  //   }
  // }, [state, router]);
  return (
    <div className="flex flex-col gap-10 items-center justify-center">
      <div className="flex justify-center">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-64" fill="white">
          <g>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z">
            </path>
          </g>
        </svg>
      </div>
      <form action={dispatch} className="w-full flex flex-col gap-5">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
          labelIcon={<EnvelopeIcon />}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength={PASSWORD_MIN_LENGTH}
          errors={state?.fieldErrors.password}
          labelIcon={<KeyIcon />}
        />
        <Button text="Log in" />
      </form>
      <div className="flex gap-5">
        <span>계정이 없으신가요? &rarr;</span>
        <Link href="/create-account" className="text-lg text-cyan-400 underline">
          Create Account
        </Link>
      </div>
    </div >
  )
}