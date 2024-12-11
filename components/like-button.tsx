"use client"

import { HeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";

import { useOptimistic } from "react";
import { dislikePost, likePost } from "@/app/(tab)/tweets/[id]/actions";
import { dislikeComment, likeComment } from "@/service/commentService";

interface LikeButtonProps {
    isLiked: boolean;
    likeCount: number;
    tweetId: number;
    commentLike?: boolean;
}

export default function LikeButton({ isLiked, likeCount, tweetId, commentLike }: LikeButtonProps) {
    const [state, reducerFn] = useOptimistic({ isLiked, likeCount }, (previousState, payload) => ({
        isLiked: !previousState.isLiked,
        likeCount: previousState.isLiked
            ? previousState.likeCount - 1
            : previousState.likeCount + 1,
    })
    );
    const onClick = async () => {
        reducerFn(undefined)
        if (isLiked) {
            if (commentLike) await dislikeComment(tweetId);
            else await dislikePost(tweetId)
        }
        else {
            if (commentLike) await likeComment(tweetId);
            else await likePost(tweetId)

        }
    }
    return (
        <form action={onClick}>
            <button
                className={`
                    flex items-center gap-2 text-neutral-400 text-sm border border-neutral-400 rounded-2xl px-2 py-1 transition-colors
                    ${state.isLiked ? "bg-cyan-400 text-white border-cyan-500" : "hover:bg-neutral-800"}
                     `}>
                {state.isLiked
                    ? <HeartIcon className="size-5" />
                    : <OutlineHeartIcon className="size-5" />
                }
                {state.isLiked
                    ? <span>{state.likeCount}</span>
                    : <span>{state.likeCount}</span>
                }
            </button>
        </form>
    )
}