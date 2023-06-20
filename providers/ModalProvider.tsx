"use client"

import { Modal } from "@/components/Modal"
import { useEffect, useState } from "react"


export const ModalProvider = () => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) return null

    return (
        <>
            <Modal
                title="Modal Title"
                description="Modal Description"
                isOpen
                onChange={() => { }}

            >
                Modal Content
            </Modal>
        </>
    )
}
