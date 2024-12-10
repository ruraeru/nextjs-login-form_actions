"use client"

import Button from "@/components/button";
import Input from "@/components/input";
import db from "@/lib/db";
import { isOwner } from "@/lib/is-owner";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";
import { useActionState, useState } from "react";
import { modifyUserInfo } from "./actions";

// async function getUserInfo() {
//     const session = await getSession();
//     const userInfo = await db.user.findUnique({
//         where: {
//             id: session.id
//         },
//         select: {
//             username: true,
//             avatar: true,
//             email: true,
//             password: true,
//             bio: true
//         }
//     });
//     return userInfo;
// }


export default function EditProfile() {
    const [state, dispatch] = useActionState(modifyUserInfo, null);
    return (
        <div>
            <h1>프로필 수정하기</h1>
            <form action={dispatch}>
                <Input
                    name="username"
                    placeholder="username"
                    required

                />
                {/* <Input
                    name="email"
                    placeholder="email"
                    required

                />
                <Input
                    name="bio"
                    placeholder="bio"
                    required

                />
                <Input
                    name="password"
                    placeholder="password"
                    required

                />
                <Input
                    name="confirmPassword"
                    placeholder="CofirmPassword"
                    required

                /> */}
                <Button text="수정 하기" />
            </form>
        </div>
    )
}