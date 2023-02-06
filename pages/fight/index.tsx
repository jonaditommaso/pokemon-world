import React, { useState, useEffect } from 'react';
import Fighter from '../../components/fight/Fighter';
import { connect } from 'react-redux';
import { musicBattle, musicBattlePause } from '../../redux/action-creators';
import Alert from '../../utils/Alert';
import styles from '../../components/fight/fight.module.css'
import { useActions } from '../../hooks/useActions';
import { MusicState } from '../../interfaces/Music';
import { PokemonData } from '../../interfaces/PokemonData';
import { Button } from '@mui/material';
import bgImage from '../../assets/img/battlefield.jpg'

interface FightProps {
    thereIsUser: string,
    music: MusicState,
    fighter: {
        pokemon: PokemonData
    }
}

const Fight = ( {thereIsUser, fighter, music }: FightProps) => {

    const { musicBattle, musicBattlePause } = useActions()

    const [showButton, setShowButton] = useState('showingButton');
    const [showVideo, setShowVideo] = useState('d-none');
    const [showBattle, setShowBattle] = useState('d-none');

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
        setShowButton('d-none');
        setShowVideo('showingVideo');

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
                <div className={preparationWrap} style={{display: 'flex', justifyContent: 'center', marginTop: '10%'}}>
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

                    <video
                    src='video/pokeballgo.mp4'
                    // type="audio/mp4"
                    preload="auto"
                    id="video"
                    className={showVideo}
                    >
                    </video>
                    <audio
                    src='audio/pokemon-battle.mp3'
                    // type="audio/mpeg"
                    preload="auto"
                    id="pokemon-battle"
                    controls
                    style={{display: 'none'}}
                >
                </audio>
                <audio
                    src={`audio/voices/${fighter?.pokemon.name}.mp3`}
                    // type="audio/mpeg"
                    preload="auto"
                    id="pokemon-name"
                    controls
                    style={{display: 'none'}}
                >
                </audio>
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
                    <Fighter />
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

export default connect(mapStateToProps, { musicBattle, musicBattlePause })(Fight);