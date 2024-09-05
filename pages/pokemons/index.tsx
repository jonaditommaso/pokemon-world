import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';

import ActionButtons from './ActionButtons';
import styles from './allPokemons.module.css'
import EachPoke from '../../components/pokemon/EachPoke';
import PokemonSpinner from '../../components/spinner/PokemonSpinner';
import { loadPokemons } from '../../helpers/getAndLoadPokemons';
import pokeapi from '../../helpers/pokeapi';
import PokemonService from '../../helpers/PokemonHelper';
import { useRedirect } from '../../hooks/useRedirect';
import { PokemonData } from '../../interfaces/PokemonData';

interface AllPokemonsView {
    pokemons: any,
    initialNextUrl: string,
    thereIsUser: string | boolean,
}

const ShowAllPokemons = ({
    pokemons,
    initialNextUrl,
    thereIsUser,
}: AllPokemonsView) => {

    useRedirect();

    const INITIAL_PAGINATION = {
        nextUrl: initialNextUrl,
        prevUrl: '',
    }

    const [loading, setLoading] = useState(false);
    const [pokemonData, setPokemonData] = useState <PokemonData[] | undefined> (pokemons);
    const [typeSelected, setTypeSelected] = useState <boolean | string> (false);
    const [pagination, setPagination] = useState(INITIAL_PAGINATION);

    const pokemonService = new PokemonService();

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
        const { data } = await pokemonService.getUrlForEachPokemon(url);
        setPagination({
            nextUrl: data.next,
            prevUrl: data.previous,
        });
        const newPokemons = await loadPokemons(data.results);
        setPokemonData(newPokemons);
        setLoading(false);
    }

    const resetPokemons = () => {
        setPokemonData(pokemons);
        setPagination(INITIAL_PAGINATION);
    }

    if(!thereIsUser) return <PokemonSpinner />;

    return (
        loading ? (
            <PokemonSpinner />
        ) : (
            <div className={styles['container-pokemons']}>
                <ActionButtons
                    disablePrev={!pagination.prevUrl}
                    pokemonList={pokemonList}
                    resetPokemons={resetPokemons}
                    setTypeSelected={setTypeSelected}
                    typeSelected={typeSelected}
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

export async function getServerSideProps() {
    const { data } = await pokeapi.get(`/pokemon/`);
    const pokemons = await loadPokemons(data.results);
    const initialNextUrl = data.next;

    return {
        props: {
            pokemons,
            initialNextUrl
        }
    }
}