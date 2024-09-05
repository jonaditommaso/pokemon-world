import React from 'react';

import { Button, Card, CardContent, CardMedia , Typography} from '@mui/material';
import { connect } from 'react-redux';

import styles from './card.module.css';
import WhoIsThatPokemon from './WhoIsThatPokemon';
import { useActions } from '../../../hooks/useActions';
import { useGetRanked } from '../../../hooks/useGetRanked';
import { RootState } from '../../../redux';
import { pauseMusic, playMusic } from '../../../redux/action-creators/index';
import { capitalize } from '../../../utils/capitalize';
import { colorsByType } from '../../../utils/colorsByType';
import Review from '../../../utils/Review';
import VolumeFill from '../../../utils/svg/VolumeFill';

interface PokemonData {
    hasEvolution?: boolean,
    modal?: boolean,
    music: any,
    pokemonData: any,
    ranking: any,
    showEvolution?(): void,
}

const CardPokemonFile = ({
    hasEvolution,
    modal,
    music,
    pokemonData,
    ranking,
    showEvolution,
}: PokemonData) => {

    const { pauseMusic, playMusic } = useActions();
    useGetRanked(ranking);

    const initial_state_to_review = ranking.find((poke: any) => poke.pokemon === pokemonData?.name);
    const review = initial_state_to_review ? initial_state_to_review.ranking : 0;

    const pokemonImage = pokemonData?.sprites?.other['official-artwork']?.front_default;
    const pokemonType = pokemonData?.types[0]?.type?.name || '';
    const pokemonMove = pokemonData?.moves[4]?.move?.name || '';

    const POKEMON = capitalize(pokemonData?.name || '');
    const DESCRIPTION = `${POKEMON} is a ${pokemonType} type pokemon and his favorite move is ${pokemonMove}`;
    const CAN_EVOLVE = `See ${POKEMON}'s evolution`;
    const CANT_EVOLVE = `${POKEMON} has no evolution`;

    const listenDescription = (text: string) => {
        const audio = document.getElementById('music') as HTMLAudioElement;

        const listen = () => {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            if(music) {
                audio.pause();
                pauseMusic();
                utterance.onend = () => {
                    audio.play();
                    playMusic();
                }
            }
            speechSynthesis.speak(utterance);
        }
        listen();
    }

    return (
        <div className={styles.pokemonFile}>

            <Card className={styles.searchPokemon__card}>
                <div className={styles.searchPokemon__pokemon}>

                    {!pokemonData
                        ? <WhoIsThatPokemon />
                        : <>

                            {Number.isInteger(review) && review >= 0 ? (
                                <div className={''} style={{margin: '10px'}}>
                                    <div className={styles['review-container']}>
                                        <Review pokemonName={pokemonData.name} readOnly />
                                    </div>
                                </div>
                            ) : null}

                            <CardMedia
                                className={styles.searchPokemon__img}
                                image={pokemonImage}
                                title={POKEMON}
                                sx={{ height: '18rem', transition: 'opacity 1.3s ease-in-out' }}
                            />

                            <CardContent>
                                <Typography className={styles.pokemonFile__title} variant='h5'>
                                    {POKEMON} #{pokemonData?.id}
                                </Typography>
                                {!modal &&
                                    <>
                                        <hr />
                                        <Typography align='center' className={styles['pokemon-file-description']}>
                                            {DESCRIPTION}
                                        </Typography>
                                    </>
                                }
                            </CardContent>
                        </>
                    }
                </div>

                {pokemonData &&
                    <>
                        {!modal &&
                            <Button onClick={() => listenDescription(DESCRIPTION)} variant='contained' sx={{width: '100%'}}>
                                Listen
                                <VolumeFill width={16} height={16} style={{margin: '5px'}} />
                            </Button>
                        }

                        <div className={styles.pokemonFile__info}>
                            Type: <strong style={{color: colorsByType[pokemonType as keyof typeof colorsByType]}}>{pokemonType}</strong>
                        </div>

                        {!modal && (
                            <Button
                                onClick={showEvolution}
                                disabled={hasEvolution ? false : true}
                                variant='contained'
                                sx={{width: '100%'}}
                            >
                                {hasEvolution ? CAN_EVOLVE : CANT_EVOLVE}
                            </Button>
                        )}
                    </>
                }
            </Card>
        </div>
    );
}

const mapStateToProps = (state: RootState) => {
    return {
        ranking: state.ranking.pokemonRanked,
        music: state.music.volume,
    }
}

export default connect(mapStateToProps, { pauseMusic, playMusic })(CardPokemonFile);