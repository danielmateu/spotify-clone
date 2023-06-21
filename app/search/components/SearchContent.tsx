"use client"

import { MediaItem } from "@/components/MediaItem"
import { Song } from "@/types"

interface SearchContentProps {
    songs: Song[]
}

export const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {

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
                                onClick={() => { }}
                            />
                        </div>
                        {/* TODO: Add like button here */}
                    </div>
                ))
            }
        </div>
    )
}
