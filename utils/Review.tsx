import { useEffect, useState } from 'react';

import { MdOutlineCancel } from 'react-icons/md';
import { connect } from 'react-redux';

import Star from './svg/Star';
import { rankPokemonDB } from '../firebase/config';
import { useActions } from '../hooks/useActions';
import useOriginUser from '../hooks/useOriginUser';
import { RootState } from '../redux';
import { addPokeToRanking, changeReview } from '../redux/action-creators';
import { removePokemonRanking } from '../redux/action-creators/index';
import styles from '../styles/review.module.css'

const Review = ({ pokemonName, ranking, readOnly, pokemonTypes = [] }: any) => {
    const [review, setReview] = useState<number | null>(null);

    const { addPokeToRanking, changeReview, removePokemonRanking } = useActions();
    const currentView = typeof window !== 'undefined' ? window.location.pathname.split(' ') : [''];
    const originUser = useOriginUser()

    useEffect(() => {
        const updatePokemonRanking = () => {
            const initialRankingState = ranking.find((poke: any) => poke.pokemon === pokemonName);

            if(initialRankingState) {
                setReview(initialRankingState?.ranking);
            } else {
                setReview(0)
            }
        }

        updatePokemonRanking();
    }, [ranking, pokemonName]);

    const giveDataPokemonClicked = (review: number) => {
        if(!readOnly) {
            const typePokemon = pokemonTypes.map(((type: any) => type.type.name));

            const checkingRank = ranking.map((poke: any) => poke.pokemon);

            if(checkingRank && !checkingRank?.includes(pokemonName)) { //set a new pokemon ranked
                addPokeToRanking(pokemonName, typePokemon, review + 1);
                if (originUser.username !== 'ALLOW_NOT_ACCOUNT') {
                    rankPokemonDB(pokemonName, typePokemon, review + 1, originUser.username, 'add')
                }
                setReview(review + 1);
            }
            else { // update review
                changeReview(pokemonName, typePokemon, review + 1);
                setReview(review + 1);
                rankPokemonDB(pokemonName, typePokemon, review + 1, originUser.username, 'update')
            }
        }
    }

    const deletePokemonRanking = () => {
        removePokemonRanking(pokemonName);
        setReview(0);
        if (originUser.username !== 'ALLOW_NOT_ACCOUNT') {
            const typePokemon = pokemonTypes.map(((type: any) => type.type.name));
            rankPokemonDB(pokemonName, typePokemon, review! + 1, originUser.username, 'delete')
        }
    }

    return (
        review !== null && (
            <div>
                {review === 0 && <i style={{display: 'inline-flex'}}>Without review</i>}
                {(review > 0 && currentView && currentView?.includes('/pokemons')) &&
                    <MdOutlineCancel
                        color="red"
                        style={{cursor: 'pointer'}}
                        onClick={deletePokemonRanking}
                    />
                }
                <div>
                    {Array(5).fill(undefined).map((_, i) => (
                        <div
                        key={i} className={styles.review}
                        onClick={() => giveDataPokemonClicked(i)}
                        id={styles[`${!readOnly ? 'change' : ''}`]}
                        >
                            {i < review
                            ? <Star fill="#FFD19A" />
                            : <Star fill="#E9DBCB" />
                            }
                        </div>

                    ))}
                </div>
            </div>
        )
    );
}

const mapStateToProps = (state: RootState) => {
    return { ranking: state.ranking.pokemonRanked }
}

export default connect(mapStateToProps, { addPokeToRanking, changeReview, removePokemonRanking })(Review);