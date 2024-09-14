import React, { useState, useEffect, useRef } from 'react';

import { Button } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { connect } from 'react-redux'; // MapDispatchToProps, MapStateToProps

import styles from './navbar.module.css'
import SideDropdown from './SideDropdown';
import { useActions } from '../../hooks/useActions';
import pokemonWorldLogo from '../../public/assets/img/pokemon-world-logo.png'
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
        if (url === '/search' && audioRef.current && music.volume) {
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
    }, [router.events, music.volume, audio, pauseMusic, playMusic]);


    useEffect(() => {
        if (!audio) return;


        if(music.other === true) {
            audio.pause();
        }

        if((music.other === false) && music.volume) {
            audio.play();
        }

    }, [music, thereIsUser, audio]);

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

    return (
        <>
            <div style={{ position: 'absolute', right: '45%' }}>
                <Image
                    alt='pokemon-logo image'
                    src={pokemonWorldLogo}
                    priority
                    width={160}
                />
            </div>
            <div className={styles.navbar}>
                <StateLogin />
                {thereIsUser && !window.location.pathname.includes('/signin') && <SideDropdown />}
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
                ref={audioRef}
                controls
                autoPlay
                style={{display: 'none'}}
            ></audio>

            <Button color='info' variant='outlined' sx={{ m: '5px' }} onClick={handleMusic}>
                {music.volume ? <VolumeFill /> : <VolumeMute />}
            </Button>
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