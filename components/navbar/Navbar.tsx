import React, { useState, useEffect, useRef } from 'react';

import { useRouter } from 'next/router';
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
    const audio = typeof window !== 'undefined' && document.getElementById('music') as HTMLAudioElement;
    const audioRef = useRef<HTMLAudioElement>(null);
    const router = useRouter();


    useEffect(() => {
        if (!audio) return;

        const handleAudioEnded = () => {
            audio.play();
            playMusic();
        };

      const handleRouteChange = (url: string) => {
        if (url === '/search' && audioRef.current && music) {
            audio.pause();
            pauseMusic();
            audioRef.current.play();
        }
      };

      router.events.on('routeChangeComplete', handleRouteChange);

      const audioElement = audioRef.current;
      if (audioElement) {
        audioElement.addEventListener('ended', handleAudioEnded);
      }

      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }, [router.events]);


    useEffect(() => {
        if (!audio) return;
        if(thereIsUser && !showSideDropDown) {
            setTimeout(() => {
                setShowSideDropDown(true);
            }, 2500);
        }


        if(music.other === true) {
            audio.pause();
        }

        if((music.other === false) && music.volume) {
            audio.play();
        }

    }, [showSideDropDown, music, thereIsUser, audio]);

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
            <audio
                src={'audio/whos-that-pokemon.mp3'}
                preload="auto"
                id={'whos-that-pokemon'}
                ref={audioRef}
                controls
                autoPlay
                style={{display: 'none'}}
            ></audio>

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