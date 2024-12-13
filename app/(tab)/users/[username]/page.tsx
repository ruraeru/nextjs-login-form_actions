import ListTweet from "@/components/list-tweet";
import { isOwner } from "@/service/userService";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

export default async function User({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params;
    const { isOwn, user } = await isOwner(username)
    return (
        <div className="flex flex-col gap-5 pt-5">
            <div>
                <div>
                    <Image
                        className="absolute -z-50 rounded-t-3xl object-cover"
                        // width={200}
                        // height={199}
                        fill
                        src={"https://pbs.twimg.com/profile_banners/44196397/1726163678/1500x500"}
                        alt="profile-banner"
                    />
                </div>
                <div className="p-3">
                    <div>
                        {user.avatar !== null ? (
                            <Image
                                className="rounded-full"
                                width={133}
                                height={133}
                                src={user.avatar}
                                alt={username}
                            />
                        ) : <UserIcon className="w-[133px] h-[133px] rounded-full" />}
                        <h3 className="font-extrabold text-xl">{user.username}</h3>
                        <small>@{user.email}</small>
                    </div>
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