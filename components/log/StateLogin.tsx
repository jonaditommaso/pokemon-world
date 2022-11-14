import React, { useState, useEffect } from 'react';
// import '../../styles/stateLogin.css';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router'

const StateLogin = () => {

    const [buttonColor, setButtonColor] = useState('danger');
    const router = useRouter()
    // useEffect(() => {
    //     if(thereIsUser) {
    //         setButtonColor('outline-danger');
    //     }
    //     else {
    //         setButtonColor('danger');
    //     }
    // }, [thereIsUser]);

    const handleClick = () => {
        // if(!thereIsUser) {
            router.push('/signin');
        // }
        // else {
        //     signOut();
        //     history.push('/');
        // }
    }


    return (
        <div className="stateLogin">
            <Button
                onClick={() => handleClick()}
                variant={buttonColor}
            >
                {/* {!thereIsUser ? 'Sign In' : 'Sign Out'} */}
                Sign In
            </Button>
        </div>
    );

}

// const mapStateToProps = (state: any) => {
//     return { thereIsUser: state.login.user }
// }

// export default connect(mapStateToProps, null)(StateLogin);
export default StateLogin