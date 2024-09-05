import React from 'react';

import { Chip } from '@mui/material';
import Image from 'next/image';
import { GiCrossedSwords } from "react-icons/gi";
import { GiPointySword } from "react-icons/gi";
import { GiWeight } from "react-icons/gi";

import styles from './eachPoke.module.css';
import { PokemonData } from '../../../interfaces/PokemonData';
import { capitalize } from '../../../utils/capitalize';
import { colorsByType } from '../../../utils/colorsByType';
import { generateGradient } from '../../../utils/generateGradient';
import Review from '../../../utils/Review';

interface Pokemon {
    pokemon: PokemonData,
    index: number,
}

const EachPoke = ({
    pokemon,
    index,
}: Pokemon) => {

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
                    priority={index < 2}
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

                <Review pokemonName={pokemon.name} pokemonTypes={pokemon.types} />
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

export default EachPoke;