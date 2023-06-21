"use client"

import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react"
import { Modal } from "./Modal"
import { useRouter } from "next/navigation"
import { Auth } from "@supabase/auth-ui-react"
import { ThemeSupa } from "@supabase/auth-ui-shared"
import { useAuthModal } from "@/hooks/useAuthModal"
import { useEffect } from "react"

export const AuthModal = () => {
    const supabaseClient = useSupabaseClient()
    const router = useRouter()
    const { session } = useSessionContext()
    const { onClose, isOpen } = useAuthModal()

    useEffect(() => {
        if (session) {
            router.refresh()
            onClose()
        }
    }, [onClose, router, session])

    const onChange = (open: boolean) => {
        if (!open) {
            onClose()
        }
    }

    return (
        <Modal
            title="Authorization Required"
            description="You need to be logged in to access this page."
            isOpen={isOpen}
            onChange={onChange}
        >
            <Auth
                theme="dark"
                magicLink
                providers={[
                    // 'google', 
                    'github'
                ]}
                supabaseClient={supabaseClient}
                appearance={{
                    theme: ThemeSupa,
                    variables: {
                        default: {
                            colors: {
                                brand: "#404040",
                                brandAccent: "#22c55e",
                            }
                        }
                    }
                }}
            />
        </Modal>
    )
}
