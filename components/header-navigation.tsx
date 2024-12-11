"use client"

import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter } from "next/navigation";

export default function HeaderNavigation() {
    const router = useRouter();
    const pathName = usePathname();
    console.log(pathName)
    const onClick = () => {
        router.back();

    }
    return (
        <div className="absolute left-0 top-0 p-5">
            <ArrowLeftIcon className="size-5" onClick={onClick} />
        </div>
    )
}