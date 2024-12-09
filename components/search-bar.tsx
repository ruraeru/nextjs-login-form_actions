"use client"

import Input from "./input";
import { redirect } from "next/navigation";

export default function SearchBar() {
    const onSubmit = (e: FormData) => {
        redirect(`/search/${e.get("search")}`)
    }
    return (
        <form action={onSubmit}>
            <Input
                name="search"
                placeholder="찾고 싶은 게시물을 입력해주세요."
            />
        </form>
    )
}