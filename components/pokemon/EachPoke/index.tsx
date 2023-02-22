import React, { useState, useEffect } from 'react';

import { Chip } from '@mui/material';
import Image from 'next/image';
import { MdOutlineCancel } from 'react-icons/md';
import { connect } from 'react-redux';

import { useActions } from '../../../hooks/useActions';
import { PokemonData } from '../../../interfaces/PokemonData';
import { removePokemonRanking } from '../../../redux/action-creators';
import { colorsByType } from '../../../utils/colorsByType';
import Review from '../../../utils/Review';
import styles from './eachPoke.module.css'


interface Ranking {
    pokemon: string,
    ranking: number
}

interface Pokemon {
    pokemon: PokemonData,
    ranking: Ranking[]
}

const EachPoke = ({
    pokemon,
    ranking
}: Pokemon) => {

    const { removePokemonRanking } = useActions();

    const initial_state = ranking.find((poke) => poke.pokemon === pokemon.name)
    const [review, setReview] = useState(initial_state ? initial_state.ranking : 0);

    const checkingRank = ranking.map((poke) => poke.pokemon);

    useEffect(() => {
        if(!checkingRank.includes(pokemon.name)) {
            setReview(0);
        }
    }, [ranking]);

    const deletePokemonRanking = () => {
        removePokemonRanking(pokemon.name);
    }

    if(!pokemon?.sprites?.other?.dream_world?.front_default) return <></>;

    return (
        <div className={styles.eachPoke}>
            <div className={styles.eachPoke__File}>
                <Image
                    src={pokemon?.sprites?.other?.dream_world?.front_default}
                    alt={pokemon.name}
                    className={styles.eachPoke__img}
                    width={120}
                    height={70}
                />
                <div>
                    <h6>
                        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                    </h6>
                    <p className={styles.eachPoke__id}>
                        {`#${pokemon.id}`}
                    </p>
                </div>
            </div>


            <div className={styles.eachPoke__description}>
                <div className={styles.eachPoke__types}>
                    {pokemon.types.map((type: any, i: number) => (
                        <Chip
                            key={i}
                            className={styles.eachPoke__type}
                            sx={{backgroundColor: colorsByType[type.type.name as keyof typeof colorsByType]}}
                            label={type.type.name}
                        />
                    ))}
                </div>

                    {review > 0 &&
                        <MdOutlineCancel
                            color="red"
                            style={{cursor: 'pointer'}}
                            onClick={deletePokemonRanking}
                        />
                    }
                    <Review
                      review={review}
                      pokemon={pokemon}
                      getReview={setReview}
                      checkRank={checkingRank}
                    />

                <p className={styles.eachPoke__abilities}>
                    Weight: <span style={{color: '#d98218'}}>{pokemon.weight}</span>
                </p>
            </div>
            <div className={styles.eachPoke__attackDefense}>
                <div>
                    <p className={styles.attackAndDefense}>Attack</p>
                    <span style={{color: 'red'}}>{pokemon.stats[1].base_stat}</span>
                </div>
                <hr style={{margin: '0'}} />
                <div>
                    <p className={styles.attackAndDefense}>Defense</p>
                    <span style={{color: '#0052c7'}}>{pokemon.stats[2].base_stat}</span>
                </div>
            </div>

        </div>
    );
}

const mapStateToProps = (state: any) => ({
    ranking: state.ranking.pokemonRanked
})

export default connect(mapStateToProps, { removePokemonRanking })(EachPoke);