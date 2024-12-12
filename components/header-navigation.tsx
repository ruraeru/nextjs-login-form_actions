"use client"

import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter } from "next/navigation";

export default function HeaderNavigation() {
    const router = useRouter();
    const pathName = usePathname().replace("/", "");
    console.log(pathName)
    const onClick = () => {
        router.back();
    }
    return (
        <div className="
        absolute left-0 top-0 p-5 w-full text-white z-10
        flex gap-2 items-center
        text-center
        ">
            <ArrowLeftIcon className="size-7" onClick={onClick} />
            <span className="text-xl font-bold w-full">{pathName === "/" ? "Home" : pathName}</span>
        </div>
    )
}