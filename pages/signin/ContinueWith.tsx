import { Button } from '@mui/material';
import { FaGithub } from 'react-icons/fa';
import { useActions } from '../../hooks/useActions';
import { useRouter } from 'next/router';
import { loginWithGithub } from '../../firebase/config';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';

interface ContinueProps {
    account: string
}

const ContinueWith = ({ account }: ContinueProps) => {

    const { signIn } = useActions();
    const router = useRouter();

    const icons = {
        github: <FaGithub size={23} style={{marginRight: '7px'}} />
    }

    const handleSignIn = async () => {
        const { user } = await loginWithGithub();
        if (user?.displayName) signIn(user.displayName);
        router.push('/pokemons');
    }

    return (
        <div style={{marginTop: '30px'}}>
            <Button onClick={handleSignIn} color='secondary' variant='contained'>
                {icons[account as keyof typeof icons]}    Continue with {capitalizeFirstLetter(account)}
            </Button>
        </div>
    );
}

export default ContinueWith;