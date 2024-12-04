"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
    text: string;
}

export default function Button({ text }: ButtonProps) {
    const { pending } = useFormStatus();
    return (
        <button disabled={pending} className="h-20 
        w-full
        bg-gray-500
        rounded-full
        disabled:bg-neutral-400
         disabled:text-neutral-300
         disabled:cursor-not-allowed">
            {pending ? "Loading..." : text}
        </button>
    )
}