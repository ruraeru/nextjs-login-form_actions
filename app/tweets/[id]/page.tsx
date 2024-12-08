import AddComment from "@/components/add-comment";
import Button from "@/components/button";
import Input from "@/components/input";
import LikeButton from "@/components/like-button";
import CommentsList from "@/components/list-comments";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToTimeAgo } from "@/lib/utils";
import { AtSymbolIcon, EyeIcon, UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { notFound } from "next/navigation";

async function tweetDetail(id: number) {
    try {
        const tweet = await db.tweet.update({
            where: {
                id
            },
            data: {
                views: {
                    increment: 1,
                }
            },
            include: {
                user: {
                    select: {
                        username: true,
                        avatar: true
                    }
                },
                response: true,
                _count: {
                    select: {
                        response: true
                    }
                }
            }
        });
        return tweet;
    }
    catch (e) {
        return null;
    }
}

async function getLikeStatus(tweetId: number) {
    const session = await getSession();
    const isLiked = await db.like.findUnique({
        where: {
            id: {
                tweetId,
                userId: session.id!
            }
        }
    })

    const likeCount = await db.like.count({
        where: {
            tweetId
        }
    })
    return {
        likeCount,
        isLiked: Boolean(isLiked)
    }
}


export default async function DetailTweet({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (isNaN(Number(id))) {
        return notFound();
    }
    const paramsId = Number(id);
    const tweet = await tweetDetail(paramsId)
    if (!tweet) {
        return notFound()
    }
    const { likeCount, isLiked } = await getLikeStatus(paramsId)
    return (
        <div className="p-5 text-white">
            <div className="flex items-center gap-2 mb-2">
                {tweet.user.avatar ? (
                    <Image
                        width={28}
                        height={28}
                        className="size-7 rounded-full"
                        src={tweet.user.avatar!}
                        alt={tweet.user.username}
                    />
                ) : (
                    <UserIcon className="size-7 rounded-full" />
                )}

                <div>
                    <span className="text-sm font-semibold">{tweet.user.username}</span>
                    <div className="text-xs">
                        <span>{formatToTimeAgo(tweet.created_at.toString())}</span>
                    </div>
                </div>
            </div>
            <h2 className="text-lg font-semibold">{tweet.title}</h2>
            <p className="mb-5">{tweet.tweet}</p>
            {tweet.photo && <Image
                width={600}
                height={400}
                src={tweet.photo}
                alt={tweet.title}
            />}
            <div className="flex flex-col gap-5 items-start">
                <div className="flex items-center gap-2 text-neutral-400 text-sm">
                    <EyeIcon className="size-5" />
                    <span>조회 {tweet.views}</span>
                </div>
                <LikeButton isLiked={isLiked} likeCount={likeCount} tweetId={paramsId} />
            </div>
            <AddComment tweetId={paramsId} />
            <CommentsList tweetId={paramsId} />
        </div>
    )
}