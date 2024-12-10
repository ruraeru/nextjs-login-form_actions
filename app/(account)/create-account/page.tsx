"use client"

import FormButton from "@/components/button";
import { useActionState } from "react";
import Input from "@/components/input";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { createAccount } from "./actions";
import { EnvelopeIcon, KeyIcon, UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function CreateAccountPage() {
    const [state, dispatch] = useActionState(createAccount, null);
    return (
        <main className="flex flex-col gap-10 items-center justify-center">
            <h1 className="flex justify-center">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="size-64" fill="white">
                    <g>
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z">
                        </path>
                    </g>
                </svg>
            </h1>
            <form action={dispatch} className="w-full flex flex-col gap-5">
                <Input
                    name="username"
                    type="text"
                    placeholder="Username"
                    required
                    errors={state?.fieldErrors.username}
                    labelIcon={<UserIcon />}
                />
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
                <Input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    required
                    minLength={4}
                    errors={state?.fieldErrors.confirmPassword}
                    labelIcon={<KeyIcon />}
                />
                <FormButton
                    text="Create account"
                />
            </form>
            <div className="flex gap-2">
                <span>이미 계정이 있나요? &rarr;</span>
                <Link href="/log-in" className="underline text-cyan-300">
                    Log in
                </Link>
            </div>
        </main>
    )
}