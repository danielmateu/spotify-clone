import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js"

import { Database } from '@/types_db';
import { Price, Product } from '../types';

import { stripe } from "./stripe";
import { toDateTime } from "./helpers";
import { metadata } from '../app/layout';

export const supabaseAdmin = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

export const upsertProductRecord = async (product: Stripe.Product) => {
    const productData: Product = {
        id: product.id,
        active: product.active,
        name: product.name,
        description: product.description ?? undefined,
        image: product.images[0] ?? null,
        metadata: product.metadata,
    }

    const { error } = await supabaseAdmin.from('products').upsert([productData]);

    if (error) {
        throw new Error(error.message);
    }

    console.log(`Product ${product.id} upserted`);
    return productData;
}

const upsertPriceRecord = async (price: Stripe.Price) => {
    const priceData: Price = {
        id: price.id,
        product_id: typeof price.product === 'string' ? price.product : '',
        active: price.active,
        currency: price.currency,
        description: price.nickname ?? undefined,
        type: price.type,
        unit_amount: price.unit_amount ?? undefined,
        interval: price.recurring?.interval,
        interval_count: price.recurring?.interval_count,
        trial_period_days: price.recurring?.trial_period_days ?? undefined,
        metadata: price.metadata,
    }

    const { error } = await supabaseAdmin.from('prices').upsert([priceData]);

    if (error) {
        throw new Error(error.message);
    }

    console.log(`Price ${price.id} inserted/updated`);
}

const createOrRetriveCustomer = async (email: string, uuid: string) => {
    const { data, error } = await supabaseAdmin
        .from('customers')
        .select('stripe_customer_id')
        .eq('id', uuid)
        .single();

    if (error || !data?.stripe_customer_id) {
        const customerData: {
            metadata: { supabaseUUID: string };
            email?: string;
        } = {
            metadata: { supabaseUUID: uuid },
        }

        if (email) {
            customerData.email = email;
        }

        const customer = await stripe.customers.create(customerData);
        const { error: supabaseError } = await supabaseAdmin
            .from('customers')
            .insert([{ id: uuid, stripe_customer_id: customer.id }]);

        if (supabaseError) {
            throw new Error(supabaseError.message);
        }

        console.log(`Customer created and inserted for ${uuid}`);
        return customer.id;
    }

    return data.stripe_customer_id;
}

const copyBillingDetailsToCustomer = async (uuid: string, payment_method: Stripe.PaymentMethod) => {
    const customer = payment_method.customer as string;
    const { name, phone, address } = payment_method.billing_details;

    if (!name || !address || !phone) {
        throw new Error('Name and address are required to copy billing details to customer');
    }

    await stripe.customers.update(customer, {
        //  @ts-ignore
        name, phone, address
    })

    const { error } = await supabaseAdmin
        .from('users')
        .update({
            billing_address: { ...address },
            payment_method: { ...payment_method[payment_method.type] },
        })
        .eq('id', uuid);

    if (error) {
        throw new Error(error.message);
    }

}
