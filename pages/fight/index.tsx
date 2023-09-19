import React, { useState, useEffect } from 'react';

import { Button } from '@mui/material';
import clsx from 'clsx'
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

import styles from './fight.module.css';
import FightAnimation from './FightAnimation';
import TypeFight from './TypeFight';
import Fighter, { getStaticProps as getFighterStaticProps } from '../../components/fight/Fighter';
import { useActions } from '../../hooks/useActions';
import { MusicState } from '../../interfaces/Music';
import { battleMode, musicBattle, musicBattlePause } from '../../redux/action-creators';

interface FightProps {
    music: MusicState,
    opponentData: any,
}

const Fight = ( { music, opponentData }: FightProps) => {

    const { musicBattle, musicBattlePause, battleMode } = useActions();

    const [showButton, setShowButton] = useState('showingButton');
    const [showVideo, setShowVideo] = useState('d-none');
    const [showBattle, setShowBattle] = useState('d-none');
    const [fightTypeSelected, setFightTypeSelected] = useState('');
    const [preparationWrap, setPreparationWrap] = useState('');

    useEffect(() => {
        const battleMusic = document.getElementById('pokemon-battle') as HTMLAudioElement;
        if(music.other) {
            music.volume ? battleMusic.play() : battleMusic.pause();
        }
    }, [music]);

    const handlePlay = () => {
        if(!fightTypeSelected) return;
        if(fightTypeSelected === '3battle' || fightTypeSelected === 'survivor') {
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
        <div>
            <div
              className={clsx(preparationWrap, styles['container-type-room'])}
              style={{ position: showVideo === 'd-none' ? 'relative' : 'static'}}
            >
                <div className={showButton}>
                    <TypeFight typeFight={fightTypeSelected} changeTypeFight={setFightTypeSelected} />
                </div>
                <div className={clsx(styles['fight-button'], !fightTypeSelected && styles['fight-button-disabled'])}>
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

                    <FightAnimation
                        fightTypeSelected={fightTypeSelected}
                        showVideo={showVideo}
                    />
                </div>
            </div>

            <div className={clsx(showBattle, styles['fighter-container'])}>
                <Fighter opponentData={opponentData} />
            </div>
        </div>
    )
}


const mapStateToProps = (state: any) => {
    return {
        music: state.music,
        battle: state.battle,
    }
}

export default connect(mapStateToProps, { musicBattle, musicBattlePause, battleMode })(Fight);

export async function getStaticProps() {
    const fighterProps = await getFighterStaticProps();
    return fighterProps; // returning props from getStaticProps function in Fighter, in order to this component can use them
}