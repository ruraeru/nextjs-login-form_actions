import { ChartBarIcon, ChatBubbleLeftIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";

export default function InfoBar({ like, response, views }: { like: number, response: number, views: number }) {
    return (
        <div>
            <ul className="flex items-center gap-2 *:flex *:items-center *:gap-2 text-md text-stone-400 w-full">
                <li>
                    <HandThumbUpIcon className="size-4" />
                    {like}
                </li>
                <li>
                    <ChatBubbleLeftIcon className="size-4" />
                    {response}
                </li>
                <li>
                    <ChartBarIcon className="size-4" />
                    {views}
                </li>
            </ul>
        </div>
    )
}