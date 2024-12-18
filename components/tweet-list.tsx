"use client";

import { useEffect, useRef, useState } from "react";
import ListTweet from "./list-tweet";
import { getPaginatedTweets, InitialTweets } from "@/service/tweetService";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import AddTweet from "./add-tweet";
export default function TweetList({ initialTweets }: { initialTweets: InitialTweets }) {
    const [tweets, setTweets] = useState(initialTweets);
    // const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);
    // const trigger = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        const fetchMoreTweet = async () => {
            const { tweets, isLastPage } = await getPaginatedTweets(page);
            setIsLastPage(isLastPage);
            setTweets(tweets);
        };
        fetchMoreTweet();
    }, [page]);
    return (
        <div className="flex justify-center flex-col items-center">
            <div className="p-5 flex flex-col gap-5 w-full justify-center">
                <AddTweet />
                {tweets.map((tweet) => (
                    <ListTweet key={tweet.id} {...tweet} />
                ))}
            </div>
            <div className="w-full mb-20 h-10 p-5 flex mx-auto gap-10 items-center justify-center">
                <button
                    className="disabled:text-black cursor-pointer"
                    onClick={() => setPage((prev) => (prev === 1 ? prev : prev - 1))}
                    disabled={page === 1}>
                    <ChevronLeftIcon width={20} height={20} />
                </button>
                <span>{page}</span>
                <button
                    className="disabled:text-black cursor-pointer"
                    onClick={() => setPage((prev) => (isLastPage ? prev : prev + 1))}
                    disabled={isLastPage}>
                    <ChevronRightIcon width={20} height={20} />
                </button>
            </div>
        </div>
    );
}