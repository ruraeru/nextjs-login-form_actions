"use client"

import { PhotoIcon, UserIcon } from "@heroicons/react/24/solid";
import Button from "./button";
import Input from "./input";
import { useOptimistic, useState } from "react";
import { addComment } from "@/app/tweets/[id]/actions";
import Comment from "./comment";
import { set } from "zod";

export default function AddComment({ tweetId }: { tweetId: number }) {
    const [comment, setComment] = useState("");
    const [state, reducerFn] = useOptimistic({ tweetId, comment }, (prevState, payload: string) => ({
        tweetId,
        comment: payload,
    }));

    const onClick = async (e: FormData) => {
        reducerFn(await addComment(tweetId, e))
        reducerFn("");
        setComment("");
    }
    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        setComment(e.currentTarget.value)
    }
    return (
        <>
            <form action={onClick} className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                    <UserIcon className="size-7" />
                    <Input
                        onChange={onChange}
                        name="comment"
                        type="text"
                        required
                        placeholder="Post your reply"
                    />
                </div>
                <div className="flex items-center gap-2 justify-between">
                    <PhotoIcon className="size-7" />
                    <Button height="8" width="16" text="Reply" />
                </div>
            </form>
            {state.comment ? (
                <div className="flex items-center justify-between">
                    <div>
                        <h3>{state.comment}</h3>
                        <span>방금</span>
                    </div>
                    <div onClick={() => setComment("")}>
                        <button>삭제하기</button>
                    </div>
                </div>
            ) : ""}
        </>
    )
}