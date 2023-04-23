import React from 'react';

import { Button, Card, CardContent, CardMedia , Typography} from '@mui/material';

import styles from './card.module.css';
import { colorsByType } from '../../../utils/colorsByType';
import Review from '../../../utils/Review';
import VolumeFill from '../../../utils/svg/VolumeFill';


interface PokemonData {
    pokemonName: string,
    pokemonDescription?: string,
    pokemonType: string,
    pokemonId: number,
    pokemonImage: string,
    listenDescription?: (text: string) => void,
    evolve?: string,
    hasEvolution?: string,
    viewEvolution?(): void,
    review?: number,
}

const CardPokemonFile = ({
    pokemonImage,
    review = 0,
    hasEvolution,
    viewEvolution,
    pokemonName,
    pokemonDescription,
    pokemonId,
    pokemonType,
    listenDescription,
    evolve,

}: PokemonData) => {

    return (
        <div className={styles.pokemonFile}>

            <Card className={styles.searchPokemon__card}>
                <div className={styles.searchPokemon__pokemon}>

                    {Number.isInteger(review) && review >=0 ? <div className={''} style={{margin: '10px'}}>
                        <div className={styles['review-container']}>
                            <Review review={review} readOnly />
                        </div>
                    </div> : null}

                     <CardMedia
                        className={styles.searchPokemon__img}
                        image={pokemonImage}
                        title={pokemonName}
                        sx={{height: '18rem'}}
                    />

                    <CardContent>
                        <Typography className={styles.pokemonFile__title} variant='h5'>
                            {pokemonName} #{pokemonId}
                        </Typography>
                        {pokemonDescription &&
                            <>
                                <hr />
                                <Typography>
                                    {pokemonDescription}
                                </Typography>
                            </>
                        }
                    </CardContent>

                </div>

                {pokemonDescription && listenDescription &&
                    <Button onClick={() => listenDescription(pokemonDescription)} variant='contained' sx={{width: '100%'}}>
                        Listen
                        <VolumeFill width={16} height={16} style={{margin: '5px'}} />
                    </Button>
                }

                <div className={styles.pokemonFile__info}>
                    Type: <strong style={{color: colorsByType[pokemonType as keyof typeof colorsByType]}}>{pokemonType}</strong>
                </div>

                {evolve &&
                    <Button
                        onClick={viewEvolution}
                        disabled={hasEvolution === evolve ? true : false}
                        variant='contained'
                        sx={{width: '100%'}}
                    >
                        {hasEvolution}
                    </Button>
                }
            </Card>
        </div>
    );
}

export default CardPokemonFile;