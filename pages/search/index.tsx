import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// import history from '../../history';
// import '../../styles/searchPokemon.css';
// import pokeapi from '../../utils/pokeapi';
import { Button } from 'react-bootstrap';
// import Alert from '../log/Alert';
// import { pauseMusic, playMusic, chooseYou } from '../../redux/actions/index';
// import PokemonService from '../../services/PokemonService';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from "sweetalert2-react-content";
import pokeapi from '../../helpers/pokeapi';
import CardPokemonFile from '../../components/pokemon/CardPokemonFile';
import styles from './search.module.css'
import { useRouter } from 'next/router';
import Image from 'next/image';
// import CardPokemonFile from '../../utils/CardPokemonFile';
import initialPikachu from '../../public/assets/img/pikachusleeping.png'
import PokemonService from '../../helpers/PokemonHelper';
import { PokemonData } from '../../interfaces/PokemonData';
import { chooseYou, pauseMusic, playMusic } from '../../redux/action-creators';
import { useActions } from '../../hooks/useActions';

const MySwal = withReactContent(Swal);

const SearchPokemon = ({ thereIsUser, ranking }: any) => {

    const { chooseYou, pauseMusic, playMusic } = useActions();

    const [pokemonSearched, setPokemonSearched] = useState('');
    const [pokemonData, setPokemonData] = useState <PokemonData | undefined> ();
    const [pokemonType, setPokemonType] = useState <string> ('');
    const [pokemonMove, setPokemonMove] = useState('');
    const [showError, setShowError] = useState(false);
    const [notPrevious, setNotPrevious] = useState <boolean> (false);

    const [chainUrlEvolutions, setChainUrlEvolutions] = useState('');
    const [firstEvolution, setFirstEvolution] = useState('');
    const [secondEvolution, setSecondEvolution] = useState('');
    const [thirdEvolution, setThirdEvolution] = useState('');

    const [hasEvolution, setHasEvolution] = useState('');
    const [evolutionData, setEvolutionData] = useState <PokemonData | undefined> ();

    const router = useRouter()

    const initial_state_to_review = ranking.find((poke: any) => poke.pokemon === pokemonData?.name);
    const review = initial_state_to_review ? initial_state_to_review.ranking : 0;

    useEffect(() => {
        const getPokemon = async () => {
            setChainUrlEvolutions('')
            pokeapi.get(`/pokemon/${pokemonSearched}`).then(response => {
                setShowError(false);
                const {data} = response;
                setPokemonData(data);
                if (data) {
                    setPokemonType(data.types[0].type.name);
                    setPokemonMove(data.moves[4].move.name);
                }
            }).catch(err => {
                console.log("err", err);
                setShowError(true);
                return;
            });
        }
            const getPokemonTimeOut = setTimeout(() => {
                if (pokemonSearched) {
                    getPokemon();
                }
            }, 500);

            return () => {
                clearTimeout(getPokemonTimeOut);
            }
    }, [pokemonSearched]);


    useEffect(() => {
        setNotPrevious(false);
    }, [pokemonSearched]);


    useEffect(() => {
        const getEvolutionChainUrl = async () => {
            if(!pokemonData) return;
            const {data} = await axios.get(pokemonData?.species.url);
            setChainUrlEvolutions(data?.evolution_chain.url)
        }
        if(pokemonData) {
            getEvolutionChainUrl();
        }
    }, [pokemonData, pokemonSearched]);


    useEffect(() => {
        const getChain = async () => {
            const {data} = await axios.get(chainUrlEvolutions);
            setFirstEvolution(data?.chain.species.name);
            setSecondEvolution(data?.chain.evolves_to[0]?.species?.name);
            setThirdEvolution(data?.chain.evolves_to[0]?.evolves_to[0]?.species?.name);
        }
        if(chainUrlEvolutions) {
            getChain();
        }
    }, [pokemonData, chainUrlEvolutions]);

    const POKEMON = pokemonData && pokemonData?.name.charAt(0).toUpperCase() + pokemonData?.name?.slice(1);
    const DESCRIPTION = `${POKEMON} is a ${pokemonType} type pokemon and his favorite move is ${pokemonMove}`;

    const CAN_EVOLVE = `See ${POKEMON}'s evolution`;
    const CANT_EVOLVE = `${POKEMON} has no evolution`;

    useEffect(() => {
        const getEvolution = () => {
            if(pokemonData?.name === firstEvolution) {
                if(secondEvolution) {
                    setHasEvolution(CAN_EVOLVE);
                }
                else {
                    setHasEvolution(CANT_EVOLVE);
                };
            }
            if(pokemonData?.name === secondEvolution) {
                if(thirdEvolution) {
                    setHasEvolution(CAN_EVOLVE);
                }
                else setHasEvolution(CANT_EVOLVE);
            }
            if(pokemonData?.name === thirdEvolution) {
                setHasEvolution(CANT_EVOLVE);
            }
        }
        getEvolution();

        const getEvolutionData = async () => {
            if(pokemonData?.name === firstEvolution) {
                const {data} = await pokeapi.get(`/pokemon/${secondEvolution}`);
                 setEvolutionData(data);

             }
             if(pokemonData?.name === secondEvolution) {
                 const {data} = await pokeapi.get(`/pokemon/${thirdEvolution}`);
                 setEvolutionData(data);
             }
        }
        getEvolutionData()

    }, [pokemonData, CANT_EVOLVE, CAN_EVOLVE, firstEvolution, secondEvolution, thirdEvolution, pokemonSearched]);


    const handleClick = (text: string) => {
        const audio = document.getElementById('music');

        const listenDescription = () => {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            if(music) {
                utterance.onend = () => {
                    audio.play();
                    playMusic();
                }
            }
            audio.pause();
            pauseMusic();

            speechSynthesis.speak(utterance);
        }
        listenDescription();
    }

    const iChooseYouButton = () => {
        chooseYou(pokemonData);
        router.push('/fight');
    }

    const prevPokemon = async () => {
        if(!pokemonData) return;
        if(pokemonData.id === 1) {
            setNotPrevious(true);
        }
        else {
            const pokemonService = new PokemonService();
            const {data} = await pokemonService.getUrlForEachPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemonData.id - 1}`);
            setPokemonSearched(data.name);
            setPokemonData(data);
        }
    }

    const nextPokemon = async () => {
        if(!pokemonData) return;
        const pokemonService = new PokemonService();
        const {data} = await pokemonService.getUrlForEachPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemonData.id + 1}`);
        setPokemonSearched(data.name);
        setPokemonData(data);

    }

    const showEvolutionInfo = () => {
        if(!evolutionData) return;
        MySwal.fire({
            html: (
                <CardPokemonFile
                    pokemonType={evolutionData?.types && evolutionData?.types[0]?.type?.name || ''}
                    pokemonName={evolutionData?.name?.charAt(0).toUpperCase() + evolutionData?.name?.slice(1)}
                    pokemonId={evolutionData.id}
                    pokemonImage={evolutionData.sprites?.other['official-artwork']?.front_default}
                />
            ),
            showCancelButton: false,
            showConfirmButton: false,
            backdrop: false,
            showCloseButton: true
        });
    }

    const viewEvolution = () => {
        if(evolutionData) {
            showEvolutionInfo();
        }
    }

    const renderPokemon = (): any => {
        if (pokemonData) {
            return (
                <>
                    <div className={styles.topButtons}>
                        <Button
                            style={{width: '4rem', marginBottom: '2%', marginRight: '0.5%'}}
                            variant='info'
                            onClick={prevPokemon}
                        >
                            Prev
                        </Button>
                        <Button
                            style={{width: '10rem', marginBottom: '2%'}}
                            onClick={iChooseYouButton}
                        >
                            I choose you!
                        </Button>
                        <Button
                            style={{width: '4rem', marginBottom: '2%', marginLeft: '0.5%'}}
                            variant='info'
                            onClick={nextPokemon}
                        >
                            Next
                        </Button>
                    </div>

                    <CardPokemonFile
                        review={review}
                        hasEvolution={hasEvolution}
                        pokemonName={POKEMON ?? ''}
                        pokemonDescription={DESCRIPTION}
                        pokemonType={pokemonType}
                        pokemonId={pokemonData.id}
                        pokemonImage={pokemonData.sprites?.other['official-artwork']?.front_default}
                        listenDescription={handleClick}
                        viewEvolution={viewEvolution}
                        evolve={CANT_EVOLVE}
                    />
                </>
            );
        }
    }


    return (
        <>
            {/* {!thereIsUser
            ? <Alert />
            : ( */}
                <div className={styles.searchPokemon}>
                    <div className={styles.searchPokemon__button}>
                        <Button
                            variant="info"
                            onClick={()=>router.push('/')}
                        >
                            Return to home
                        </Button>
                    </div>

                    <div className={styles.input}>
                        <div className="input-group mb-3">
                            <input
                                style={{display: 'flex'}}
                                onChange={(e) => setPokemonSearched(e.target.value.toLowerCase())}
                                type="text"
                                className="form-control"
                                placeholder="Enter Pokemon name or Pokemon number"
                                aria-label="Recipient's username"
                                aria-describedby="button-addon2"
                            />
                        </div>
                    </div>
                    {showError && <p className={styles.noMatch}>There are no Pokemon that match your search</p>}
                    {notPrevious && <p className={styles.noMatch}>Bulbasaur is the first Pokemon. There are no previous Pokemons</p>}

                    {!pokemonData
                    ? <Image
                        src={initialPikachu}
                        alt="pikachu"
                        style={{width: '350px', marginTop: '5%'}}
                    />
                    : renderPokemon()}
                </div>
            {/* )} */}

        </>
    );
}

const mapStateToProps = (state: any) => {
    return {
        thereIsUser: state.login.user,
        music: state.music.volume,
        fight: state.fight.pokemon,
        ranking: state.ranking.pokemonRanked,
    }
}

export default connect(mapStateToProps, { chooseYou, pauseMusic, playMusic })(SearchPokemon);