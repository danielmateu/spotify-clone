"use client"

import { TbPlaylist } from "react-icons/tb"
import { AiOutlinePlus } from "react-icons/ai"
import { useAuthModal } from "@/hooks/useAuthModal"
import { useUser } from "@/hooks/useUser"
import { useUploadModal } from "@/hooks/useUploadModal"
import { Song } from "@/types"
import Image from "next/image"
import { MediaItem } from "./MediaItem"
import { useOnPlay } from "@/hooks/useOnPlay"
import { useSubscribeModal } from "@/hooks/useSubscribeModal"

interface LibraryProps {
    songs: Song[]
}

export const Library: React.FC<LibraryProps> = ({ songs }) => {

    const subscribeModal = useSubscribeModal()
    const authModal = useAuthModal()
    const uploadModal = useUploadModal()
    const { user, subscription } = useUser()

    const { onPlay } = useOnPlay(songs)
    const onCLick = () => {
        if (!user) {
            return authModal.onOpen()
        }
        // TODO: Check for subscription
        if (!subscription) {
            return subscribeModal.onOpen()
        }

        return uploadModal.onOpen()
    }
    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-5 pt-2">
                <div
                    className="inline-flex items-center gap-x-2"
                >
                    <TbPlaylist
                        className="text-neutral-400"
                        size={24}
                    />
                    <p
                        className="text-neutral-400 font-medium text-md"

                    >
                        Playlists
                    </p>

                </div>
                <AiOutlinePlus
                    className="text-neutral-400 cursor-pointer hover:text-white transition"
                    onClick={onCLick}
                    size={20}
                />
            </div>
            <div
                className="flex flex-col gap-y-2 px-5 py-4"
            >
                {
                    songs.map((song) => (

                        <MediaItem
                            key={song.id}
                            data={song}
                            onClick={(id: string) => onPlay(id)}
                        />
                    ))
                }
            </div>
        </div>
    )
}
