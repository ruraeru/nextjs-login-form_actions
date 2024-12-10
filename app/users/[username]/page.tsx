import db from "@/lib/db";
import { isOwner } from "@/lib/is-owner";
import getSession from "@/lib/session";
import Link from "next/link";

async function getUserInfo(username: string) {
    const userInfo = await db.tweet.findMany({
        where: {
            user: {
                username
            }
        },
        include: {
            user: true
        }
    })

    return userInfo;
}

export default async function User({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params;
    const userInfo = await getUserInfo(username);
    const isOwn = await isOwner(username)
    return (
        <>
            <div>
                {username}
                {userInfo.map((tweet) => (
                    <div key={tweet.id}>
                        {tweet.title}
                    </div>
                ))}
            </div>
            {isOwn ? (
                <Link href={`/users/${username}/edit`}>
                    수정하기
                </Link>
            ) : ""}
        </>
    )
}