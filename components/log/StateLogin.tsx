import React, { useState, useEffect } from 'react';

import { Button } from '@mui/material';
import get from 'lodash/get'
import { useRouter } from 'next/router'
import { connect } from 'react-redux';

import { useActions } from '../../hooks/useActions';
import useUser from '../../hooks/useUser';
import { RootState } from '../../redux';
import { signOut, signIn } from '../../redux/action-creators';

interface User {
    thereIsUser: string | boolean
}

const StateLogin = ({ thereIsUser }: User) => {

    const { signOut, signIn } = useActions();
    const githubUser = useUser();

    const [buttonColor, setButtonColor] = useState<'contained' | 'outlined' | 'text'> ('contained');
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem('USER_NAME');
        if(!localStorage.getItem('USER_NAME') && !localStorage.getItem('USER_NAME_GITHUB')) return;
        if (user || githubUser) {
            signIn(user ?? get(githubUser, 'userName', ''));
            user ? localStorage.setItem('USER_NAME', user) : localStorage.setItem('USER_NAME_GITHUB', get(githubUser, 'userName', ''));
        }
    }, [githubUser]);

    useEffect(() => {
        if(thereIsUser) {
            setButtonColor('outlined');
        }
        else {
            setButtonColor('contained');
        }
    }, [thereIsUser]);

    const handleClick = () => {
        if(!thereIsUser) {
            router.push('/signin');
        }
        else {
            signOut();
            localStorage.removeItem('USER_NAME');
            localStorage.removeItem('USER_NAME_GITHUB');
            router.push('/');
        }
    }


    return (
        <div className="stateLogin">
            <Button
                onClick={() => handleClick()}
                variant={buttonColor}
                color='error'
            >
                {!thereIsUser ? 'Sign In' : 'Sign Out'}
            </Button>
        </div>
    );

}

const mapStateToProps = (state: RootState) => {
    return { thereIsUser: state.login.user }
}

export default connect(mapStateToProps, { signOut, signIn })(StateLogin);