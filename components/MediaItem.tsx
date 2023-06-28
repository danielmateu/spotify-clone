"use client"

import { useLoadImage } from '@/hooks/useLoadImage';
import usePlayer from '@/hooks/usePlayer';
import { Song } from '@/types'
import Image from 'next/image';

interface MediaItemProps {
    data: Song;
    onClick?: (id: string) => void;
}

export const MediaItem: React.FC<MediaItemProps> = ({ data, onClick }) => {
    const player = usePlayer()
    const imageUrl = useLoadImage(data)

    const handleClick = () => {
        if (onClick) {
            onClick(data.id)
        }

        // TODO: Default turn on player
        return player.setId(data.id)
    }

    return (
        <>
            <div
                onClick={handleClick}
                key={data.id}
                className="
                            flex
                            items-center
                            gap-x-2
                            cursor-pointer
                            bg-neutral-400/5
                            hover:bg-neutral-400/10
                            transition
                            duration-300
                            rounded-md
                            p-2
                            "
            >
                {/* <p>{data.title} - <span
                    className="text-neutral-400"
                >{data.author}</span></p> */}
                <div className="
                relative
                rounded-md
                min-h-[48px]
                min-w-[48px]
                bg-neutral-400/10
                overflow-hidden
                
                ">
                    <Image
                        fill
                        sizes='48px'
                        src={imageUrl || '/images/liked.png'}
                        alt='Media item'
                        className='object-cover'
                    />
                </div>
                <div className="
                flex
                flex-col
                gap-y-1
                overflow-hidden
                ">
                    <p className='
                    text-white
                    truncate
                    '>
                        {data.title}
                    </p>
                    <p className='
                    text-neutral-400
                    truncate
                    '>
                        {data.author}
                    </p>
                </div>
            </div>
        </>
    )
}
