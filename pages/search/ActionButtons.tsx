import { useRouter } from 'next/router';
import { connect } from 'react-redux';

import styles from './search.module.css';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';
import { useActions } from '../../hooks/useActions';
import { chooseYou } from '../../redux/action-creators';

interface ActionButtonsProps {
    pokemonData: any,
    getAdjacentPokemon: (adjacentType: 'prev' | 'next') => Promise<void>
}

const ActionButtons = ({ pokemonData, getAdjacentPokemon }: ActionButtonsProps) => {
    const router = useRouter()
    const { chooseYou } = useActions();

    const iChooseYouButton = () => {
        chooseYou(pokemonData);
        router.push('/fight');
    }

    return (
        <div className={styles.topButtons}>
            <PrimaryButton
                text='Prev'
                onClick={() => getAdjacentPokemon('prev')}
                style={{width: '4rem', marginRight: '0.5%'}}
                disabled={pokemonData.id === 1}
            />

            <SecondaryButton
                text='I choose you!'
                onClick={iChooseYouButton}
                style={{width: '10rem'}}
            />

            <PrimaryButton
                text='Next'
                onClick={() => getAdjacentPokemon('next')}
                style={{width: '4rem', marginLeft: '0.5%'}}
            />
        </div>
    );
}

export default connect(null, { chooseYou })(ActionButtons);