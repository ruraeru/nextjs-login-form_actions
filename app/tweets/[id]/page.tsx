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
        <div>
            {id}
            <h1>{tweet.tweet}</h1>
            <p>{tweet.user.username}</p>
        </div>
    )
}