import Image from "next/image";

interface imgProps {
    src: string;
    alt: string;
    size: string;
    cover?: string;
    rounded?: string;
}

export default function ImgContainer({ src, alt, size, cover = "contain", rounded = "none" }: imgProps) {
    return (
        <div className={`relative w-[${size}px] h-[${size}px] size-[${size}px]`}>
            <Image
                className={`rounded-full object-center
                    `}
                fill
                sizes={`(max-width-${size}px) (max-height-${size}px)`}
                src={src}
                alt={alt}
            />
        </div>
    )
}