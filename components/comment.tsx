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
        <div className="p-3 border-2 border-zinc-500 rounded-xl relative">
            <Link href={`/users/${user.username}`} className="flex gap-1">
                <div>
                    {user.avatar !== null ? (
                        <div className="relative size-10">
                            <Image
                                className="rounded-full object-cover"
                                fill
                                sizes="10"
                                src={user.avatar}
                                alt={user.username}
                            />
                        </div>
                    ) : <UserIcon className="size-10 rounded-full" />}
                </div>
                <div className="flex items-center">
                    <div className="flex flex-col leading-3">
                        <div>
                            <div className="flex items-center gap-1">
                                <span className="text-lg font-semibold leading-3">{user.username}</span>
                                <p className="text-neutral-500">·</p>
                                <small className="text-neutral-500">{formatToTimeAgo(created_at.toString())}</small>
                            </div>
                        </div>
                        <small className="text-xs leading-5">@{user.username}</small>
                    </div>
                </div>
            </Link>
            <div className="flex flex-col gap-2">
                <h3 className="break-all pl-2">{payload}</h3>
                {photo !== null && (
                    <div className="relative h-[568px] max-[640px]:max-h-[320px]">
                        <Image
                            className="object-contain"
                            fill
                            priority
                            sizes="(max-width-468px) (max-height-568px)"
                            src={photo}
                            alt={id + ""}
                        />
                    </div>
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