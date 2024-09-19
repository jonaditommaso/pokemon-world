import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Card, CardContent, CardMedia, Tooltip, Typography} from '@mui/material';
import clsx from 'clsx';
import { connect } from 'react-redux';

import styles from './card.module.css';
import { pokemonOptions } from './pokemonOptions';
import WhoIsThatPokemon from './WhoIsThatPokemon';
import { useActions } from '../../../hooks/useActions';
import { useGetRanked } from '../../../hooks/useGetRanked';
import { RootState } from '../../../redux';
import { pauseMusic, playMusic } from '../../../redux/action-creators/index';
import { capitalize } from '../../../utils/capitalize';
import { colorsByType } from '../../../utils/colorsByType';
import { formatNumber } from '../../../utils/formatNumber';
import { generateGradient } from '../../../utils/generateGradient';
import { iconsByType } from '../../../utils/iconsByType';
import Review from '../../../utils/Review';
import RotateContent from './RotateContent';
import MaterialTooltip from './MaterialTooltip';

type IconName = 'listen-pokemon' | 'listen-description' | 'see-evolution';

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

    const [audioExists, setAudioExists] = useState<boolean | null>(null);
    const [flippedIcons, setFlippedIcons] = useState<string[]>([]);
    const [openTypes, setOpenTypes] = useState<string[]>([]);

    useEffect(() => {
        if (pokemonData?.name) {
          const audio = new Audio();
          audio.src = `audio/voices/${pokemonData.name}.mp3`;
          audio.oncanplaythrough = () => setAudioExists(true);
          audio.onerror = () => setAudioExists(false);
        }
    }, [pokemonData]);

    const handleClick = (typeName: string) => {
      setOpenTypes(prevOpenTypes =>
        prevOpenTypes.includes(typeName)
          ? prevOpenTypes.filter(openType => openType !== typeName)
          : [...prevOpenTypes, typeName]
      );
    };

    const handleIconClick = (option: string) => {
        const isFlipped = flippedIcons.includes(option);

        setFlippedIcons((prevFlipped) =>
            isFlipped
                ? prevFlipped.filter((icon) => icon !== option)
                : [...prevFlipped, option]
        );
    };

    const initial_state_to_review = ranking.find((poke: any) => poke.pokemon === pokemonData?.name);
    const review = initial_state_to_review ? initial_state_to_review.ranking : 0;

    const pokemonImage = pokemonData?.sprites?.other['official-artwork']?.front_default;
    const pokemonType = pokemonData?.types[0]?.type?.name || '';
    const pokemonMove = pokemonData?.moves[4]?.move?.name || '';

    const POKEMON = capitalize(pokemonData?.name || '');
    const DESCRIPTION = `${POKEMON} is a ${pokemonType} type pokemon and his favorite move is ${pokemonMove}`;
    const CAN_EVOLVE = `See ${POKEMON}'s evolution`;
    const CANT_EVOLVE = `${POKEMON} has no evolution`;

    const pokemonColor = colorsByType[pokemonData?.types[0].type.name as keyof typeof colorsByType]

    const listenDescription = useCallback(() => {
        const audio = document.getElementById('music') as HTMLAudioElement;

        const listen = () => {
            const utterance = new SpeechSynthesisUtterance(DESCRIPTION);
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
    }, [DESCRIPTION, music, pauseMusic, playMusic]);

    const listenPokemon = useCallback(() => {
        const audio = document.getElementById('music') as HTMLAudioElement;
        const pokemonName = document.getElementById('pokemon-sound') as HTMLAudioElement;

        if(music) {
            audio.pause();
            pauseMusic();
        }
        pokemonName.play()

        pokemonName.addEventListener('ended', () => {
            if(music.volume) {
                audio.play();
                playMusic()
            }
        });
    }, [music, pauseMusic, playMusic]);

    const iconActions: Record<IconName, {
        functionButton: () => void;
        disableButton: boolean;
    }> = useMemo(() => ({
        'weight': {functionButton: () => handleIconClick('weight')},
        'height': {functionButton: () => handleIconClick('height')},
        'listen-pokemon': {
            functionButton: () => listenPokemon(),
            disableButton: !audioExists
        },
        'listen-description': {
            functionButton: () => listenDescription(),
            disableButton: false,
        },
        'see-evolution': {
            functionButton: () => showEvolution!(),
            disableButton: !hasEvolution
        },
    }), [listenDescription, showEvolution, listenPokemon, audioExists, hasEvolution]);

    return (
        <div
            className={styles.pokemonFile}
            style={{ margin: modal ? 0 : '' }}
        >
            {!modal && pokemonData && <div>
                {pokemonData?.types.map(({type}: { type: { name: string; url: string } }) => (
                    <div key={type.name} className={styles['pokemon-type-container']}>
                        <MaterialTooltip placement='left' title='Check type'>
                            <span
                                className={styles['pokemon-type']}
                                onClick={() => handleClick(type.name)}
                            >
                                {iconsByType[type.name as keyof typeof iconsByType]}
                            </span>
                        </MaterialTooltip>

                        <div className={clsx(styles['sliding-div'], !openTypes.includes(type.name) ? styles.pressed : '')}>
                            Type: <span style={{color: colorsByType[type.name as keyof typeof colorsByType]}}>{type.name}</span>
                        </div>
                    </div>
                ))}
            </div>}


            <Card className={styles.searchPokemon__card} style={{ boxShadow: modal ? 'none' : '' }}>
                <div className={styles.searchPokemon__pokemon}>

                    {!pokemonData
                        ? <WhoIsThatPokemon />
                        : <div>
                            <div
                                className={styles.searchPokemon__background}
                                style={{ backgroundImage: modal ? '' : generateGradient(pokemonColor, 'bottom') }}
                            >
                                {Number.isInteger(review) && review >= 0 ? (
                                    <div className={''} style={{padding: '10px'}}>
                                        <div className={styles['review-container']}>
                                            <Tooltip title='Read only here' placement='bottom'>
                                                <div>
                                                    <Review pokemonName={pokemonData.name} readOnly />
                                                </div>
                                            </Tooltip>
                                        </div>
                                    </div>
                                ) : null}

                                <CardMedia
                                    className={styles.searchPokemon__img}
                                    image={pokemonImage}
                                    title={POKEMON}
                                    sx={{ height: '18rem', transition: 'opacity 1.3s ease-in-out' }}
                                />

                                <CardContent sx={{ p: '0 !important' }}>
                                    <Typography className={styles.pokemonFile__title} variant='h5'>
                                        {POKEMON} #{formatNumber(pokemonData.id)}
                                    </Typography>
                                </CardContent>
                            </div>

                            {!modal &&
                                <CardContent>
                                    <hr />
                                    <Typography align='center' className={styles['pokemon-file-description']}>
                                        {DESCRIPTION}
                                    </Typography>
                                </CardContent>
                            }
                        </div>
                    }
                </div>
            </Card>

            {!modal && pokemonData && <div>
                {pokemonOptions.map(option => (
                        <Tooltip
                            key={option.button}
                            title={option.button === 'see-evolution' ? (hasEvolution ? CAN_EVOLVE : CANT_EVOLVE) : option.title}
                            placement='right'
                        >
                            <span
                                className={clsx(
                                    styles['pokemon-option'],
                                    iconActions[option.button as IconName]?.disableButton && styles['disabled-pokemon-option'],
                                )}
                                style={{
                                    backgroundColor: option.backgroundColor,
                                    cursor: iconActions[option.button as IconName]?.disableButton ? 'default' : 'pointer',
                                    transition: 'transform 0.6s ease',
                                    transform: flippedIcons.includes(option.button)
                                        ? 'rotateY(180deg)'
                                        : 'rotateY(0deg)',
                                }}
                                onClick={iconActions[option.button as IconName]?.functionButton}
                            >
                                {option.button === 'weight' || option.button === 'height'
                                    ? <RotateContent
                                        isFlipped={flippedIcons.includes(option.button)}
                                        buttonType={option.button}
                                        icon={option.icon}
                                        value={pokemonData[option.button]}
                                        />
                                    : option.icon
                                }
                            </span>
                        </Tooltip>
                    )
                )}
            </div>}
            <audio
                src={`audio/voices/${pokemonData?.name}.mp3`}
                preload="auto"
                id="pokemon-sound"
                controls
                style={{display: 'none'}}
            ></audio>
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