"use client"

import { PhotoIcon, UserIcon } from "@heroicons/react/24/solid";
import Button from "./button";
import Input from "./input";
import { useOptimistic, useState } from "react";
import { addComment } from "@/app/tweets/[id]/actions";
import Comment from "./comment";

export default function AddComment({ tweetId }: { tweetId: number }) {
    const [comment, setComment] = useState("");
    const [state, reducerFn] = useOptimistic({ tweetId, comment }, (prevState, payload) => ({
        tweetId,
        comment: prevState.comment,
    }));

    const onClick = async (e: FormData) => {
        reducerFn(undefined);
        reducerFn(await addComment(tweetId, e))
        setComment("");

    }
    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        setComment(e.currentTarget.value)
    }
    return (
        <>
            <form action={onClick} className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-2">
                    <UserIcon className="size-7" />
                    <Input
                        onChange={onChange}
                        value={comment}
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
                <div className="flex items-center justify-between h-20 bg-neutral-500 p-5
                border-4 border-blue-400 rounded-xl my-2">
                    <h3>{state.comment}</h3>
                    <div onClick={() => setComment("")}>
                        <button>삭제하기</button>
                    </div>
                </div>
            ) : ""}
        </>
    )
}