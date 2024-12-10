"use client";

import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";

interface ButtonProps {
    text: string;
    width?: string;
    height?: string;
}

export default function Button({ text, width = "full", height = "14", ...rest }: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
    const { pending } = useFormStatus();
    return (
        <button disabled={pending} {...rest} className={`
        h-${height} w-${width}
        bg-gray-500
        rounded-full
        disabled:bg-neutral-400
         disabled:text-neutral-300
         disabled:cursor-not-allowed`}>
            {pending ? "Loading..." : text}
        </button>
    )
}