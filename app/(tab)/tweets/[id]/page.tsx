import AddComment from "@/components/add-comment";
import LikeButton from "@/components/like-button";
import CommentsList from "@/components/list-comments";
import InfoBar from "@/components/tweet-info-bar";
import db from "@/lib/db";
import { formatToTimeAgo } from "@/lib/utils";
import { getLikeStatus } from "@/service/tweetService";
import { UserIcon } from "@heroicons/react/24/solid";
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
                _count: true
            }
        });
        return tweet;
    }
    catch (e) {
        return null;
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
        <div className="p-5 text-white flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-2">
                {tweet.user.avatar ? (
                    <Image
                        width={40}
                        height={40}
                        className="size-7 rounded-full"
                        src={tweet.user.avatar!}
                        alt={tweet.user.username}
                    />
                ) : (
                    <UserIcon className="size-7 rounded-full" />
                )}
                <div>
                    <span className="text-md font-semibold">{tweet.user.username}</span>
                    <div className="text-xs">
                        <span>{formatToTimeAgo(tweet.created_at.toString())}</span>
                    </div>
                </div>
            </div>
            <h2 className="text-lg font-semibold">{tweet.title}</h2>
            <p className="mb-5">{tweet.tweet}</p>
            {tweet.photo &&
                <Image
                    width={600}
                    height={400}
                    src={tweet.photo}
                    alt={tweet.title}
                />
            }
            <div className="flex flex-col gap-5 items-start">
                <InfoBar {...tweet._count} views={tweet.views} />
                <LikeButton isLiked={isLiked} likeCount={likeCount} tweetId={paramsId} />
            </div>
            <AddComment tweetId={paramsId} />
            <CommentsList tweetId={paramsId} />
        </div>
    )
}