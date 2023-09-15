import React, { useState, useEffect } from 'react';

import Image from 'next/image';
import { connect } from 'react-redux';

import ActionButtons from './ActionButtons';
import styles from './allPokemons.module.css'
import EachPoke from '../../components/pokemon/EachPoke';
import { loadPokemons } from '../../helpers/getAndLoadPokemons';
import pokeapi from '../../helpers/pokeapi';
import PokemonService from '../../helpers/PokemonHelper';
import { useGetRanked } from '../../hooks/useGetRanked';
import { PokemonData } from '../../interfaces/PokemonData';
import pokeball from '../../public/assets/img/pokeball.png'

interface AllPokemonsView {
    pokemons: any,
    initialNextUrl: string,
    ranking: any
}

const ShowAllPokemons = ({
    pokemons,
    initialNextUrl,
    ranking,
}: AllPokemonsView) => {

    const INITIAL_PAGINATION = {
        nextUrl: initialNextUrl,
        prevUrl: '',
    }

    const [loading, setLoading] = useState(false);
    const [pokemonData, setPokemonData] = useState <PokemonData[] | undefined> (pokemons);
    const [typeSelected, setTypeSelected] = useState <boolean | string> (false);
    const [pagination, setPagination] = useState(INITIAL_PAGINATION);

    useGetRanked(ranking);
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

    return (
        loading ? (
            <div className={styles.loading}>
                <Image src={pokeball} width={70} alt="loading" />
            </div>
        ) : (
            <div className={styles.showAllPokemons}>
                <ActionButtons
                    disablePrev={!pagination.prevUrl}
                    pokemonList={pokemonList}
                    resetPokemons={resetPokemons}
                    setTypeSelected={setTypeSelected}
                    typeSelected={typeSelected}
                />
                <div>
                    {pokemonData?.map(pokemon => (
                        <EachPoke pokemon={pokemon} key={pokemon.id} />
                    ))}
                </div>
            </div>
        )
    );
}

const mapStateToProps = (state: any) => {
    return {
        ranking: state.ranking.pokemonRanked
    }
}

export default connect(mapStateToProps, null)(ShowAllPokemons);

export async function getStaticProps() {
    const {data} = await pokeapi.get(`/pokemon/`);
    const pokemons = await loadPokemons(data.results);
    const initialNextUrl = data.next;

    return {
        props: {
            pokemons,
            initialNextUrl
        }
    }
}