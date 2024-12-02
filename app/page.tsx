"use client"

import db from "@/lib/db";
import Link from "next/link";
import { useState } from "react";

async function fetchTweet() {
    const tweet = await db.tweet.findMany({
        take: 2
    })
}

export default function Home() {
    const [tweet, setTweet] = useState<any>([]);
    const loadTweet = async () => {
        const tweet = await db.tweet.findMany()
        setTweet(tweet)
    }
    return (
        <div>
            Tweet
            {tweet && tweet ? <div>{tweet.id}</div> : ""}
            <form action={loadTweet}>
                <button>
                    click
                </button>
            </form>
        </div>

        // <ul>
        //     <li>
        //         <Link href={"/log-in"}>Log in</Link>
        //     </li>
        //     <li>
        //         <Link href={"/create-account"}>create-account</Link>
        //     </li>
        // </ul>
    )
}