import { useEffect } from 'react';

import { useRouter } from 'next/router'

export const useRedirect = (user: string | boolean) => {
    const router = useRouter();

    useEffect(() => {
        if(!user) {
            router.push('/signin');
        }
    }, [user, router]);
}