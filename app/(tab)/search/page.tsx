"use client"

import Button from "@/components/button";
import Input from "@/components/input";
import { MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/solid";
import { useActionState } from "react"
import { searchTweet } from "./actions";
import ListTweet from "@/components/list-tweet";
import Link from "next/link";
import Image from "next/image";

export default function Search() {
    const [state, dispatch] = useActionState(searchTweet, null);
    return (
        <div className="flex flex-col gap-5">
            <form action={dispatch}>
                <Input
                    labelIcon={<MagnifyingGlassIcon />}
                    name="keyword"
                    type="text"
                    placeholder="검색할 내용을 입력해주세요."
                    errors={state?.error?.formErrors}
                />
                <div className="mt-3">
                    <Button text="검색" />
                </div>
            </form>
            <div className="flex flex-col gap-5">
                {state?.data?.tweets.map((tweet) => (
                    <ListTweet key={tweet.id} {...tweet} />
                ))}
                {state?.data?.users.map((user) => (
                    <Link key={user.id} href={`/users/${user.username}`}>
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2 items-center">
                                <div className="rounded-full w-10 h-10 overflow-hidden">
                                    {user.avatar === null ? <UserIcon /> : (
                                        <Image width={40} height={40} src={user.avatar!} alt={user.username} />
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <h1>@ {user.username}</h1>
                                    <small>{user.email}</small>
                                </div>
                            </div>
                            <div>
                                <h1>{user.bio}</h1>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}