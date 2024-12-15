"use client"

import { PhotoIcon, UserIcon, XCircleIcon } from "@heroicons/react/24/solid";
import Button from "./button";
import Input from "./input";
import { useOptimistic, useState } from "react";
import { addComment } from "@/app/(tab)/tweets/[id]/actions";
import { ALLOWED_FILE_TYPE, MAX_FILE_SIZE } from "./add-tweet";

export default function AddComment({ tweetId }: { tweetId: number }) {
    const [preview, setPreview] = useState("");
    const [comment, setComment] = useState("")
    const [isSending, setSending] = useState(false);
    const [state, reducerFn] = useOptimistic({ isSending, comment }, (prevState, newComment: string) => ({
        isSending: !prevState.isSending,
        comment: newComment,
    }));
    const onClick = async (formData: FormData) => {
        reducerFn(comment);
        await addComment(tweetId, formData);
        setPreview("");
        setComment("");
        setSending(false);
    }
    const onChange = (e: React.FormEvent<HTMLInputElement>) => {
        setComment(e.currentTarget.value)
    }

    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (!files) return;
        const file = files[0];

        if (ALLOWED_FILE_TYPE.indexOf(file.type.split("/")[1]) === -1) {
            alert("file upload is only .png, .jpg, .jpeg");
            return;
        }
        if (file.size > MAX_FILE_SIZE) {
            alert("file is very big!!!!");
            return;
        }
        setPreview(URL.createObjectURL(file));
    }
    return (
        <>
            <form action={onClick} className="flex flex-col gap-2">
                <div className="flex flex-col items-center justify-between gap-2">
                    <div className="flex items-center justify-start w-full gap-2">
                        <Input
                            labelIcon={<UserIcon className="size-7" />}
                            value={state.comment}
                            onChange={onChange}
                            name="comment"
                            type="text"
                            required
                            placeholder="Post your reply"
                        />
                    </div>
                    <Input
                        labelIcon={<PhotoIcon />}
                        name="photo"
                        placeholder="이미지 링크"
                    />
                </div>
                {/* {preview ? (
                    <label
                        htmlFor="photo"
                        className={`border-2 border-neutral-600 aspect-square flex items-center justify-center flex-col rounded-3xl relative
                        bg-center bg-no-repeat bg-contain`}
                        style={{
                            backgroundImage: `url(${preview})`
                        }}
                    >
                        <div className="w-full bg-white">
                            <XCircleIcon
                                onClick={() => setPreview("")}
                                className=" size-10 absolute right-5 top-5
                                text-black"
                            />
                        </div>
                    </label>
                ) : null}
                <input
                    onChange={onImageChange}
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/jpg, image/png, image/jpeg"
                    className="hidden"
                /> */}
                <div className="flex items-center gap-2 justify-between">
                    <label htmlFor="photo">
                        <PhotoIcon className="size-7" />
                    </label>
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