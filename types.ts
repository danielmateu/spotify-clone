import Stripe from "stripe";
import { metadata } from './app/layout';

export interface userDetails {
    id: string;
    first_name: string;
    last_name: string;
    full_name: string;
    avatar_url: string;
    billing_address: Stripe.Address;
    payment_method: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}

export interface Subscription {
    id: string;
    user_id: string;
    status?: Stripe.Subscription.Status;
    metadata?: Stripe;
    price_id?: string;
    quantity?: number;
    cancel_at_period_end?: boolean;
    created: string;
    current_period_start: string;
    current_period_end: string;
    ended_at?: string;
    canceled_at?: string;
}