import Input from "@/components/input"
import SearchBar from "@/components/search-bar";
import db from "@/lib/db";
import { formatToTimeAgo } from "@/lib/utils";
import Link from "next/link";

async function getInitialTweets() {
    const tweets = await db.tweet.findMany({
        take: 10,
        orderBy: {
            created_at: "desc"
        },
        include: {
            user: true
        }
    });
    return tweets;
}

export default async function Search() {
    const initialTweets = await getInitialTweets();
    return (
        <div className="p-5">
            <SearchBar />
            <div className="p-5 flex flex-col gap-5">
                {initialTweets.map((tweet) => (
                    <Link href={`/tweets/${tweet.id}`} className="bg-slate-500">
                        <h3>{tweet.title}</h3>
                        <p>{tweet.tweet}</p>
                        <span>{tweet.user.username} - {formatToTimeAgo(tweet.created_at.toString())}</span>
                    </Link>
                ))}
            </div>
        </div >
    )
}