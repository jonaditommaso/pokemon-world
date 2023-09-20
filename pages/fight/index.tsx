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
    startBattle: any
}

const Fight = ( { music, opponentData, startBattle }: FightProps) => {

    const { musicBattle, musicBattlePause, battleMode } = useActions();

    const [showBattle, setShowBattle] = useState(false);
    const [fightTypeSelected, setFightTypeSelected] = useState('');

    const showVideo = startBattle && !showBattle;

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

    if(showVideo) {
        const video = document.getElementById('video') as HTMLVideoElement;
        const pokemonName = document.getElementById('pokemon-name') as HTMLAudioElement;

        video.addEventListener('ended', () => {
            setShowBattle(true);
            if(music.volume) pokemonName.play();
        });
    }

    return (
        <div>
            <div
              className={styles['container-type-room']}
              style={{ position: !showVideo ? 'relative' : 'static'}}
            >
                {!startBattle && <TypeFight typeFight={fightTypeSelected} changeTypeFight={setFightTypeSelected} />}

                <div className={clsx(styles['fight-button'], !fightTypeSelected && styles['fight-button-disabled'])}>
                    {!startBattle && <Button
                        variant="contained"
                        color='error'
                        size='large'
                        onClick={handlePlay}
                        sx={{fontSize: '20px'}}
                    >
                        FIGHT!
                    </Button>}

                    <FightAnimation showVideo={showVideo} />
                </div>
            </div>

            {showBattle && <div className={styles['fighter-container']}>
                <Fighter opponentData={opponentData} />
            </div>}
        </div>
    )
}


const mapStateToProps = (state: any) => {
    return {
        music: state.music,
        startBattle: state.battleMode.mode,
    }
}

export default connect(mapStateToProps, { musicBattle, musicBattlePause, battleMode })(Fight);

export async function getStaticProps() {
    const fighterProps = await getFighterStaticProps();
    return fighterProps; // returning props from getStaticProps function in Fighter, in order to this component can use them
}