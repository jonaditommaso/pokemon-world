import { useEffect } from 'react';

import { MdOutlineCancel } from 'react-icons/md';
import { connect } from 'react-redux';

import Star from './svg/Star';
import { rankPokemonDB } from '../firebase/config';
import { useActions } from '../hooks/useActions';
import useOriginUser from '../hooks/useOriginUser';
import useUser from '../hooks/useUser';
import { RootState } from '../redux';
import { addPokeToRanking, changeReview } from '../redux/action-creators';
import { removePokemonRanking } from '../redux/action-creators/index';
import styles from '../styles/review.module.css'

const Review = ({ review, pokemon, getReview, ranking, checkRank = [], readOnly }: any) => {

    // const githubUser = useUser();
    const { addPokeToRanking, changeReview, removePokemonRanking } = useActions();
    const currentView = typeof window !== 'undefined' ? window.location.pathname.split(' ') : [''];
    const originUser = useOriginUser()

    useEffect(() => {
    }, [review, ranking])

    const typePokemon = pokemon && pokemon.types.map(((type: any) => type.type.name));

    const giveDataPokemonClicked = (review: any) => {
        if(!readOnly) {
            if(checkRank && pokemon && !checkRank?.includes(pokemon.name)) { //set a new pokemon ranked
                addPokeToRanking(pokemon.name, typePokemon, review + 1);
                if (originUser.username !== 'ALLOW_NOT_ACCOUNT') {
                    rankPokemonDB(pokemon.name, typePokemon, review + 1, originUser.username)
                }
                getReview(review + 1);
            }
            else { // update review
                changeReview(pokemon.name, typePokemon, review + 1);
                getReview(review + 1);
            }
        }
    }

    const deletePokemonRanking = () => {
        removePokemonRanking(pokemon.name);
    }

    return (
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
    );
}

const mapStateToProps = (state: RootState) => {
    return { ranking: state.ranking.pokemonRanked }
}

export default connect(mapStateToProps, { addPokeToRanking, changeReview, removePokemonRanking })(Review);