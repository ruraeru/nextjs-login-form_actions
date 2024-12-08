import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";
import { revalidatePath } from "next/cache";

interface CommentProps {
    id: number;
    payload: string;
    created_at: Date;
    updated_at: Date;
    userId: number;
    tweetId: number;
    likes: number;
}

async function getIsOwner(userId: number) {
    const session = await getSession();
    if (session.id) {
        return session.id === userId;
    }

    return false;
}

export default async function Comment({ id, payload, created_at, userId, likes }: CommentProps) {
    const isOwner = await getIsOwner(userId);
    const onDelete = async () => {
        "use server"
        const a = await db.response.delete({
            where: {
                id,
            }
        })
        revalidatePath(`tweets/${id}`)
    }
    return (
        <div className="flex items-center justify-between">
            <div>
                <h3>{payload}</h3>
                <span>{formatToTimeAgo(created_at.toString())}</span>
            </div>
            {
                isOwner ? (
                    <div onClick={onDelete} >
                        <button>
                            삭제하기
                        </button>
                    </div>
                ) : ""
            }
            <div className="flex items-center gap-2">
                <ArrowUpIcon className="size-4" />
                <p>{likes}</p>
                <ArrowDownIcon className="size-4" />
            </div>
        </div>
    )
}