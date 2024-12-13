import ProfileEdit from "@/components/profile-edit";
import { isOwner } from "@/service/userService";
import { notFound } from "next/navigation";

export default async function EditProfile({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params;
    const { isOwn, user } = await isOwner(username);
    if (!isOwn) {
        notFound();
    }
    return (
        <div className="mt-5 w-full">
            <ProfileEdit userInfo={user} />
        </div>
    )
}