"use client"

import { useAuthModal } from "@/hooks/useAuthModal"
import { useUser } from "@/hooks/useUser"
import { useSessionContext } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { FcLike } from "react-icons/fc"


interface LikeButtonProps {
    songId: string
    onClick: () => void
}

export const LikeButton: React.FC<LikeButtonProps> = ({
    songId,
    onClick
}) => {

    const router = useRouter()
    const { supabaseClient } = useSessionContext()

    const authModal = useAuthModal()
    const { user } = useUser()

    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        if (!user?.id) {
            return
        }

        const fetchData = async () => {
            const { data, error } = await supabaseClient
                .from('liked_songs')
                .select('*')
                .eq('user_id', user.id)
                .eq('song_id', songId)
                .single()

            if (!error && data) {
                setIsLiked(true)
            }
        }

        fetchData()
    }, [songId, supabaseClient, user?.id])

    const Icon = isLiked ? AiFillHeart : AiOutlineHeart

    const handleLike = async () => {

        if (!user?.id) {
            return authModal.onOpen()
        }

        if (isLiked) {
            const { error } = await supabaseClient
                .from('liked_songs')
                .delete()
                .eq('user_id', user.id)
                .eq('song_id', songId)

            if (error) {
                toast.error(error.message)
            } else {
                setIsLiked(false)
                toast.success('Song unliked')

            }

        } else {
            const { error } = await supabaseClient
                .from('liked_songs')
                .insert({ user_id: user.id, song_id: songId })

            if (error) {

                toast.error(error.message)
            } else {
                setIsLiked(true)
                toast.success('Song liked')

            }
        }
        router.refresh()
    }

    return (
        <button
            className="
        rounded-full
        bg-neutral-800
        hover:scale-110
        transition
        duration-300
        p-2
        "
            onClick={handleLike}
        >
            <Icon
                color={isLiked ? 'red' : 'white'} size={25}
            />

        </button>
    )
}
