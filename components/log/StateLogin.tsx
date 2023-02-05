import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router'
import { useActions } from '../../hooks/useActions';
import { signOut } from '../../redux/action-creators';
import { Button } from '@mui/material';

interface User {
    thereIsUser: string | boolean
}

const StateLogin = ({ thereIsUser }: User) => {

    const { signOut } = useActions()

    const [buttonColor, setButtonColor] = useState('contained');
    const router = useRouter()
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

export default connect(mapStateToProps, { signOut })(StateLogin);