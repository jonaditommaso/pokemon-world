import { useEffect, useRef, useState } from "react";

import { Button, Typography } from "@mui/material";
import Image from "next/image";
import { connect } from "react-redux";

import styles from './card.module.css';
import { useActions } from "../../../hooks/useActions";
import pikachuShadow from '../../../public/assets/img/pikachu-shadow.png'
import pikachu from '../../../public/assets/img/pikachu0.png'
import { RootState } from "../../../redux";
import { pauseMusic, playMusic } from "../../../redux/action-creators";

const audio = typeof window !== 'undefined' && document.getElementById('music') as HTMLAudioElement;

const WhoIsThatPokemon = ({ music }: any) => {
    const [discoveredPikachu, setDiscoveredPikachu] = useState(false);
    const [showImage, setShowImage] = useState(false)
    const { pauseMusic, playMusic } = useActions();


    useEffect(() => {
        if (!audio) return;
        const handleAudioEnded = () => {
            audio.play();
            playMusic();
        }

        if(discoveredPikachu && music) {
            setDiscoveredPikachu(false)
            audio.pause();
            pauseMusic();
            const isPikachu = document.getElementById('is-pikachu') as HTMLAudioElement;
            isPikachu.play();

            isPikachu.addEventListener('ended', handleAudioEnded);
        }
    }, [discoveredPikachu, music, pauseMusic, playMusic])

    const handleClick = async () => {
        setDiscoveredPikachu(true)
        setShowImage(true)
    };

    return (
        <div>
            <Image
                src={showImage ? pikachu : pikachuShadow}
                alt="pikachu"
                style={{marginTop: '5%'}}
                height={300}
                width={300}
                className={discoveredPikachu ? styles['fade-in-pikachu'] : ''}
            />
            <Typography align='center' className={styles['pokemon-file-description']}>
                {showImage ? 'Is Pikachu!' : 'Who is that Pokémon?'}
            </Typography>

            <Button
                variant='contained'
                sx={{width: '100%', marginTop: '1rem'}}
                onClick={handleClick}
                disabled={showImage}
            >
                Discover
            </Button>
            <audio
                src={'audio/is-pikachu.mp3'}
                preload="auto"
                id={'is-pikachu'}
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

export default connect(mapStateToProps, { pauseMusic, playMusic })(WhoIsThatPokemon);