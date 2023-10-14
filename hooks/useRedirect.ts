import { useEffect } from 'react';

import { useRouter } from 'next/router'

export const useRedirect = () => {
    const router = useRouter();

    useEffect(() => {
        if(typeof window !== 'undefined' && !localStorage.getItem('USER_NAME') && !localStorage.getItem('USER_NAME_GITHUB')) {
            router.push('/signin');
        }
    }, [router]);
}