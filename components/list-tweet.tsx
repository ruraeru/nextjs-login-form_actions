import Link from "next/link";
import { User } from "@prisma/client";
import { formatToTimeAgo } from "@/lib/utils";
export default function ListTweet({
    tweet,
    created_at,
    id,
    user,
}: {
    tweet: string;
    created_at: Date;
    id: number;
    user: User;
}) {
    return (
        <Link href={`/tweets/${id}`} className="flex flex-col p-10 rounded-2xl *:text-stone-700 hover:bg-stone-200">
            <div className="flex items-center justify-between">
                <span className="text-lg font-bold">{user.username}</span>
                <span className="text-sm text-stone-400">{formatToTimeAgo(created_at.toString())}</span>
            </div>
            <p className="text-lg">{tweet.slice(20)}...</p>
        </Link>
    );
}