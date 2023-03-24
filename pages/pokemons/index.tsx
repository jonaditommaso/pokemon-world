import React, { useState, useEffect } from 'react';

import { Button } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';

import styles from './allPokemons.module.css'
import EachPoke from '../../components/pokemon/EachPoke';
import FilterButton from '../../components/pokemon/FilterPokemonButton';
import { loadPokemons } from '../../helpers/getAndLoadPokemons';
import pokeapi from '../../helpers/pokeapi';
import PokemonService from '../../helpers/PokemonHelper';
import { useGetRanked } from '../../hooks/useGetRanked';
import { PokemonData } from '../../interfaces/PokemonData';
import pokeball from '../../public/assets/img/pokeball.png'
import Alert from '../../utils/Alert';



interface AllPokemonsView {
    thereIsUser: string,
    pokemons: any,
    initialNextUrl: string,
    ranking: any
}

const ShowAllPokemons = ({
    thereIsUser,
    pokemons,
    initialNextUrl,
    ranking,
}: AllPokemonsView) => {

    const [loading, setLoading] = useState(true);
    const [pokemonData, setPokemonData] = useState <PokemonData[] | undefined > (pokemons);
    const [nextUrl, setNextUrl] = useState(initialNextUrl);
    const [prevUrl, setPrevUrl] = useState('');
    const [optionSelected, setOptionSelected] = useState(false);
    const [showAllPokemons, setShowAllPokemons] = useState(false);
    const router = useRouter()
    useGetRanked(ranking);

    useEffect(() => {
        if(showAllPokemons && !optionSelected) {
            setLoading(false);
            setPokemonData(pokemons)
        }
    }, [showAllPokemons, pokemonData, optionSelected]);


    useEffect(() => {
        const getTypePokemon = async () => {
            setLoading(true)
            const {data} = await pokeapi.get(`/type/${optionSelected}/`);
            const result = await loadPokemons(data.pokemon);
            setPokemonData(result)
            setLoading(false);
        }

        setShowAllPokemons(false);

        if(optionSelected) {
            getTypePokemon();
        }
    }, [optionSelected]);


    const nextPokemonList = async () => {
        setLoading(true);
        const pokemonService = new PokemonService();
        const {data} = await pokemonService.getUrlForEachPokemon(nextUrl);
        const newPokemons = await loadPokemons(data.results);
        setPokemonData(newPokemons);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        setLoading(false);
    }

    const prevPokemonList = async () => {
        if(!prevUrl) return;
        setLoading(true);
        const pokemonService = new PokemonService();
        const {data} = await pokemonService.getUrlForEachPokemon(prevUrl);
        const newPokemons = await loadPokemons(data.results);
        setPokemonData(newPokemons);
        setPrevUrl(data.previous);
        setLoading(false);
    }

    const handleClickGoBack = () => {
        setOptionSelected(false);
        setShowAllPokemons(true);
    }

    const showButtons = () => {
        if(optionSelected) {
            return (
                <Button variant="contained" color='error' onClick={() => handleClickGoBack()}>Go Back</Button>
            )
        }
        else {
            return (
                <>
                    <Button variant="contained" color='error' onClick={()=> router.push('/')}>Go Home</Button>
                    <Button variant="contained" onClick={prevPokemonList} disabled={!prevUrl}>Prev</Button>
                    <Button variant="contained" onClick={nextPokemonList}>Next</Button>
                </>

            );
        }
    }


    return (

        <>
            {!thereIsUser
                ? <Alert text='asas' />
                : (
                    <div>
                        { loading
                            ? <div className={styles.loading} style={{display: 'flex', justifyContent: 'center'}}>
                                <Image src={pokeball} width={70} alt="loading"/>
                                </div>
                            : (
                                <div className={styles.showAllPokemons}>
                                    <div className={styles.showAllPokemons__buttons}>
                                        {showButtons()}
                                        <FilterButton setOptionSelected={setOptionSelected} />
                                    </div>
                                    <div>
                                        {pokemonData?.map((pokemon, i) => (
                                            <EachPoke pokemon={pokemon} key={i} />
                                        ))}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </>
    );
}

const mapStateToProps = (state: any) => {
    return {
        thereIsUser: state.login.user,
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