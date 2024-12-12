import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
import { UserIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { revalidateTag } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import LikeButton from "./like-button";
import { getLikeResponseStatus } from "@/service/commentService";

interface CommentProps {
    id: number;
    payload: string;
    created_at: Date;
    updated_at: Date;
    userId: number;
    tweetId: number;
    likes: number;
    photo: string | null;
    user: {
        username: string;
        email: string;
        avatar: string | null;
    }
}

async function getIsOwner(userId: number) {
    const session = await getSession();
    if (session.id) {
        return session.id === userId;
    }
    return false;
}

export default async function Comment({ id, payload, created_at, userId, user, photo }: CommentProps) {
    const isOwner = await getIsOwner(userId);
    const onDelete = async () => {
        "use server"
        await db.response.delete({
            where: {
                id
            }
        });
        revalidateTag("tweet-comments")
    }
    const { likeCount, isLiked } = await getLikeResponseStatus(id);
    return (
        <div className="relative p-2 border-2 border-zinc-500 rounded-xl">
            <Link href={`/users/${user.username}`} className="flex gap-1">
                <div>
                    {user.avatar !== null ? (
                        <Image
                            className="rounded-full"
                            width={40}
                            height={40}
                            src={user.avatar}
                            alt={user.username}
                        />
                    ) : <UserIcon className="size-10 rounded-full" />}
                </div>
                <div className="flex items-center">
                    <div className="flex flex-col leading-3">
                        <span className="text-lg font-semibold leading-3">{user.username} </span>
                        <small className="text-xs leading-5">@{user.username}</small>
                    </div>
                    <div>
                        <p>·</p>
                    </div>
                    <div>
                        <small>{formatToTimeAgo(created_at.toString())}</small>
                    </div>
                </div>
            </Link>
            <div>
                <h3 className="break-all">{payload}</h3>
                {photo !== null && (
                    <Image
                        width={2000}
                        height={2000}
                        src={photo}
                        alt="tse"
                    />
                )}
            </div>
            {
                isOwner ? (
                    <div onClick={onDelete} className="absolute right-2 top-2 cursor-pointer">
                        <XMarkIcon className="size-5" />
                    </div>
                ) : ""
            }
            <div className="mt-2">
                <LikeButton commentLike isLiked={isLiked} likeCount={likeCount} tweetId={id} />
            </div>
        </div >
    )
}