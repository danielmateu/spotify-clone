"use client"
import { useRouter } from "next/navigation";
import { twMerge } from 'tailwind-merge';
import { RxCaretLeft } from "react-icons/rx";
import { RxCaretRight } from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { HiSearch } from "react-icons/hi";

interface HeaderProps {
    children?: React.ReactNode;
    className?: string;
}

export const Header: React.FC<HeaderProps> = ({ children, className }) => {

    const router = useRouter();

    const handleLogout = () => {
        // Handle Logout in the future
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
            </div>

        </div>
    )
}
