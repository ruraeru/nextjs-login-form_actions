import db from "@/lib/db"
import getSession from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import Comment from "./comment";

async function getComments(tweetId: number) {
    const comments = await db.response.findMany({
        where: {
            tweetId
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
        <div className="w-full text-white flex flex-col">
            {comments.map((comment) => (
                <Comment key={comment.id} {...comment} />
            ))}
        </div>
    )
}