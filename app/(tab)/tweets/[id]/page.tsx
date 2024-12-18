import AddComment from "@/components/add-comment";
import LikeButton from "@/components/like-button";
import CommentsList from "@/components/list-comments";
import InfoBar from "@/components/tweet-info-bar";
import db from "@/lib/db";
import { formatToTimeAgo } from "@/lib/utils";
import { getLikeStatus } from "@/service/tweetService";
import { isOwner } from "@/service/userService";
import { UserIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

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
    const { isOwn, user } = await isOwner(tweet.user.username);

    const deleteTweet = async () => {
        "use server";
        if (isOwn) {
            const deleteTweet = await db.tweet.delete({
                where: {
                    id: paramsId
                },
                select: {
                    id: true
                }
            })
            if (deleteTweet) {
                redirect("/")
            }
        }
    }
    const { likeCount, isLiked } = await getLikeStatus(paramsId)
    return (
        <div className="p-5 text-white flex flex-col gap-2 relative">
            <div className="flex items-center gap-2 mb-2">
                {tweet.user.avatar ? (
                    <Image
                        width={500}
                        height={500}
                        className="size-7 rounded-full"
                        src={tweet.user.avatar!}
                        alt={tweet.user.username}
                        priority
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
            <div className="flex items-center justify-center">
                {tweet.photo &&
                    <Image
                        width={600}
                        height={400}
                        src={tweet.photo}
                        alt={tweet.title}
                        priority
                    />
                }
            </div>
            {isOwn && <XMarkIcon onClick={deleteTweet} className="size-7 absolute top-3 right-3 cursor-pointer" />}
            <div className="flex flex-col gap-5 items-start w-full">
                <InfoBar {...tweet._count} views={tweet.views} />
                <div>
                    <p className="text-sm break-all">
                        <span className="text-sm font-semibold mr-2">{tweet.user.username}</span>
                        {tweet.tweet}
                    </p>
                </div>
                <LikeButton isLiked={isLiked} likeCount={likeCount} tweetId={paramsId} />
            </div>
            <div className="flex flex-col gap-2">
                <AddComment tweetId={paramsId} />
                <CommentsList tweetId={paramsId} />
            </div>
        </div>
    )
}