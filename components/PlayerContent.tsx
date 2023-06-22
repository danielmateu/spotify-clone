"use client"

import { Song } from "@/types"
import { MediaItem } from "./MediaItem";
import { LikeButton } from "./LikeButton";

import { BsPauseFill, BsPlayFill } from "react-icons/bs"
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import { Slider } from "./Slider";
import { useEffect, useState } from "react";
import usePlayer from "@/hooks/usePlayer";
import useSound from "use-sound";


interface PlayerContentProps {
    song: Song;
    songUrl: string;

}

export const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {

    const player = usePlayer()
    const [volume, setVolume] = useState(1)
    const [isPlaying, setIsPlaying] = useState(false)

    const Icon = isPlaying ? BsPauseFill : BsPlayFill
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave

    const onPlayNext = () => {

        if (player.ids.length === 0) return

        const currentIndex = player.ids.findIndex((id) => id === player.activeId)
        const nextSong = player.ids[currentIndex + 1]

        if (!nextSong) return player.setId(player.ids[0])

        player.setId(nextSong)

    }

    const onPlayPrev = () => {

        if (player.ids.length === 0) return

        const currentIndex = player.ids.findIndex((id) => id === player.activeId)
        const prevSong = player.ids[currentIndex - 1]

        if (!prevSong) return player.setId(player.ids[player.ids.length - 1])

        player.setId(prevSong)

    }

    const [play, { pause, sound }] = useSound(
        songUrl,
        {
            volume: volume,
            onplay: () => setIsPlaying(true),
            onend: () => { onPlayNext(), setIsPlaying(false) },
            onpause: () => setIsPlaying(false),
            format: ["mp3"],
        }
    )

    useEffect(() => {
        sound?.play()

        return () => {
            sound?.unload()
        }
    }, [sound])

    const handlePlay = () => {
        if (!isPlaying) {
            play()
        } else {
            pause()
        }
    }

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(1)
        } else {
            setVolume(0)
        }
    }

    return (
        <>
            <div className="
        grid 
        grid-cols-2
        md:grid-cols-3
        h-full
        items-center
        "
            >
                <div className="
            flex
            w-full
            justify-start
            ">
                    <div className="flex
                items-center
                gap-x-4
                ">
                        <MediaItem data={song} />
                        <LikeButton
                            onClick={() => console.log("like")}
                            songId={song.id}
                        />
                    </div>

                </div>

                <div className="
                    flex
                    md:hidden
                    col-auto
                    w-full
                    justify-end
                    items-center
                ">
                    <div
                        onClick={handlePlay}
                        className="
                            h-10
                            w-10
                            flex
                            items-center
                            justify-center
                            rounded-full
                            bg-white
                            p-1
                            cursor-pointer
                    ">
                        <Icon
                            // onClick={handlePlay}
                            className="    
                                text-black
                                hover:text-gray-500
                                w-full
                                h-full
                                transition
                        "/>
                    </div>
                </div>

                <div className="
                        hidden
                        h-full
                        md:flex
                        justify-center
                        items-center
                        w-full
                        max-w-[772px]
                        gap-4
                        "
                >
                    <AiFillStepBackward
                        onClick={onPlayPrev}
                        size={30}
                        className="
                            text-white
                            hover:text-gray-500
                            cursor-pointer
                            transition
                        "/>

                    <div
                        onClick={handlePlay}
                        className="
                            h-10
                            w-10
                            flex
                            items-center
                            justify-center
                            rounded-full
                            cursor-pointer
                        ">
                        <Icon
                            size={30}
                            className="
                            hover:text-gray-500
                            transition
                            bg-white
                            
                            p-1
                            rounded-full
                            text-black
                        "/>

                    </div>
                    <AiFillStepForward
                        onClick={onPlayNext}
                        size={30}
                        className="
                            text-white
                            cursor-pointer
                            hover:text-gray-500
                            transition
                            " />
                </div>

                <div className="hidden md:flex w-full justify-end pr-2">
                    <div className="flex items-center gap-x-2 w-[120px]" >
                        <VolumeIcon
                            onClick={toggleMute}
                            size={25}
                            className="cursor-pointer text-white hover:text-gray-500 transition"
                        />
                        <Slider
                            value={volume}
                            onChange={(value) => setVolume(value)}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
