import Link from "next/link";
import { User } from "@prisma/client";
import { formatToTimeAgo } from "@/lib/utils";
export default function ListTweet({
    title,
    tweet,
    created_at,
    id,
    user,
}: {
    title: string;
    tweet: string;
    created_at: Date;
    id: number;
    user: User;
}) {
    return (
        <Link href={`/tweets/${id}`} className="flex flex-col p-10 rounded-2xl *:text-stone-700 bg-stone-200">
            <div className="flex items-center justify-between">
                <span className="text-xl font-bold">{user.username}</span>
                <span className="text-sm text-stone-400">{formatToTimeAgo(created_at.toString())}</span>
            </div>
            <div className="flex items-center justify-between">
                <h1 className="text-lg truncate w-1/2">제목 : {title}</h1>
            </div>
            <p className="text-lg truncate w-1/2">
                {tweet}
            </p>
        </Link>
    );
}