"use client";

import { useSubscribeModal } from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from '../loading';
import { set } from "react-hook-form";
import { postData } from "@/libs/helpers";
import { toast } from "react-hot-toast";
import { Button } from "@/components/Button";

export const AccountContent = () => {

    const router = useRouter()
    const subscribeModal = useSubscribeModal()
    const { isLoading, subscription, user } = useUser()

    const [Loading, setLoading] = useState(false)

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/')
        }
    }, [isLoading, router, user])

    const redirectToCustomerPortal = async () => {
        setLoading(true)
        try {
            const { url, error } = await postData({
                url: '/api/create-portal-link'
            })
            window.location.assign(url)
        } catch (error) {
            console.log(error)
            if (error) {
                toast.error((error as Error).message)
            }
        }
        setLoading(false)
    }
    return (
        <div className="mb-7 px-6">
            {!subscription && (
                <div className="flex flex-col gap-y-4">
                    <p>No active plan</p>
                    <Button
                        onClick={subscribeModal.onOpen}
                        className="w-[300px]"
                    >
                        Subscribe
                    </Button>
                </div>
            )}

            {subscription && (
                <div className="flex flex-col gap-y-4">
                    <p>Active plan: {subscription?.prices?.products?.name}</p>
                    <Button
                        onClick={redirectToCustomerPortal}
                        className="w-[300px]"
                        disabled={Loading || isLoading}
                    >
                        Manage Subscription
                    </Button>
                </div>
            )}

        </div>
    )
}
