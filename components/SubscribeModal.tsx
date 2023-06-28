"use client"

import { useState } from "react"
import { Button } from "./Button"
import { Modal } from "./Modal"
import { Price, ProductWithPrice } from "@/types"
import { Subscription } from '../types';
import { useUser } from "@/hooks/useUser"
import { toast } from "react-hot-toast"
import { postData } from "@/libs/helpers"
import { getStripe } from "@/libs/stripeClient"
import { useSubscribeModal } from "@/hooks/useSubscribeModal"

interface SubscribeModalProps {
    products: ProductWithPrice[]
}

const formatPrice = (price: Price) => {
    const priceString = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: price.currency,
        minimumFractionDigits: 0
    }).format((price?.unit_amount || 0) / 100)

    return priceString
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({ products }) => {

    const subscribeModal = useSubscribeModal()
    const { user, isLoading, subscription } = useUser()
    const [priceIdLoading, setPriceIdLoading] = useState<string>()

    const onChange = (open: boolean) => {
        if (!open) {
            subscribeModal.onClose()
        }
    }

    const handleCheckout = async (price: Price) => {
        setPriceIdLoading(price.id)

        if (!user) {
            setPriceIdLoading(undefined)
            return toast.error('You must be logged in to subscribe')
        }

        if (subscription) {
            setPriceIdLoading(undefined)
            return toast.error('You are already subscribed')
        }

        try {
            const { sessionId } = await postData({
                url: '/api/create-checkout-session',
                data: { price }
            })

            const stripe = await getStripe()
            stripe?.redirectToCheckout({ sessionId })

        } catch (error) {
            console.log(error)
            // toast.error('Error creating checkout session')
            toast.error((error as Error)?.message || 'Error creating checkout session')

        } finally {
            setPriceIdLoading(undefined)
        }
    }

    let content = (
        <div className="text-center">
            No products available
        </div>
    )

    if (products.length) {
        content = (
            <div>
                {products.map((product) => {
                    if (!product.prices?.length) {
                        return (
                            <div
                                key={product.id}
                                className="text-center">
                                No prices available
                            </div>
                        )
                    }

                    return product.prices.map((price) => {
                        return (
                            <Button
                                key={price.id}
                                onClick={() => handleCheckout(price)}
                                disabled={isLoading || price.id === priceIdLoading}
                                className="text-center">
                                {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
                            </Button>
                        )
                    })
                })
                }

            </div>
        )
    }

    if (subscription) {
        content = (
            <div className="text-center">
                <p>You are already subscribed</p>
                {/* <p>Next payment: {new Date(subscription.current_period_end * 1000).toLocaleDateString()}</p> */}
            </div>
        )
    }

    return (
        <Modal
            title="Want to be a premium member?"
            description="Subscribe to our premium plan to get access to all the features."
            isOpen={subscribeModal.isOpen}
            onChange={onChange}
        >
            {
                content
            }
        </Modal>
    )
}
