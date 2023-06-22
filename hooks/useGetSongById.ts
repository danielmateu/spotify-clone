import { useEffect, useMemo, useState } from "react"
import { Song } from '../types';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { set } from "react-hook-form";
import { toast } from "react-hot-toast";


export const useGetSongById = (id?: string) => {

    const [isLoading, setIsLoading] = useState(false)
    const [song, setSong] = useState<Song | undefined>(undefined)
    const { supabaseClient } = useSessionContext()

    useEffect(() => {
        if (!id) {
            return
        }

        setIsLoading(true)

        const fetchSong = async () => {
            const { data: song, error } = await supabaseClient
                .from('songs')
                .select('*')
                .eq('id', id)
                .single()

            if (error) {
                setIsLoading(false)
                toast.error(error.message)
                // console.log(error)
            } else {
                setSong(song)
            }
        }

        fetchSong()
    }, [id, supabaseClient])


    useMemo(() => ({
        isLoading,
        song
    }), [isLoading, song])
}

export default useGetSongById
