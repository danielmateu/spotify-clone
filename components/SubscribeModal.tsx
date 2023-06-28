"use client"

import { Button } from "./Button"
import { Modal } from "./Modal"
import { Price, ProductWithPrice } from "@/types"

interface SubscribeModalProps {
    products: ProductWithPrice[]
}

const formatPrice = (price: Price) => {
    const priceString = new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: price.currency,
        minimumFractionDigits: 0
    }).format((price?.unit_amount || 0 / 100))

    return priceString
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({ products }) => {



    let content = (
        <div className="text-center">
            No products available
        </div>
    )

    if (products.length > 0) {
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

    return (
        <Modal
            title="Want to be a premium member?"
            description="Subscribe to our premium plan to get access to all the features."
            isOpen
            onChange={() => { }}
        >
            {
                content
            }
        </Modal>
    )
}
