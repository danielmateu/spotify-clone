import { getUrl } from "@/libs/helpers";
import { stripe } from "@/libs/stripe";
import { createOrRetrieveCustomer } from "@/libs/supabaseAdmin";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function POST() {
    try {
        const supabase = createRouteHandlerClient({ cookies })

        const { data: { user } } = await supabase.auth.getUser()

        if (!user) { return new Error('Unauthorized') }

        const customer = await createOrRetrieveCustomer({
            uuid: user?.id || "",
            email: user?.email || "",
        })

        if (!customer) {
            return new Error('Unauthorized')
        }

        const { url } = await stripe.billingPortal.sessions.create({
            customer,
            return_url: `${getUrl()}/account`,
        })

        return NextResponse.json({ url })
    } catch (error: any) {
        return new NextResponse('Internal Error', { status: 500 })

    }
}

