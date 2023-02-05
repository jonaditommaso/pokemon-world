import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import pokeapi from '../../helpers/pokeapi';
import PokemonService from '../../helpers/PokemonHelper';
import { PokemonData } from '../../interfaces/PokemonData';
import { useRouter } from 'next/router';
import EachPoke from '../../components/pokemon/EachPoke';
import styles from './allPokemons.module.css'
import Image from 'next/image';
import pokeball from '../../public/assets/img/pokeball.png'
import FilterButton from '../../components/pokemon/FilterPokemonButton';
import Alert from '../../utils/Alert';
import { Button } from '@mui/material';
interface AllPokemonsView {
    thereIsUser: string,
    ranking: any
}

const ShowAllPokemons = ({
    thereIsUser,
    ranking
}: AllPokemonsView) => {

    const [loading, setLoading] = useState(true);
    const [pokemonData, setPokemonData] = useState <PokemonData[] | undefined > ();
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');
    const [optionSelected, setOptionSelected] = useState(false);
    const [showAllPokemons, setShowAllPokemons] = useState(false);
    const router = useRouter()

    useEffect(() => {
        const getAllPokemons = async () => {
            const {data} = await pokeapi.get(`/pokemon/`);
            await loadPokemons(data.results);

            setNextUrl(data.next);
            setLoading(false);
        }
        getAllPokemons()
    }, [showAllPokemons]);


    useEffect(() => {
        const getTypePokemon = async () => {
            setLoading(true)
            const {data} = await pokeapi.get(`/type/${optionSelected}/`);
            await loadPokemons(data.pokemon);
            setLoading(false);
        }

        setShowAllPokemons(false);

        if(optionSelected) {
            getTypePokemon();
        }
    }, [optionSelected]);


    const loadPokemons = async (pokemonList: any) => {
        let _pokemonData = await Promise.all(pokemonList.map(async (pokemon: any) => {
        const url = pokemon.url || pokemon.pokemon.url;
        let pokemonRecord = await getPokemon(url);
        return pokemonRecord;
        }));
        setPokemonData(_pokemonData);
    }

    const getPokemon = async (url: string) => {
        const pokemonService = new PokemonService();
        const {data} = await pokemonService.getUrlForEachPokemon(url);
        return data;
    }

    const nextPokemonList = async () => {
        setLoading(true);
        const pokemonService = new PokemonService();
        const {data} = await pokemonService.getUrlForEachPokemon(nextUrl);
        await loadPokemons(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        setLoading(false);
    }

    const prevPokemonList = async () => {
        if(!prevUrl) return;
        setLoading(true);
        const pokemonService = new PokemonService();
        const {data} = await pokemonService.getUrlForEachPokemon(prevUrl);
        await loadPokemons(data.results);
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
        ranking: state.ranking
    }
}

export default connect(mapStateToProps, null)(ShowAllPokemons);