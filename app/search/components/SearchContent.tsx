"use client"

import { MediaItem } from "@/components/MediaItem"
import { Song } from "@/types"
import { LikeButton } from "../../../components/LikeButton"
import { useOnPlay } from "@/hooks/useOnPlay"

interface SearchContentProps {
    songs: Song[]
}

export const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
    const { onPlay } = useOnPlay(songs)
    if (songs.length === 0) {
        return (
            <div className="
            flex
            flex-col
            gap-y-2
            w-full
            px-6
            text-neutral
            ">
                No songs found
            </div>
        )
    }

    return (
        <div className="
        flex 
        flex-col
        gap-y-2
        w-full
        px-6
        ">
            {
                songs.map((song) => (
                    <div
                        key={song.id}
                        className="
                        flex
                        items-center
                        justify-between
                        gap-x-4
                        cursor-pointer
                        transition
                        duration-300
                        rounded-md
                        p-2
                        "
                    >
                        {/* <p>{song.title} - <span
                            className="text-neutral-400"
                        >{song.author}</span></p> */}
                        <div className="flex-1">
                            <MediaItem
                                data={song}
                                onClick={(id: string) => onPlay(id)}
                            />
                        </div>
                        {/* TODO: Add like button here */}
                        <LikeButton
                            onClick={() => { }}
                            songId={song.id}
                        />
                    </div>
                ))
            }
        </div>
    )
}
