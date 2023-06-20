"use client"

import { useUploadModal } from "@/hooks/useUploadModal"
import { Modal } from "./Modal"
import { useForm } from "react-hook-form"
import { FieldValues } from "react-hook-form/dist/types/fields"
import { SubmitHandler } from "react-hook-form/dist/types/form"
import { useState } from "react"
import { Input } from "./Input"
import { Button } from "./Button"
import { toast } from 'react-hot-toast';
import { useUser } from "@/hooks/useUser"
import uniqid from 'uniqid'
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from "next/navigation"

export const UploadModal = () => {
    const [isLoading, setIsLoading] = useState(false)
    const uploadModal = useUploadModal()
    const { user } = useUser()
    const supabaseClient = useSupabaseClient()
    const router = useRouter()

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            author: "",
            title: "",
            song: null,
            image: null
        }
    })

    const onChange = (open: boolean) => {
        if (!open) {
            // Reset form
            reset()
            uploadModal.onClose()
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        // Upload to supabase
        try {
            setIsLoading(true)

            const imageFile = values.image?.[0]
            const songFile = values.song?.[0]

            if (!imageFile || !songFile || !user) {
                toast.error("Something went wrong")
                return
            }

            const uniqueID = uniqid()

            // upload song
            const {
                data: songData,
                error: songError
            } = await supabaseClient
                .storage
                .from('songs')
                .upload(`song-${values.title}-${uniqueID}`, songFile, {
                    cacheControl: '3600',
                    upsert: false,
                    contentType: 'audio/mpeg',

                })

            if (songError) {
                setIsLoading(false)
                return toast.error("Failed song upload")

            }

            // upload image
            const {
                data: imageData,
                error: imageError
            } = await supabaseClient
                .storage
                .from('images')
                .upload(`image-${values.title}-${uniqueID}`, imageFile, {
                    cacheControl: '3600',
                    upsert: false,
                    // contentType: 'image/png',
                })

            if (imageError) {
                setIsLoading(false)
                return toast.error("Failed image upload")
            }

            // insert into db
            const {
                // data: insertData,
                error: supabaseError
            } = await supabaseClient
                .from('songs')
                .insert(
                    {
                        user_id: user.id,
                        title: values.title,
                        author: values.author,
                        image_path: imageData.path,
                        song_path: songData.path,
                    })

            if (supabaseError) {
                setIsLoading(false)
                return toast.error("Failed to insert into db")
            }

            router.refresh()
            setIsLoading(false)
            toast.success("Song uploaded successfully")
            reset()
            uploadModal.onClose()

        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }


    }

    return (
        <Modal
            title="Add a song"
            description="Upload an mp3 file"
            isOpen={uploadModal.isOpen}
            onChange={onChange}
        >

            <form
                className="flex flex-col w-full gap-4"
                onSubmit={handleSubmit(onSubmit)}>
                <Input
                    id='title'
                    disabled={isLoading}
                    {...register('title', { required: true })}
                    placeholder="Song Title"
                />
                <Input
                    id='author'
                    disabled={isLoading}
                    {...register('author', { required: true })}
                    placeholder="Song author"
                />

                <div>
                    <div
                        className="pb-1"
                    >
                        Select a song file
                    </div>

                    <Input
                        id='song'
                        type="file"
                        disabled={isLoading}
                        {...register('song', { required: true })}
                        // placeholder="Song author"
                        accept=".mp3"
                    />
                </div>

                <div>
                    <div
                        className="pb-1"
                    >
                        Select an image
                    </div>

                    <Input
                        id='image'
                        type="file"
                        disabled={isLoading}
                        accept="image/*"
                        {...register('image', { required: true })}
                    // placeholder="Song author"
                    />
                </div>

                <Button
                    disabled={isLoading}
                    type="submit"
                >
                    Create
                </Button>

            </form>
        </Modal>
    )
}
