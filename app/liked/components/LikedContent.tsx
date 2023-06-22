"use client"

import { LikeButton } from "@/components/LikeButton"
import { MediaItem } from "@/components/MediaItem"
import { useOnPlay } from "@/hooks/useOnPlay"
import { useUser } from "@/hooks/useUser"
import { Song } from "@/types"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface LikedContentProps {
    songs: Song[]
}

export const LikedContent: React.FC<LikedContentProps> = ({ songs }) => {

    const router = useRouter()
    const { isLoading, user } = useUser()

    const { onPlay } = useOnPlay(songs)

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace("/")
        }
    }, [isLoading, router, user])

    if (songs.length === 0) {
        return (
            <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
                <p className="text-2xl font-semibold">No liked songs yet</p>
            </div>
        )
    }

    return (
        <div className="
        flex
        flex-col
        w-full
        px-6
        text-neutral-400
        "
        >
            {
                songs.map((song) => (
                    <div key={song.id}
                        className="flex items-center gap-x-4 w-full p-4"
                    >
                        <div className="flex-1">
                            <MediaItem
                                data={song}
                                onClick={(id: string) => onPlay(id)}
                            />
                        </div>
                        <LikeButton
                            songId={song.id}
                            onClick={() => { }}
                        />
                    </div>
                ))
            }

        </div>
    )
}
