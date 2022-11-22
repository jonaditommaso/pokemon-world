import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router'
import { useActions } from '../../hooks/useActions';
import { signOut } from '../../redux/action-creators';

const StateLogin = ({ thereIsUser }: any) => {

    const { signOut } = useActions()

    const [buttonColor, setButtonColor] = useState('danger');
    const router = useRouter()
    useEffect(() => {
        if(thereIsUser) {
            setButtonColor('outline-danger');
        }
        else {
            setButtonColor('danger');
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