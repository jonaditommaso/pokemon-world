import React, { useState, useEffect } from 'react';

import clsx from 'clsx'
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";

import ActionButtons from './ActionButtons';
import styles from './search.module.css';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import CardPokemonFile from '../../components/pokemon/CardPokemonFile';
import PokemonSpinner from '../../components/spinner/PokemonSpinner';
import pokeapi from '../../helpers/pokeapi';
import PokemonService from '../../helpers/PokemonHelper';
import { useRedirect } from '../../hooks/useRedirect';
import { PokemonData } from '../../interfaces/PokemonData';
import { RootState, store } from '../../redux';
import { getEvolutions } from '../../utils/getEvolutions';

const MySwal = withReactContent(Swal);

interface Evolutions {
    first: string,
    second: string | undefined,
    third: string | undefined
}

const INITIAL_EVOLUTIONS = {
    first: '',
    second: '',
    third: ''
}

interface SearchPokemonProps {
    thereIsUser: string | boolean
}

const SearchPokemon = ({ thereIsUser }: SearchPokemonProps) => {

    const [pokemonSearched, setPokemonSearched] = useState('');
    const [pokemonData, setPokemonData] = useState <PokemonData | undefined> ();
    const [evolutionData, setEvolutionData] = useState <PokemonData | undefined> ();

    const [evolutions, setEvolutions] = useState <Evolutions> (INITIAL_EVOLUTIONS);
    const [hasEvolution, setHasEvolution] = useState <boolean | undefined> (undefined);
    const [showError, setShowError] = useState(false);

    const router = useRouter();
    const pokemonService = new PokemonService();
    const { first, second, third } = evolutions;

    useRedirect();

    useEffect(() => {
        const getPokemon = async () => {
            setEvolutions(INITIAL_EVOLUTIONS);
            pokeapi.get(`/pokemon/${pokemonSearched}`).then(response => {
                setShowError(false);
                const {data} = response;
                setPokemonData(data);
            })
             .catch(err => {
                console.error("err", err);
                setShowError(true);
                return;
            });
        }

        const getPokemonTimeOut = setTimeout(() => {
            if (pokemonSearched) getPokemon();
        }, 500);

        return () => {
            clearTimeout(getPokemonTimeOut);
        }
    }, [pokemonSearched]);


    useEffect(() => {
        const fetchEvolutions = async () => {
            if(pokemonData) {
                const response = await getEvolutions(pokemonData?.species.url);
                setEvolutions(response);
            }
        }

        fetchEvolutions();
    }, [pokemonData, pokemonSearched]);


    useEffect(() => {

        const getEvolution = () => {
            if (pokemonData?.name === first) {
                setHasEvolution(!!second);
            }
            else if (pokemonData?.name === second) {
                setHasEvolution(!!third);
            }
            else if (pokemonData?.name === third) setHasEvolution(false);
        }
        getEvolution();

        const getEvolutionData = async () => {
            if(pokemonData?.name === first) {
                if(!second) return;
                const {data} = await pokeapi.get(`/pokemon/${second}`);
                setEvolutionData(data);
            }

            if(pokemonData?.name === second) {
                if(!third) return;
                 const {data} = await pokeapi.get(`/pokemon/${third}`);
                 setEvolutionData(data);
            }
        }
        getEvolutionData();

    }, [pokemonData, pokemonSearched, first, second, third]);

    const getAdjacentPokemon = async (adjacentType: 'prev' | 'next') => {
        if(!pokemonData || (pokemonData.id === 1 && adjacentType === 'prev')) return;

        const pokemon = adjacentType === 'prev' ? pokemonData.id - 1 : pokemonData.id + 1
        const {data} = await pokemonService.getUrlForEachPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        setPokemonSearched(data.name);
        setPokemonData(data);
    }

    const showEvolution = () => {
        if(!evolutionData) return;
        MySwal.fire({
            html: (
                <Provider store={store}>
                    <CardPokemonFile
                        pokemonData={evolutionData}
                        modal={true}
                    />
                </Provider>
            ),
            showCancelButton: false,
            showConfirmButton: false,
            backdrop: false,
            showCloseButton: true,
        });
    }

    if(!thereIsUser) return <PokemonSpinner />;

    return (
        <div className={styles['search-pokemon']}>
            <PrimaryButton
                onClick={() => router.push('/')}
                text='Return to home'
            />

            <input
                onChange={(e) => setPokemonSearched(e.target.value.toLowerCase())}
                type="text"
                className={clsx('form-control', styles['input'])}
                placeholder="Enter Pokemon name or Pokemon number"
            />

            {showError && <p className={styles['no-match']}>There are no Pokemon that match your search</p>}

            <ActionButtons
                pokemonData={pokemonData}
                getAdjacentPokemon={getAdjacentPokemon}
            />

            <CardPokemonFile
                hasEvolution={hasEvolution}
                showEvolution={showEvolution}
                pokemonData={pokemonData}
            />

        </div>
    );
}

const mapStateToProps = (state: RootState) => {
    return { thereIsUser: state.login.user }
}

export default connect(mapStateToProps, null)(SearchPokemon);
