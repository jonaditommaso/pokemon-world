import { useState, useEffect } from "react";

import get from 'lodash/get'

import useUser from "./useUser";

interface UserOrigin {
    origin: string,
    username: string,
}

export default function useOriginUser() {

    const [originUser, setOriginUser] = useState <UserOrigin>({origin: '', username: ''});
    const githubUser = useUser();

    useEffect(() => {
      if(typeof window !== 'undefined') {
        localStorage.getItem('USER_NAME')
        ? setOriginUser({origin: 'simple_account', username: localStorage.getItem('USER_NAME') || ''})
        : setOriginUser({origin: 'github', username: get(githubUser, 'userId', '')});
      }
    }, [githubUser]);

    return originUser;
}