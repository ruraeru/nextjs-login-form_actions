import { HomeIcon, MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Navigation() {
    return (
        <div className="absolute left-0 border-r-2 h-screen top-0">
            <ul className="flex flex-col gap-5 *:p-5">
                <li>
                    <Link href="/">
                        <p>로고</p>
                    </Link>
                </li>
                <li>
                    <Link href="/">
                        <HomeIcon className="size-7" />
                    </Link>
                </li>
                <li>
                    <Link href="/search">
                        <MagnifyingGlassIcon className="size-7" />
                    </Link>
                </li>
                <li>
                    <Link href="/profile">
                        <UserIcon className="size-7" />
                    </Link>
                </li>
            </ul>
        </div>
    )
}