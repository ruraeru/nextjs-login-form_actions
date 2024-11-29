import Link from "next/link";

export default function Home() {
    return (
        <ul>
            <li>
                <Link href={"/log-in"}>Log in</Link>
            </li>
            <li>
                <Link href={"/create-account"}>create-account</Link>
            </li>
        </ul>
    )
}