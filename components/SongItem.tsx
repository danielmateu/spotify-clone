"use client"

import { useLoadImage } from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import { PlayButton } from "./PlayButton";

interface SongItemProps {
    onClick: (id: string) => void;
    data: Song;

}

export const SongItem: React.FC<SongItemProps> = ({ onClick, data }) => {

    const imagePath = useLoadImage(data);
    return (
        <div onClick={() => onClick(data.id)}
            className="
            relative 
            group 
            flex 
            flex-col
            items-center
            justify-center
            rounded-md
            overflow-hidden
            gap-x-4
            bg-neutral-400/5
            cursor-pointer
            hover:bg-neutral-400/10
            transition
            duration-300
            p-3
            "
        >
            <div
                className="
                relative
                aspect-square
                w-full
                h-full
                rounded-md
                overflow-hidden
                "
            >
                <Image
                    className="object-cover"
                    src={imagePath || "/images/liked.png"}
                    fill
                    alt={data.title}

                />

                <PlayButton />
            </div>
            <div className="
            flex
            flex-col
            items-start
            w-full
            p-4
            gap-y-1
            ">
                <p className="font-semibold truncate w-full">{data.title}</p>
                <p className="text-neutral-400 truncate w-full">By {data.author}</p>
            </div>
        </div>
    )
}
