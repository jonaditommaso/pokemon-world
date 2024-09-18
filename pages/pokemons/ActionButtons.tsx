import { useEffect, useMemo, useState } from 'react';

import { Button } from '@mui/material';
import { useRouter } from 'next/router';

import styles from './allPokemons.module.css'
import FilterButton from '../../components/pokemon/FilterPokemonButton';
import { loadPokemons } from '../../helpers/getAndLoadPokemons';
import pokeapi from '../../helpers/pokeapi';
import PokemonService from '../../helpers/PokemonHelper';
import { PokemonData } from '../../interfaces/PokemonData';

type Pagination = {
    nextUrl: string | null
    prevUrl: string | null
};

interface ActionButtonsProps {
    initialNextUrl: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setPokemonData: React.Dispatch<React.SetStateAction<PokemonData[] | undefined>>
    firstPokemons:  PokemonData[] | null
    pagination: Pagination
    setPagination: React.Dispatch<React.SetStateAction<Pagination>>
}

const pokemonService = new PokemonService();

const ActionButtons = ({
    initialNextUrl,
    setLoading,
    setPokemonData,
    firstPokemons,
    pagination,
    setPagination
}: ActionButtonsProps) => {

    const router = useRouter();

    const INITIAL_PAGINATION = useMemo(() => {
        return ({
            nextUrl: initialNextUrl,
            prevUrl: '',
        })
    }, []);

    const [typeSelected, setTypeSelected] = useState <boolean | string> (false);

    useEffect(() => {
        const getTypePokemon = async () => {
            setLoading(true)
            const { data } = await pokeapi.get(`/type/${typeSelected}/`);
            const result = await loadPokemons(data.pokemon);
            setPokemonData(result)
            setLoading(false);
        }

        if(typeSelected) getTypePokemon();
    }, [typeSelected]);

    const pokemonList = async (typeList: 'prev' | 'next') => {
        if(!pagination.prevUrl && typeList === 'prev') return;
        setLoading(true);

        const url = typeList === 'prev' ? pagination.prevUrl : pagination.nextUrl
        const { data } = await pokemonService.getUrlForEachPokemon(url as string);
        const newPokemons = await loadPokemons(data.results);

        setPagination((prevPagination: Pagination) => ({
            ...prevPagination,
            nextUrl: data.next,
            prevUrl: data.previous,
        }));
        setPokemonData(newPokemons);
        setLoading(false);
    }

    const resetPokemons = () => {
        if (firstPokemons) {
            setPokemonData(firstPokemons);
        }
        setPagination(INITIAL_PAGINATION);
    }

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
                    <Button variant="contained" onClick={() => pokemonList('prev')} disabled={!pagination.prevUrl}>Prev</Button>
                    <Button variant="contained" onClick={() => pokemonList('next')}>Next</Button>
                </>

            );
        }
    }

    const navButtons = showButtons();

    return (
        <nav className={styles['nav-pokemons']}>
            {navButtons}
            <FilterButton setTypeSelected={setTypeSelected} />
        </nav>
    );
}

export default ActionButtons;