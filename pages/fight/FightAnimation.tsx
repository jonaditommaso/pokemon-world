import clsx from 'clsx'
import { connect } from 'react-redux';

import styles from './fight.module.css';
import { PokemonData } from '../../interfaces/PokemonData';


interface FightProps {
    showVideo: boolean,
    fighter: {
        pokemon: PokemonData
    },
}

const FightAnimation = ({ fighter, showVideo }: FightProps) => {

    return (
        <div className={styles['container-media']}>
            <video
                src='video/pokeballgo.mp4'
                preload="auto"
                id="video"
                className={clsx(!showVideo && 'd-none', styles['intro-video'])}
            ></video>

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