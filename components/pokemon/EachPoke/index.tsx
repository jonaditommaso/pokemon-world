import React, { useState, useEffect } from 'react';

import { Chip } from '@mui/material';
import Image from 'next/image';
import { GiCrossedSwords } from "react-icons/gi";
import { GiPointySword } from "react-icons/gi";
import { GiWeight } from "react-icons/gi";
import { connect } from 'react-redux';

import styles from './eachPoke.module.css'
// import { useActions } from '../../../hooks/useActions';
import { PokemonData } from '../../../interfaces/PokemonData';
import { RootState } from '../../../redux';
// import { removePokemonRanking } from '../../../redux/action-creators';
import { capitalize } from '../../../utils/capitalize';
import { colorsByType } from '../../../utils/colorsByType';
import { generateGradient } from '../../../utils/generateGradient';
import Review from '../../../utils/Review';


interface Ranking {
    pokemon: string,
    ranking: number
}

interface Pokemon {
    pokemon: PokemonData,
    ranking: Ranking[],
}

// interface PokemonRankingState {
//     pokemon: string,
//     ranking: number,
//     type: string[]
//     user: string,
// }

const EachPoke = ({
    pokemon,
    ranking,
}: Pokemon) => {

    const [pokemonRanking, setPokemonRanking] = useState <any>(undefined);
    const [review, setReview] = useState(pokemonRanking ? pokemonRanking.ranking : 0);

    const checkingRank = ranking.map((poke) => poke.pokemon);

    const updatePokemonRanking = () => {
        const initialRankingState = ranking.find((poke) => poke.pokemon === pokemon.name);
        setPokemonRanking(initialRankingState);
      }

    useEffect(() => {
        if (pokemonRanking) {
          setReview(pokemonRanking.ranking);
        }
      }, [pokemonRanking]);

    useEffect(() => {
        updatePokemonRanking();
      }, [ranking, pokemon]);

    useEffect(() => {
        if(checkingRank && !checkingRank?.includes(pokemon.name)) {
            setReview(0);
        }
    }, [ranking, checkingRank, pokemon, review]);

    if(!pokemon?.sprites?.other?.dream_world?.front_default) return null;

    const pokemonColor = colorsByType[pokemon.types[0].type.name as keyof typeof colorsByType]

    return (
        <div
            className={styles.eachPoke}
            style={{
                backgroundImage: generateGradient(pokemonColor),
                boxShadow: `1px 1px 2px ${pokemonColor}`
            }}
        >
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
                        {capitalize(pokemon.name)}
                    </h6>
                    <h6 className={styles.eachPoke__id}>
                        {`#${pokemon.id}`}
                    </h6>
                </div>
            </div>


            <div className={styles.eachPoke__description}>
                <div className={styles.eachPoke__types}>
                    {pokemon.types.map((type: any, i: number) => (
                        <Chip
                            key={i}
                            className={styles.eachPoke__type}
                            sx={{backgroundColor: colorsByType[type.type.name as keyof typeof colorsByType]}}
                            label={capitalize(type.type.name)}
                        />
                    ))}
                </div>

                <Review
                    review={review}
                    pokemon={pokemon}
                    getReview={setReview}
                    checkRank={checkingRank}
                />
            </div>

            <div className={styles.eachPoke__attackDefense}>
                <p className={styles.attackAndDefense}>Attack</p>
                <span style={{color: 'red'}}><GiPointySword /> {pokemon.stats[1].base_stat}</span>

                <hr style={{margin: '0'}} />

                <p className={styles.attackAndDefense}>Defense</p>
                <span style={{color: '#0052c7'}}><GiCrossedSwords /> {pokemon.stats[2].base_stat}</span>

                <hr style={{margin: '0'}} />

                <p className={styles.attackAndDefense}>Weight</p>
                <span style={{color: '#d98218'}}><GiWeight /> {pokemon.weight}</span>
            </div>

        </div>
    );
}

const mapStateToProps = (state: RootState) => ({
    ranking: state.ranking.pokemonRanked
})

export default connect(mapStateToProps, null)(EachPoke);