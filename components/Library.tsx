"use client"

import { TbPlaylist } from "react-icons/tb"
import { AiOutlinePlus } from "react-icons/ai"

export const Library = () => {

    const onCLick = () => {
        // Handle upload later
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
                List of songs!
            </div>
        </div>
    )
}
