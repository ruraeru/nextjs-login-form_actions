import Link from "next/link";
import { User } from "@prisma/client";
import { formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";
import { UserIcon } from "@heroicons/react/24/solid";
import InfoBar from "./tweet-info-bar";

export default function ListTweet({
    title,
    tweet,
    created_at,
    id,
    user,
    photo,
    views,
    _count,
}: {
    title: string;
    tweet: string;
    created_at: Date;
    id: number;
    user: User;
    photo: string | null;
    views: number;
    _count: {
        like: number;
        response: number;
    }
}) {
    return (
        <Link href={`/tweets/${id}`} className="flex flex-col p-5 rounded-2xl *:text-white border-2 gap-2 bg-neutral-900">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 justify-start">
                    <div className="relative size-10 rounded-full overflow-hidden">
                        {user.avatar !== null ?
                            <Image
                                fill
                                sizes="(max-width-40px) (max-height-40px)"
                                src={user.avatar}
                                alt={user.username}
                            />
                            : <UserIcon className="size-10" />}
                    </div>
                    <div className="flex flex-col gap-0 justify-center">
                        <h1 className="text-xl font-bold">{user.username}</h1>
                        <span className="text-xs text-stone-400">@{user.username}</span>
                    </div>
                </div>
                <span className="text-xs text-stone-400 whitespace-nowrap">
                    {formatToTimeAgo(created_at.toString())}
                </span>
            </div>
            <div className="flex flex-col justify-center gap-2 overflow-hidden">
                <div className="*:truncate w-1/2">
                    <h1 className="text-xl">{title}</h1>
                    <p className="text-sm">
                        {tweet}
                    </p>
                </div>
                <div className="flex justify-center">
                    {photo !== null && (
                        <div className="relative w-[468px] h-[568px]">
                            <Image
                                className="rounded-md object-contain"
                                fill
                                sizes="(max-width-468px) (max-height-568px)"
                                src={photo}
                                alt={title}
                            />
                        </div>
                    )}
                </div>
            </div>
            <InfoBar {..._count} views={views} />
        </Link>
    );
}