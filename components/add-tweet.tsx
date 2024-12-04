import { PlusIcon } from "@heroicons/react/24/solid";
import Input from "./input";
import Button from "./button";
import { useActionState } from "react";
import { uploadTweet } from "@/app/(home)/actions";

export default function AddTweet() {
    const [state, action] = useActionState(uploadTweet, null);
    return (
        <div>
            <form action={action} className="flex flex-col gap-5">
                <Input
                    required
                    name="title"
                    type="text"
                    placeholder="트윗 작성하기"
                />
                <Button text="제출 하기"></Button>
            </form>
        </div >
    )
}