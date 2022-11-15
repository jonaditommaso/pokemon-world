import React, { useEffect } from 'react';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
// import Review from './Review';
// import '../styles/searchPokemon.css';
// import '../styles/cardPokemonFile.css';
import styles from './card.module.css';
import { colorsByType } from '../../../utils/colorsByType';
import VolumeFill from '../../../utils/svg/VolumeFill';
// import VolumeFill from './svg/VolumeFill';

//pokemonData.sprites?.other['official-artwork']?.front_default
interface PokemonData {
    pokemonName: string,
    pokemonDescription?: string,
    pokemonType: string,
    pokemonId: number,
    pokemonImage: string,
    listenDescription?: any,
    evolve?: string,
    hasEvolution?: string,
    viewEvolution?: any,
}

const CardPokemonFile = ({
    pokemonImage,
    // review,
    hasEvolution,
    viewEvolution,
    pokemonName,
    pokemonDescription,
    pokemonId,
    pokemonType,
    listenDescription,
    evolve,

}: PokemonData) => {

    // useEffect(() => {
    // }, [pokemonData])

    return (
        <div className={styles.pokemonFile}>

            <Card className={styles.searchPokemon__card}>
                <div className={styles.searchPokemon__pokemon}>

                    {/* {review >=0
                    ?   <ListGroup className="list-group-flush pokemonFile__info">
                            <ListGroupItem>
                                <Review review={review} readOnly/>
                            </ListGroupItem>
                        </ListGroup>
                    : null
                    } */}

                    <Card.Img
                        className={styles.searchPokemon__img}
                        variant="top"
                        src={pokemonImage}
                    />

                    <Card.Body>
                        <Card.Title className={styles.pokemonFile__title}>
                            {pokemonName} #{pokemonId}
                        </Card.Title>
                        {pokemonDescription &&
                            <>
                                <hr />
                                <Card.Text>
                                    {pokemonDescription}
                                </Card.Text>
                            </>
                        }
                    </Card.Body>

                </div>

                {pokemonDescription &&
                    <Button onClick={() => listenDescription(pokemonDescription)}>
                        Listen
                        <VolumeFill width={16} height={16} style={{margin: '5px'}} />
                    </Button>
                }

                <ListGroup className={styles.pokemonFile__info}>
                    <ListGroupItem>
                        Type: <strong style={{color: colorsByType[pokemonType as keyof typeof colorsByType]}}>{pokemonType}</strong>
                    </ListGroupItem>
                </ListGroup>

                {evolve &&
                    <Button
                        onClick={viewEvolution}
                        disabled={hasEvolution === evolve ? true : false}
                    >
                        {hasEvolution}
                    </Button>
                }
            </Card>
        </div>
    );
}

export default CardPokemonFile;