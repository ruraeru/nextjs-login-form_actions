import { getUserAvatar } from "@/service/userService";
import { HomeIcon, MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";


export default async function Navigation() {
    const userInfo = await getUserAvatar();
    return (
        <div>
            <ul className="flex flex-col gap-5 *:p-5 items-center 
            left-0 border-r-2 
            fixed
            min-[640px]:h-screen
            min-[640px]:top-0
            
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
                {/* <li>
                    <Link href="/profile">
                        <UserIcon className="size-7" />
                    </Link>
                </li> */}
                <li>
                    {/* <Link href="/profile"> */}
                    <Link href={`/users/${userInfo?.username}`}>
                        {userInfo?.avatar !== null ? (
                            <Image
                                width={40}
                                height={40}
                                src={userInfo!.avatar}
                                alt={userInfo?.username!}
                            />
                        ) : (
                            <UserIcon className="size-7" />
                        )}
                    </Link>
                </li>
            </ul>
        </div>
    )
}