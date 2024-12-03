"use client"

import { useState } from "react";
import { InitialTweets } from "@/app/page";
import { getMoreTweets } from "@/app/tweets/actions";
import ListProduct from "./list-tweet";

interface TweetListProps {
    initialTweets: InitialTweets;
}

export default function TweetLists({ initialTweets }: TweetListProps) {
    const [tweets, setTweets] = useState(initialTweets);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [isLastPage, setIsLastPage] = useState(false);
    const onLoadMoreClick = async () => {
        setIsLoading(true);
        const newTweet = await getMoreTweets(page + 1);
        if (newTweet.length !== 0) {
            // setPage(prev => prev + 1);
            setTweets((prev) => [...prev, ...newTweet]);
        }
        else {
            setIsLastPage(true);
        }
        setIsLoading(false);
    };
    return (
        <div className="p-5 flex flex-col gap-5">
            {tweets.map((product) => (
                <ListProduct key={product.id} {...product} />
            ))}
            <form action={onLoadMoreClick}>
                <button
                    onClick={() => setPage(prev => prev - 1)}
                    disabled={isLoading}
                    className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
                >
                    {isLoading ? "로딩 중" : "back"}
                </button>
                {isLastPage ? null : (
                    <button
                        onClick={() => setPage(prev => prev + 1)}
                        disabled={isLoading}
                        className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
                    >
                        {isLoading ? "로딩 중" : "forward"}
                    </button>
                )
                }
            </form>
        </div>
    );
}