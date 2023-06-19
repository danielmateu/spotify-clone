import { User } from '@supabase/supabase-js';
import { userDetails, Subscription } from '../types';
import { createContext, useEffect, useState } from 'react';
import { useSessionContext, useUser as useSupaUser } from '@supabase/auth-helpers-react';

type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: userDetails | null;
    isLoading: boolean;
    subscription: Subscription | null
}

export const UserContext = createContext<UserContextType | undefined>(undefined)

export interface Props {
    [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
    const {
        session,
        isLoading: isLoadingUser,
        supabaseClient: supabase
    } = useSessionContext()

    const user = useSupaUser()
    const accessToken = session?.access_token ?? null

    const [isLoadingData, setIsLoadingData] = useState(false)
    const [userDetails, setUserDetails] = useState<userDetails | null>(null)
    const [subscription, setSubscription] = useState<Subscription | null>(null)

    const getUserDetails = supabase.from('users').select('*').single()
    const getSubscription = supabase.from('subscriptions').select('*, prices(*, products(*))').in('status', ['trialing', 'active']).single()

    useEffect(() => {
        if (user && !isLoadingData && !userDetails && !subscription) {
            setIsLoadingData(true)

            Promise.allSettled([getUserDetails, getSubscription]).then((results) => {
                const userDeailsPromise = results[0]
                const subscriptionPromise = results[1]

                if (userDeailsPromise.status === 'fulfilled') {
                    setUserDetails(userDeailsPromise.value.data as userDetails)
                }

                if (subscriptionPromise.status === 'fulfilled') {
                    setSubscription(subscriptionPromise.value.data as Subscription)
                }

                setIsLoadingData(false)
            })
        } else if (!user && !isLoadingUser && !isLoadingData) {
            setUserDetails(null)
            setSubscription(null)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, isLoadingUser])

    const value = {
        accessToken,
        user,
        userDetails,
        isLoading: isLoadingUser || isLoadingData,
        subscription
    };

    return <UserContext.Provider value={value} {...props} />;
}




