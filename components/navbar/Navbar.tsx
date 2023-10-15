import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux'; // MapDispatchToProps, MapStateToProps

import styles from './navbar.module.css'
import SideDropdown from './SideDropdown';
import { useActions } from '../../hooks/useActions';
import { playMusic, pauseMusic } from '../../redux/action-creators';
import VolumeFill from '../../utils/svg/VolumeFill';
import VolumeMute from '../../utils/svg/VolumeMute';
import StateLogin from '../log/StateLogin';

interface MusicConfig {
    other: boolean,
    paused: boolean,
    volume: boolean,
}

interface NavbarProps {
    thereIsUser: string,
    music: MusicConfig,
}

const Navbar = ({thereIsUser, music = {volume: false, other: false, paused: false}}: NavbarProps) => {

    const [showSideDropDown, setShowSideDropDown] = useState(false);

    const { playMusic, pauseMusic } = useActions();


    useEffect(() => {
        if(thereIsUser && !showSideDropDown) {
            setTimeout(() => {
                setShowSideDropDown(true);
            }, 2500);
        }

        const audio = document.getElementById('music') as HTMLAudioElement;

        if(music.other === true) {
            audio.pause();
        }

        if((music.other === false) && music.volume) {
            audio.play();
        }

    }, [showSideDropDown, music, thereIsUser]);

    const showMenu = () => {
        return (
            thereIsUser && showSideDropDown && <SideDropdown />
        )
    }

    const handleMusic = () => {
        const audio = document.getElementById('music') as HTMLAudioElement;
        if(!music.volume && music.other) {
            playMusic();
        }

        if(audio.paused && !music.other) {
            audio.play();
            playMusic();
        }

        if(music.volume && music.other) {
            pauseMusic();
        }

        if(music.volume && !music.other) {
            pauseMusic();
            audio.pause();
        }

        if(!music.volume){
            audio.pause();
        }
    }

    const showVolumeIcon = () => {
        if(music.volume) {
            return <VolumeFill />
        }
        else return <VolumeMute />
    }

    return (
        <>
            <div className={styles.navbar}>
                <StateLogin />
                {showMenu()}
            </div>
            <audio
                src='audio/pokemusic.mp3'
                // type="audio/mpeg"
                preload="auto"
                id="music"
                controls
                autoPlay
                style={{display: 'none'}}
            >
            </audio>
                    {/* Your browser does not support the audio tag.  */}

             <span className={styles.volume} onClick={() => handleMusic ()}>
                {showVolumeIcon()}
            </span>
        </>
    );
}

const mapStateToProps = (state: any) => {
    return {
        thereIsUser: state.login.user,
        music: state.music,
    }
}


export default connect(mapStateToProps, {playMusic, pauseMusic})(Navbar);