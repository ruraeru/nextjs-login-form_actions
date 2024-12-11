"use client";

import { useEffect, useState } from "react";
import ListTweet from "./list-tweet";
import { getPaginatedTweets, InitialTweets } from "@/service/tweetService";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import AddTweet from "./add-tweet";
export default function TweetList({ initialTweets }: { initialTweets: InitialTweets }) {
    const [tweets, setTweets] = useState(initialTweets);
    const [page, setPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);
    useEffect(() => {
        const fetchMoreTweet = async () => {
            const { tweets, isLastPage } = await getPaginatedTweets(page);
            setIsLastPage(isLastPage);
            setTweets(tweets);
        };
        fetchMoreTweet();
    }, [page]);
    return (
        <div className="flex justify-center">
            <div className="p-5 flex flex-col gap-5">
                <AddTweet />
                {tweets.map((tweet) => (
                    <ListTweet key={tweet.id} {...tweet} />
                ))}
            </div>
            <div className="w-full absolute bottom-0 max-w-screen-sm flex mx-auto gap-10 items-center justify-center">
                <button
                    className="disabled:text-neutral-900"
                    onClick={() => setPage((prev) => (prev === 1 ? prev : prev - 1))}
                    disabled={page === 1}>
                    <ChevronLeftIcon width={20} height={20} />
                </button>
                <span>{page}</span>
                <button
                    className="disabled:text-neutral-900"
                    onClick={() => setPage((prev) => (isLastPage ? prev : prev + 1))}
                    disabled={isLastPage}>
                    <ChevronRightIcon width={20} height={20} />
                </button>
            </div>
        </div>
    );
}