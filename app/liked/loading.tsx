"use client"

import { Box } from "@/components/Box"
import { BounceLoader } from "react-spinners"



const Loading = () => {
    return (
        <Box className="h-full flex items-center justify-center ">
            {/* Loading... */}
            <BounceLoader color="#22c55e" size={60} />
        </Box>
    )
}

export default Loading
