import { Button } from '@mui/material';
import { useRouter } from 'next/router';

import styles from './allPokemons.module.css'
import FilterButton from '../../components/pokemon/FilterPokemonButton';


interface ActionButtonsProps {
    disablePrev: boolean,
    pokemonList: (typeList: 'prev' | 'next') => Promise<void>,
    resetPokemons: () => void,
    setTypeSelected: React.Dispatch<React.SetStateAction<boolean | string>>,
    typeSelected: boolean | string,
}

const ActionButtons = ({
    disablePrev,
    pokemonList,
    resetPokemons,
    setTypeSelected,
    typeSelected,
}: ActionButtonsProps) => {

    const router = useRouter();

    const handleGoBack = () => {
        setTypeSelected(false)
        resetPokemons();
    }

    const showButtons = () => {
        if(typeSelected) {
            return (
                <Button
                    variant="contained"
                    color='error'
                    onClick={handleGoBack}
                >
                    Go Back
                </Button>
            )
        } else {
            return (
                <>
                    <Button variant="contained" color='error' onClick={()=> router.push('/')} className={styles['go-home-button']}>Go Home</Button>
                    <Button variant="contained" onClick={() => pokemonList('prev')} disabled={disablePrev}>Prev</Button>
                    <Button variant="contained" onClick={() => pokemonList('next')}>Next</Button>
                </>

            );
        }
    }

    const navButtons = showButtons();

    return (
        <div className={styles.showAllPokemons__buttons}>
            {navButtons}
            <FilterButton setTypeSelected={setTypeSelected} />
        </div>
    );
}

export default ActionButtons;