import { getUserAvatar } from "@/service/userService";
import { ArrowRightStartOnRectangleIcon, HomeIcon, MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

export default async function Navigation() {
    const userInfo = await getUserAvatar();
    return (
        <div>
            <ul className="flex flex-col gap-5 *:p-5 items-center 
            bg-black
            left-0
            z-50
            fixed
            min-[640px]:h-screen
            min-[640px]:top-0
            min-[640px]:border-r-2
            
            max-[640px]:w-full
            max-[640px]:bottom-0
            max-[640px]:flex-row
            max-[640px]:justify-around
            ">
                <li className="max-[640px]:hidden">
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
                        <ArrowRightStartOnRectangleIcon className="size-7" />
                    </Link>
                </li>
                <li className="cursor-pointer">
                    <Link href={`/users/${userInfo?.username}`}>
                        <div className="relative size-10 rounded-full overflow-hidden">
                            {userInfo?.avatar ? (
                                <Image
                                    fill
                                    sizes="(max-width-40px) (max-height-40px)"
                                    src={userInfo.avatar}
                                    alt={userInfo.username}
                                />
                            ) : (
                                <UserIcon className="size-7" />
                            )}
                        </div>
                    </Link>
                </li>
            </ul>
        </div>
    )
}