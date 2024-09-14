import clsx from 'clsx'
import Image from 'next/image';
import { connect } from 'react-redux';

import styles from './fight.module.css';
import { PokemonData } from '../../interfaces/PokemonData';
import pokeball from '../../public/assets/img/pokeball.png'


interface FightProps {
    showVideo: boolean,
    fighter: {
        pokemon: PokemonData
    },
}

const FightAnimation = ({ fighter, showVideo }: FightProps) => {

    return (
        <div className={styles['container-media']}>
            <div>
                {[...Array(4)].map((_, index) => (
                    <span key={index} className={clsx(!showVideo && 'd-none', styles[`corner-pokeball-${index}`],styles['corner-pokeball'])}>
                        <Image src={pokeball} alt='pokeball' width={50}  />
                    </span>
                    ))
                }
                <video
                    src='video/pokeballgo.mp4'
                    preload="auto"
                    id="video"
                    className={clsx(!showVideo && 'd-none', styles['intro-video'])}
                ></video>
            </div>

            <audio
                src='audio/pokemon-battle.mp3'
                preload="auto"
                id="pokemon-battle"
                controls
                style={{display: 'none'}}
            ></audio>
            <audio
                src={`audio/voices/${fighter?.pokemon.name}.mp3`}
                preload="auto"
                id="pokemon-name"
                controls
                style={{display: 'none'}}
            ></audio>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        fighter: state.fight,
    }
}

export default connect(mapStateToProps, null)(FightAnimation);