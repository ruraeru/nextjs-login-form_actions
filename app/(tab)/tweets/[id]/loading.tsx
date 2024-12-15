import { ChartBarIcon, ChatBubbleLeftIcon, HeartIcon, PhotoIcon } from "@heroicons/react/24/solid";

export default function Loading() {
    return (
        <div className="animate-pulse p-5 flex flex-col gap-5">
            <div className="flex gap-2 items-center">
                <div className="size-14 rounded-full bg-neutral-700" />
                <div className="flex flex-col gap-1">
                    <div className="h-5 w-40 bg-neutral-700 rounded-md" />
                    <div className="h-5 w-20 bg-neutral-700 rounded-md" />
                </div>
            </div>
            <div className="aspect-square border-neutral-700 text-neutral-700 border-4 border-dashed rounded-md flex justify-center items-center">
                <PhotoIcon className="h-28" />
            </div>
            <div className="flex items-center gap-2">
                <div className="h-5 w-20 bg-neutral-700 rounded-md" />
                <div className="h-5 w-60 bg-neutral-700 rounded-md" />
            </div>
            <div>
                <ul className="flex items-center gap-2 *:flex *:items-center *:gap-2 text-md text-stone-400 w-full">
                    <li>
                        <HeartIcon className="size-4" />
                        <div className="h-5 w-10 bg-neutral-700 rounded-md" />
                    </li>
                    <li>
                        <ChatBubbleLeftIcon className="size-4" />
                        <div className="h-5 w-10 bg-neutral-700 rounded-md" />
                    </li>
                    <li>
                        <ChartBarIcon className="size-4" />
                        <div className="h-5 w-10 bg-neutral-700 rounded-md" />
                    </li>
                </ul>
            </div>

            <div className="flex flex-col gap-2 w-full">
                <div className="flex gap-2 items-center">
                    <div className="size-14 rounded-full bg-neutral-700" />
                    <div className="flex flex-col gap-1">
                        <div className="h-5 w-40 bg-neutral-700 rounded-md" />
                        <div className="h-5 w-20 bg-neutral-700 rounded-md" />
                    </div>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <div className="h-5 w-40 bg-neutral-700 rounded-md" />
                </div>
                <div>
                    <ul className="flex items-center gap-2 *:flex *:items-center *:gap-2 text-md text-stone-400 w-full">
                        <li>
                            <HeartIcon className="size-4" />
                            <div className="h-5 w-10 bg-neutral-700 rounded-md" />
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <div className="flex gap-2 items-center">
                    <div className="size-14 rounded-full bg-neutral-700" />
                    <div className="flex flex-col gap-1">
                        <div className="h-5 w-40 bg-neutral-700 rounded-md" />
                        <div className="h-5 w-20 bg-neutral-700 rounded-md" />
                    </div>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <div className="h-5 w-40 bg-neutral-700 rounded-md" />
                </div>
                <div>
                    <ul className="flex items-center gap-2 *:flex *:items-center *:gap-2 text-md text-stone-400 w-full">
                        <li>
                            <HeartIcon className="size-4" />
                            <div className="h-5 w-10 bg-neutral-700 rounded-md" />
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <div className="flex gap-2 items-center">
                    <div className="size-14 rounded-full bg-neutral-700" />
                    <div className="flex flex-col gap-1">
                        <div className="h-5 w-40 bg-neutral-700 rounded-md" />
                        <div className="h-5 w-20 bg-neutral-700 rounded-md" />
                    </div>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <div className="h-5 w-40 bg-neutral-700 rounded-md" />
                </div>
                <div>
                    <ul className="flex items-center gap-2 *:flex *:items-center *:gap-2 text-md text-stone-400 w-full">
                        <li>
                            <HeartIcon className="size-4" />
                            <div className="h-5 w-10 bg-neutral-700 rounded-md" />
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
                <div className="flex gap-2 items-center">
                    <div className="size-14 rounded-full bg-neutral-700" />
                    <div className="flex flex-col gap-1">
                        <div className="h-5 w-40 bg-neutral-700 rounded-md" />
                        <div className="h-5 w-20 bg-neutral-700 rounded-md" />
                    </div>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <div className="h-5 w-40 bg-neutral-700 rounded-md" />
                </div>
                <div>
                    <ul className="flex items-center gap-2 *:flex *:items-center *:gap-2 text-md text-stone-400 w-full">
                        <li>
                            <HeartIcon className="size-4" />
                            <div className="h-5 w-10 bg-neutral-700 rounded-md" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}