"use client"

import { TbPlaylist } from "react-icons/tb"
import { AiOutlinePlus } from "react-icons/ai"
import { useAuthModal } from "@/hooks/useAuthModal"
import { useUser } from "@/hooks/useUser"
import { useUploadModal } from "@/hooks/useUploadModal"
import { Song } from "@/types"
import Image from "next/image"
import { MediaItem } from "./MediaItem"

interface LibraryProps {
    songs: Song[]
}

export const Library: React.FC<LibraryProps> = ({ songs }) => {

    const authModal = useAuthModal()
    const uploadModal = useUploadModal()
    const { user } = useUser()

    const onCLick = () => {
        if (!user) {
            return authModal.onOpen()
        }
        // TODO: Check for subscription

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
                            onClick={() => { }}
                        />
                    ))
                }
            </div>
        </div>
    )
}
