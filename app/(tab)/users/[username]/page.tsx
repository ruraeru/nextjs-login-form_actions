import ListTweet from "@/components/list-tweet";
import { isOwner } from "@/service/userService";
import Link from "next/link";

export default async function User({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params;
    const { isOwn, user } = await isOwner(username)
    return (
        <div className="flex flex-col gap-5">
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
            {user.tweet.map((tweet) => (
                <ListTweet key={tweet.id} {...tweet} />
            ))}
        </div>

    )
}