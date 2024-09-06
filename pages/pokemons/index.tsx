import React, { useState, useEffect, useRef } from 'react';

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

const ShowAllPokemons = ({
    thereIsUser,
}: AllPokemonsView) => {

    useRedirect();

    const [loading, setLoading] = useState(false);
    const [pokemonData, setPokemonData] = useState <PokemonData[] | undefined> (undefined);
    const firstPokemonsRef = useRef<PokemonData[] | null>(null);
    const initialNextUrl = useRef<string>('')

    useEffect(() => {
        const getFirstPokemons = async () => {
            const { data } = await pokeapi.get(`/pokemon/`);
            const pokemons = await loadPokemons(data.results);
            setPokemonData(pokemons)
            if (firstPokemonsRef.current === null) {
                firstPokemonsRef.current = pokemons;
            }
            if (initialNextUrl.current === '') {
                initialNextUrl.current = data.next;
            }
        }
        getFirstPokemons()
    }, [])



    return (
        !thereIsUser || loading || !pokemonData ? (
            <PokemonSpinner />
        ) : (
            <div className={styles['container-pokemons']}>
                    <ActionButtons
                        initialNextUrl={initialNextUrl}
                        setLoading={setLoading}
                        setPokemonData={setPokemonData}
                        firstPokemonsRef={firstPokemonsRef}
                    />
                <div className={styles['container-poke-cards']}>
                    {pokemonData?.map((pokemon, index) => (
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
