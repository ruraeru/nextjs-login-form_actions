import ListTweet from "@/components/list-tweet";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { isOwner } from "@/service/userService";
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
    const { isOwn, user } = await isOwner(username)
    return (
        <div>
            <div>
                <div>
                    <div>
                        <h3>{user.username}</h3>
                        <small>{user.email}</small>
                    </div>
                    <div>
                        {isOwn && (
                            <Link href={`/users/${username}/edit`}>
                                내 정보 수정
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            {user.tweet.map((tweet) => (
                <ListTweet key={tweet.id} {...tweet} />
            ))}
        </div>

    )
}