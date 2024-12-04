import db from "@/lib/db";
import { notFound } from "next/navigation";

async function tweetDetail(tweetId: string) {
    const tweet = await db.tweet.findUnique({
        where: {
            id: +tweetId
        },
        include: {
            user: true
        }
    });
    return tweet;
}

export default async function DetailTweet({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (isNaN(Number(id))) {
        return notFound();
    }
    const tweet = await tweetDetail(id)
    if (!tweet) {
        return notFound()
    }
    return (
        <div className="pb-36">
            <h3 className="p-5 flex items-center gap-3 border-b border-neutral-500">{tweet.user.username}</h3>
            <p className="p-5">{tweet.tweet}</p>
        </div>
    )
}