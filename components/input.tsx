import { InputHTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";

interface InputProps {
    name: string;
    errors?: string[];
    labelIcon?: ReactNode;
    placeholder: string;
}

export default function Input({ name, errors = [], labelIcon, placeholder, ...rest }: InputProps & InputHTMLAttributes<HTMLInputElement>) {
    const { pending } = useFormStatus();
    return (
        <div className="flex flex-col gap-1 w-full">
            <div className="flex relative">
                <label htmlFor={name} className="absolute top-1/2 left-4 -translate-y-1/2 text-white-600 *:size-5">
                    {labelIcon}
                </label>
                <input
                    id={name}
                    className={`bg-transparent rounded-3xl px-10 py-6 w-full h-12 focus:outline-none ring-2 focus:ring-4 transition bg-none
                    ring-gray-500 focus:ring-neutral-200 
                    border-none placeholder:text-neutral-400
                    ${errors ? "border-red-500 focus:ring-cyan-400" : "border-stone-400 focus:ring-stone-300"}`}
                    name={name}
                    placeholder={placeholder}
                    disabled={pending}
                    {...rest}
                />
            </div>
            {errors?.map((error, index) => (
                <span key={index} className="text-red-500 font-medium">
                    {error}
                </span>
            ))}
        </div>
    )
}