import TweetLists from "@/components/tweet-list";
import db from "@/lib/db"
import { Prisma } from "@prisma/client";

async function getInitialTweets() {
    const products = await db.tweet.findMany({
        take: 1,
        orderBy: {
            created_at: "desc"
        },
    });
    console.log(products)
    return products;
}

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export default async function Products() {
    const initialTweets = await getInitialTweets()
    return (
        <div className="p-5 flex flex-col gap-5">
            <TweetLists initialTweets={initialTweets} />
        </div>
    )
}