"use client"

import { SongItem } from "@/components/SongItem";
import { useOnPlay } from "@/hooks/useOnPlay";
import { Song } from "@/types";

interface PageContentProps {
    songs: Song[];
}

export const PageContent: React.FC<PageContentProps> = ({ songs }) => {

    const { onPlay } = useOnPlay(songs)

    if (songs.length === 0) return (
        <div className="flex justify-center items-center h-96">
            <div className="text-white text-2xl font-semibold">No songs found</div>
        </div>
    )

    return (
        <div className="
        grid
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        xl:grid-cols-6
        2xl:grid-cols-8
        gap-4
        mt-4
        ">
            {songs.map((song) => (<SongItem
                key={song.id}
                onClick={(id: string) => onPlay(id)}
                data={song}
            />)
            )}
        </div>

    )
}
