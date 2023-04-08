import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { FaGithub } from 'react-icons/fa';
import { connect } from 'react-redux';

import { loginWithGithub } from '../../firebase/config';
import { useActions } from '../../hooks/useActions';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';

interface ContinueProps {
    account: string,
    thereIsUser: boolean
}

const ContinueWith = ({ account, thereIsUser }: ContinueProps) => {

    const { signIn } = useActions();
    const router = useRouter();

    const icons = {
        github: <FaGithub size={23} style={{marginRight: '7px'}} />
    }

    const handleSignIn = async () => {
        const { user } = await loginWithGithub();
        if (user?.displayName) {
            signIn(user.displayName);
            localStorage.setItem('USER_NAME_GITHUB', user.displayName)
            router.push('/pokemons');
        }
    }

    return (
        <div style={{marginTop: '30px', marginBottom: '10px'}}>
            <Button onClick={handleSignIn} color='secondary' variant='contained' disabled={thereIsUser}>
                {icons[account as keyof typeof icons]}    Continue with {capitalizeFirstLetter(account)}
            </Button>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        thereIsUser: state.login.user,
        music: state.music,
    }
}

export default connect(mapStateToProps, null)(ContinueWith);