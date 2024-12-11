"use client"

import { PhotoIcon, UserIcon } from "@heroicons/react/24/solid";
import Button from "./button";
import Input from "./input";
import { useOptimistic, useState } from "react";
import { addComment } from "@/app/(tab)/tweets/[id]/actions";

export default function AddComment({ tweetId }: { tweetId: number }) {
    const [comment, setComment] = useState("")
    const [isSending, setSending] = useState(false);
    const [state, reducerFn] = useOptimistic({ isSending, comment }, (prevState, newComment: string) => ({
        isSending: !prevState.isSending,
        comment: newComment,
    }));

    const onClick = async (formData: FormData) => {
        reducerFn(comment);
        await addComment(tweetId, formData);
        setComment("");
        setSending(false);
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
                        value={state.comment}
                        onChange={onChange}
                        name="comment"
                        type="text"
                        required
                        placeholder="Post your reply"
                    />
                </div>
                <div className="flex items-center gap-2 justify-between">
                    <PhotoIcon className="size-7" />
                    <Button text="Reply" />
                </div>
            </form>
            {state.isSending ? (
                <div className="flex items-center justify-between animate-pulse">
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