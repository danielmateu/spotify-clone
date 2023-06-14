import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from 'tailwind-merge';

interface SidebarItemProps {
    icon: IconType;
    label: string;
    active?: boolean;
    href: string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
    icon: Icon,
    label,
    active,
    href
}) => {
    return (
        <Link
            href={href}
            className={twMerge(`
            flex
            flex-row
            h-auto
            w-full
            items-center
            gap-x-2
            text-medium-emphasis
            cursor-pointer
            hover:text-white
            transition
            text-neutral-400
            py-1
            `,
                active && `
                text-white
                bg-neutral-800
                hover:bg-neutral-700
                rounded-md
                px-2
                `)}
        >
            <Icon size={22} />
            <p className="truncate w-full">{label}</p>

        </Link>
    )
}
