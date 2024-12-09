import SearchBar from "@/components/search-bar";
import db from "@/lib/db";
import Link from "next/link";

async function getTweetList(keyword: string) {
    console.log(keyword)
    const tweets = await db.tweet.findMany({
        where: {
            title: {
                contains: keyword
            }
        }
    });
    console.log(tweets)
    return tweets;
}

async function getUsers(keyword: string) {
    const users = await db.user.findMany({
        where: {
            username: {
                contains: keyword
            }
        }
    });

    return users;
}

export default async function SearchKeyword({ params }: { params: { keyword: string } }) {
    const { keyword } = await params;
    const decode_keyword = decodeURI(keyword);
    const tweets = await getTweetList(decode_keyword);
    const users = await getUsers(decode_keyword)
    return (
        <div className="p-5">
            <SearchBar />
            {tweets.map((tweet) => (
                <Link href={`/tweets/${tweet.id}`}>
                    {tweet.title}
                </Link>
            ))}
            <hr />
            <h1>People</h1>
            {users.map((user) => (
                <div>
                    {user.username}
                </div>
            ))}
        </div>
    )
}