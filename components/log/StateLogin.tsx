import React, { useState, useEffect } from 'react';

import { Button } from '@mui/material';
import { useRouter } from 'next/router'
import { connect } from 'react-redux';

import { useActions } from '../../hooks/useActions';
import useUser from '../../hooks/useUser';
import { signOut, signIn } from '../../redux/action-creators';

interface User {
    thereIsUser: string | boolean
}

const StateLogin = ({ thereIsUser }: User) => {

    const { signOut, signIn } = useActions();
    const githubUser = useUser();

    const [buttonColor, setButtonColor] = useState('contained');
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem('USER_NAME');
        if(!localStorage.getItem('USER_NAME')) return;
        if (user || githubUser) {
            signIn(user ?? githubUser.userName);
            localStorage.setItem('USER_NAME', user || githubUser.userName);
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
            localStorage.removeItem('USER_NAME')
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

const mapStateToProps = (state: any) => {
    return { thereIsUser: state.login.user }
}

export default connect(mapStateToProps, { signOut, signIn })(StateLogin);