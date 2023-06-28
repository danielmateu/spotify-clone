"use client"
import { useRouter } from "next/navigation";
import { twMerge } from 'tailwind-merge';
import { RxCaretLeft } from "react-icons/rx";
import { RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { HiSearch } from "react-icons/hi";
import { Button } from "./Button";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUser } from "react-icons/fa";
import { toast } from "react-hot-toast";
import usePlayer from "@/hooks/usePlayer";
interface HeaderProps {
    children?: React.ReactNode;
    className?: string;
}

export const Header: React.FC<HeaderProps> = ({ children, className }) => {

    const player = usePlayer()
    const authModal = useAuthModal()
    const router = useRouter();

    const supabaseClient = useSupabaseClient()

    const { user } = useUser()

    const handleLogout = async () => {
        // Handle Logout in the future
        const { error } = await supabaseClient.auth.signOut()
        // TODO: Reset any playing songs
        player.reset()
        router.refresh()

        if (error) {
            toast.error(error.message)
        } else {
            toast.success("Logged out successfully")
        }
    }
    return (
        <div
            className={twMerge(
                `
                h-fit
                bg-gradient-to-b    
                from-emerald-800
                p-6
                `,
                className
            )}
        >
            <div className="flex items-center justify-between w-full mb-4">
                <div className="hidden md:flex gap-x-2 items-center">
                    <button
                        className="bg-black rounded-full p-2 items-center hover:opacity-75 transition-opacity"
                        onClick={() => router.back()}
                    >
                        <RxCaretLeft
                            size={35}
                            className="text-white"
                        />
                    </button>
                    <button
                        className="bg-black rounded-full p-2 items-center hover:opacity-75 transition-opacity"
                        onClick={() => router.forward()}
                    >
                        <RxCaretRight
                            size={35}
                            className="text-white"
                        />
                    </button>

                </div>
                <div className="flex md:hidden gap-2 items-center">
                    <button
                        className="bg-white rounded-full p-2 items-center hover:opacity-75 transition-opacity"
                    >
                        <HiHome
                            size={30}
                            className="text-black"
                        />

                    </button>
                    <button
                        className="bg-white rounded-full p-2 items-center hover:opacity-75 transition-opacity"
                    >
                        <HiSearch
                            size={30}
                            className="text-black"
                        />

                    </button>
                </div>
                <div
                    className="flex gap-2 items-center justify-center"
                >
                    {
                        user ? (
                            <div
                                className="flex gap-2 items-center justify-center"
                            >
                                <Button
                                    onClick={handleLogout}
                                    className="bg-white px-6 py-2 transition"
                                >Logout</Button>

                                <Button
                                    className="rounded-full p-2 items-center hover:opacity-75 transition-opacity"
                                    onClick={() => router.push(`/account`)}
                                >
                                    <FaUser
                                        size={25}
                                        className="text-black"
                                    />
                                </Button>
                            </div>
                        ) : (
                            <>
                                <div>
                                    <Button
                                        onClick={authModal.onOpen}
                                        className="bg-transparent text-neutral-300 font-medium"
                                    >
                                        Sign up
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        onClick={authModal.onOpen}
                                        className="bg-white px-4 py-2 text-black font-medium"
                                    >
                                        Log in
                                    </Button>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
            {children}
        </div>
    )
}
