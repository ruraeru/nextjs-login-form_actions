import Button from "@/components/button";
import db from "@/lib/db";
import { logOut } from "@/lib/log-out";
import getSession from "@/lib/session"
import { notFound } from "next/navigation";

async function getUser() {
    const session = await getSession();
    if (session.id) {
        const user = await db.user.findUnique({
            where: {
                id: session.id
            }
        });
        if (user) {
            return user;
        }
    }
    notFound();
}

export default async function Profile() {
    const user = await getUser();
    return (
        <div className="mt-10">
            <h1>Welcome! {user?.username}</h1>
            <form action={logOut}>
                <Button text="Log out" />
            </form>
        </div>
    )
}