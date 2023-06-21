"use client"

import { Song } from "@/types"

interface SearchContentProps {
    songs: Song[]
}

export const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
    return (
        <div>SearchContent</div>
    )
}
