"use client"

import { PhotoIcon, PlusIcon, XCircleIcon } from "@heroicons/react/24/solid";
import Input from "./input";
import Button from "./button";
import { useActionState, useState } from "react";
import { uploadTweet } from "@/app/(home)/actions";

export const MAX_FILE_SIZE = 4000000;
export const ALLOWED_FILE_TYPE = ["png", "jpg", "jpeg"];

export default function AddTweet() {
    const [preview, setPreview] = useState("");
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
    const [state, action] = useActionState(uploadTweet, null);
    return (
        <div>
            <form action={action} className="flex flex-col gap-5">
                <div className="flex flex-col gap-5">
                    <Input
                        required
                        name="title"
                        type="text"
                        placeholder="무슨 일이 일어나고 있나요?"
                        style={{
                            borderRadius: 0,
                        }}
                        errors={state?.fieldErrors.title}
                    />
                    <Input
                        required
                        name="tweet"
                        type="text"
                        placeholder="더 자세히 들려줄래요?"
                        style={{
                            borderRadius: 0,
                        }}
                        errors={state?.fieldErrors.tweet}
                    />
                </div>
                {preview ? (
                    <label
                        htmlFor="photo"
                        className={`border-2 aspect-square flex items-center justify-center flex-col border-none rounded-3xl relative
                        bg-center bg-no-repeat bg-cover`}
                        style={{
                            backgroundImage: `url(${preview})`
                        }}
                    >
                        <XCircleIcon
                            onClick={() => setPreview("")}
                            className="size-10 absolute right-5 top-5
                                text-black"
                        />
                    </label>
                ) : null}
                <input
                    onChange={onImageChange}
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/jpg, image/png, image/jpeg"
                    className="hidden"
                />
                <div className="flex items-center justify-around h-10 py-10">
                    <label htmlFor="photo">
                        <PhotoIcon className="size-5 cursor-pointer" />
                    </label>
                    <Button style={{
                        width: "240px"
                    }} height="10" text="게시하기"></Button>
                </div>
            </form>
        </div >
    )
}