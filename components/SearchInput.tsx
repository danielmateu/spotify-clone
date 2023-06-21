"use client"

import useDebounce from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import qs from "query-string"
import { Input } from './Input';

export const SearchInput = () => {

    const router = useRouter()
    const [value, setValue] = useState<string>("")
    const debouncedValue = useDebounce<string>(value, 500)

    useEffect(() => {
        const query = {
            title: debouncedValue,
        }

        const url = qs.stringifyUrl({
            url: "/search",
            query,
        })
    }, [debouncedValue, router])




    return (
        <Input
            placeholder='Search for a song'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className='mt-4'
        />
    )
}
