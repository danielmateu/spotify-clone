"use client"

import { SongItem } from "@/components/SongItem";
import { Song } from "@/types";

interface PageContentProps {
    songs: Song[];
}

export const PageContent: React.FC<PageContentProps> = ({ songs }) => {

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
                onClick={() => { }}
                data={song}
            />)
            )}
        </div>
        // <div>
        //     {songs.map((song, index) => (
        //         <div key={index} className="flex items-center justify-between py-2">
        //             <div className="flex items-center">
        //                 <div className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-800">
        //                     <div className="text-white text-2xl font-semibold">{song.title[0]}</div>
        //                 </div>
        //                 <div className="ml-4">
        //                     <div className="text-white font-semibold">{song.title}</div>
        //                     <div className="text-neutral-400">{song.author}</div>
        //                 </div>
        //             </div>
        //             <div className="text-neutral-400">

        //             </div>
        //         </div>
        //     ))}
        // </div>

    )
}
