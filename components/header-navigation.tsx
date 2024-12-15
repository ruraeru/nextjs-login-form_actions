"use client"

import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter } from "next/navigation";

export default function HeaderNavigation() {
    const router = useRouter();
    const pathName = usePathname().replace("/", "");
    const onClick = () => {
        router.back();
    }
    return (
        <div className="
        top-0 w-full text-white z-10
        flex gap-2 items-center
        text-center
        relative
        ">
            <ArrowLeftIcon className="size-7 cursor-pointer z-50" onClick={onClick} />
            <span className="absolute left-0 text-xl font-bold w-full">{pathName === "/" ? "Home" : pathName}</span>
        </div>
    )
}