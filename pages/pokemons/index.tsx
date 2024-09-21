import React, { useState, useEffect, useRef, useDeferredValue } from 'react';

import clsx from 'clsx';
import { connect } from 'react-redux';

import ActionButtons from './ActionButtons';
import styles from './allPokemons.module.css'
import EachPoke from '../../components/pokemon/EachPoke';
import PokemonSpinner from '../../components/spinner/PokemonSpinner';
import { loadPokemons } from '../../helpers/getAndLoadPokemons';
import pokeapi from '../../helpers/pokeapi';
import { useRedirect } from '../../hooks/useRedirect';
import { PokemonData } from '../../interfaces/PokemonData';

interface AllPokemonsView {
    thereIsUser: string | boolean,
    results: any,
}

type Pagination = {
    nextUrl: string | null
    prevUrl: string | null
};

const ShowAllPokemons = ({
    thereIsUser,
}: AllPokemonsView) => {

    useRedirect();

    const [loading, setLoading] = useState(false);
    const [pokemonData, setPokemonData] = useState <PokemonData[] | undefined> (undefined);
    const firstPokemonsRef = useRef<PokemonData[] | null>(null);
    const [pagination, setPagination] = useState<Pagination>({nextUrl: null, prevUrl: null});
    const initialNextUrl = useRef<string>('')

    const pokemons = useDeferredValue(pokemonData);

    useEffect(() => {
        const getFirstPokemons = async () => {
            const { data } = await pokeapi.get(`/pokemon/`);
            const pokemons = await loadPokemons(data.results);
            setPokemonData(pokemons)
            if (firstPokemonsRef.current === null) {
                firstPokemonsRef.current = pokemons;
            }
            setPagination(prevPagination => ({
                ...prevPagination,
                nextUrl: data.next
            }))
            if (initialNextUrl.current === '') {
                initialNextUrl.current = data.next;
            }
        }
        getFirstPokemons();
    }, [])

    return (
        !thereIsUser || !pokemonData ? (
            <PokemonSpinner />
        ) : (
            <div className={styles['container-pokemons']}>
                <ActionButtons
                    initialNextUrl={initialNextUrl.current}
                    setLoading={setLoading}
                    setPokemonData={setPokemonData}
                    firstPokemons={firstPokemonsRef.current}
                    pagination={pagination}
                    setPagination={setPagination}
                />
                {loading && <div className={styles['container-spinner']}><PokemonSpinner /></div>}
                <div className={clsx(styles['container-poke-cards'], loading && styles['container-poke-cards-loading'])}>
                    {pokemons?.map((pokemon, index) => (
                        <EachPoke pokemon={pokemon} key={pokemon.id} index={index} />
                    ))}
                </div>
            </div>
        )
    );
}

const mapStateToProps = (state: any) => {
    return {
        thereIsUser: state.login.user,
    }
}

export default connect(mapStateToProps, null)(ShowAllPokemons);
