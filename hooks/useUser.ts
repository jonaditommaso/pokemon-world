import { useState, useEffect } from "react";

import { onAuthStateChanged } from "../firebase/config";

export const USER_STATES = {
    NOT_LOGGED: null,
    NOT_KNOW: undefined
}

export default function useUser() {

    const [user, setUser] = useState(USER_STATES.NOT_KNOW);

    useEffect(() => {
        onAuthStateChanged(setUser);
    }, []);

    return user;
}