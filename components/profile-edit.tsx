"use client"

import { editProfile } from "@/app/(tab)/users/[username]/edit/actions";
import { userInfoType } from "@/service/userService";
import { useActionState } from "react";
import Input from "./input";
import { DocumentTextIcon, EnvelopeIcon, KeyIcon, UserIcon } from "@heroicons/react/24/solid";
import Button from "./button";

export default function ProfileEdit({ userInfo }: { userInfo: userInfoType }) {
    const [state, dispatch] = useActionState(editProfile, null);
    return (
        <form action={dispatch} className="w-full flex flex-col gap-5 justify-center">
            <Input
                type="url"
                name="avatar"
                placeholder="아바타"
            />
            <Input
                labelIcon={<UserIcon />}
                name="username"
                type="text"
                required
                placeholder="이름을 입력해주세요."
                defaultValue={userInfo.username}
                errors={state?.error?.fieldErrors.username}
            />
            <Input
                labelIcon={<EnvelopeIcon />}
                name="email"
                type="email"
                required
                placeholder="이메일을 입력해주세요."
                defaultValue={userInfo.email}
                errors={state?.error?.fieldErrors.email}
            />
            <Input
                labelIcon={<KeyIcon />}
                name="prevPassword"
                type="password"
                required
                placeholder="현재 비밀번호를 입력해주세요."
                errors={state?.error?.fieldErrors.prevPassword}
            />
            <Input
                labelIcon={<KeyIcon />}
                name="password"
                type="password"
                placeholder="변경할 비밀번호를 입력해주세요."
                errors={state?.error?.fieldErrors.password}
            />
            <Input
                labelIcon={<KeyIcon />}
                name="confirmPassword"
                type="password"
                placeholder="비밀번호를 한번 더  입력해주세요."
                errors={state?.error?.fieldErrors.confirmPassword}
            />
            <Input
                labelIcon={<DocumentTextIcon />}
                name="bio"
                type="text"
                placeholder="자기소개를 입력해주세요"
                errors={state?.error?.fieldErrors.bio}
            />
            <Button text="수정 하기" />
        </form>
    )
}