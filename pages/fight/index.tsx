import React, { useState, useEffect } from 'react';

import { Button } from '@mui/material';
import clsx from 'clsx'
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

import styles from './fight.module.css'
import TypeFight from './TypeFight';
import bgImage from '../../assets/img/battlefield.jpg'
import Fighter, { getStaticProps as getFighterStaticProps } from '../../components/fight/Fighter';
import { useActions } from '../../hooks/useActions';
import { MusicState } from '../../interfaces/Music';
import { PokemonData } from '../../interfaces/PokemonData';
import { battleMode, musicBattle, musicBattlePause } from '../../redux/action-creators';
import Alert from '../../utils/Alert';

interface FightProps {
    thereIsUser: string,
    music: MusicState,
    fighter: {
        pokemon: PokemonData
    },
    pokemonData: any,
}

const Fight = ( {thereIsUser, fighter, music, pokemonData }: FightProps) => {

    const { musicBattle, musicBattlePause, battleMode } = useActions()

    const [showButton, setShowButton] = useState('showingButton');
    const [showVideo, setShowVideo] = useState('d-none');
    const [showBattle, setShowBattle] = useState('d-none');
    const [fightTypeSelected, setFightTypeSelected] = useState('');

    const [preparationWrap, setPreparationWrap] = useState('');

    useEffect(() => {
        const battleMusic = document.getElementById('pokemon-battle') as HTMLAudioElement;
        if(music.other && !music.volume) {
            battleMusic.pause();
        }
        if(music.other && music.volume) {
            battleMusic.play()
        }
    }, [music]);

    const handlePlay = () => {
        if(!fightTypeSelected) return;
        if(fightTypeSelected === 'squirtle' || fightTypeSelected === 'pikachu') {
            Swal.fire({
                icon: 'warning',
                text: 'Game mode not available yet',
                showConfirmButton: true,
                confirmButtonText: "Ok",
                confirmButtonColor: '#2754d5',
                backdrop: true
            });
            return;
        }
        setShowButton('d-none');
        setShowVideo('showingVideo');
        battleMode(fightTypeSelected);

        if(music.volume) {
            const battle = document.getElementById('pokemon-battle') as HTMLAudioElement;
            musicBattle();
            battle.play();

            battle.addEventListener('ended', () => {
                musicBattlePause();
            })
        }
        const video = document.getElementById('video') as HTMLVideoElement;
        video.play();
    }


    if(showVideo === 'showingVideo') {
        const video = document.getElementById('video') as HTMLVideoElement;
        const pokemonName = document.getElementById('pokemon-name') as HTMLAudioElement;

        video.addEventListener('ended', () => {
            setShowVideo('d-none');
            setShowBattle('fight');
            setPreparationWrap('d-none');
            pokemonName.play();
        });
    }

    return (
        <>
        {!thereIsUser
            ? <Alert text='sd'/>
            : (
            <div>
                <div className={preparationWrap} style={{display: 'flex', justifyContent: 'center', marginTop: '4%', position: showVideo === 'd-none' ? 'relative' : 'static'}}>
                    <div className={showButton}>
                        <TypeFight typeFight={fightTypeSelected} changeTypeFight={setFightTypeSelected} />
                    </div>
                    <div style={{position: 'absolute', top: '50%'}} className={clsx(styles['fight-button'], !fightTypeSelected && styles['fight-button-disabled'])}>
                        <Button
                            variant="contained"
                            color='error'
                            size='large'
                            onClick={() => handlePlay()}
                            className={showButton}
                            sx={{fontSize: '20px'}}
                        >
                            FIGHT!
                        </Button>

                        <div style={{display: !fightTypeSelected ? 'none' : '', position: 'absolute', top: '50%', left: '50%',transform: 'translate(-50%, -50%)'}}>
                            <video
                                src='video/pokeballgo.mp4'
                                preload="auto"
                                id="video"
                                style={{height: '360px', width: '475px', objectFit: 'none'}}
                                className={showVideo}
                            >
                            </video>

                            <audio
                                src='audio/pokemon-battle.mp3'
                                preload="auto"
                                id="pokemon-battle"
                                controls
                                style={{display: 'none'}}
                            >
                            </audio>
                            <audio
                                src={`audio/voices/${fighter?.pokemon.name}.mp3`}
                                preload="auto"
                                id="pokemon-name"
                                controls
                                style={{display: 'none'}}
                            >
                            </audio>
                        </div>
                    </div>
                </div>

                <div
                    className={showBattle}
                    style={{
                        backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.4)), url(${bgImage.src})`,
                        backgroundSize: 'cover',
                        marginLeft: '10%',
                        marginRight: '10%',
                        padding: '4%'
                    }}
                >
                    <Fighter pokemonData={pokemonData} />
                </div>
            </div>
            )}
        </>
    );
}


const mapStateToProps = (state: any) => {
    return {
        fighter: state.fight,
        music: state.music,
        battle: state.battle,
        thereIsUser: state.login.user
    }
}

export default connect(mapStateToProps, { musicBattle, musicBattlePause, battleMode })(Fight);

export async function getStaticProps() {
    const fighterProps = await getFighterStaticProps();
    return fighterProps; // returning props from getStaticProps function in Fighter, in order to this component can use them
}