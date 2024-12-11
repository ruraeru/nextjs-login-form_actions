import db from "@/lib/db"
import Comment from "./comment";

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

export default async function CommentsList({ tweetId }: { tweetId: number }) {
    const comments = await getComments(tweetId);
    return (
        <div className="w-full text-white flex flex-col gap-2">
            {comments.map((comment) => (
                <Comment key={comment.id} {...comment} />
            ))}
        </div>
    )
}