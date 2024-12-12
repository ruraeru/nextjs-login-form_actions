import db from "@/lib/db"
import Comment from "./comment";
import { unstable_cache as nextCache } from "next/cache";

async function getComments(tweetId: number) {
    const comments = await db.response.findMany({
        where: {
            tweetId
        },
        include: {
            user: {
                select: {
                    username: true,
                    email: true,
                    avatar: true
                }
            }
        },
        orderBy: {
            created_at: "desc",
        }
    })
    return comments;
}

const gegetCachedComments = nextCache(getComments, ["tweet-comments"], {
    tags: ["tweet-comments"]
})


export default async function CommentsList({ tweetId }: { tweetId: number }) {
    const comments = await gegetCachedComments(tweetId);
    return (
        <div className="w-full text-white flex flex-col gap-2">
            {comments.map((comment) => (
                <Comment key={comment.id} {...comment} />
            ))}
        </div>
    )
}