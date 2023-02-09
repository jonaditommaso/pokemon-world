import { useEffect } from 'react';
import { connect } from 'react-redux';
import Star from './svg/Star';
import styles from '../styles/review.module.css'
import { useActions } from '../hooks/useActions';
import { addPokeToRanking, changeReview } from '../redux/action-creators';
import { rankPokemonDB } from '../firebase/config';
import useUser from '../hooks/useUser';

const Review = ({ review, pokemon, getReview, ranking, checkRank, readOnly }: any) => {

    const githubUser = useUser();

    const { addPokeToRanking, changeReview } = useActions()
    useEffect(() => {
    }, [ranking])

    const typePokemon = pokemon && pokemon.types.map(((type: any) => type.type.name));

    const giveDataPokemonClicked = (review: any) => {
        if(!readOnly) {
            if(pokemon && !checkRank.includes(pokemon.name)) {
                addPokeToRanking(pokemon.name, typePokemon, review + 1);
                rankPokemonDB(pokemon.name, typePokemon, review + 1, githubUser.userId)
                getReview(review + 1)
            }
            else {
                changeReview(pokemon.name, typePokemon, review + 1);
                getReview(review + 1);
            }
        }
    }

    return (
        <>
        {review === 0 && <i style={{display: 'inline-flex'}}>Without review</i>}
        <div>
            {Array(5).fill(undefined).map((_, i) => (
                <div key={i} className={styles.review} onClick={() => giveDataPokemonClicked(i)} id={styles[`${!readOnly ? 'change' : ''}`]}>
                    {i < review
                    ? <Star fill="#FFD19A" />
                    : <Star fill="#E9DBCB" />
                    }
                </div>

            ))}
        </div>
        </>
    );
}

const mapStateToProps = (state: any) => {
    return { ranking: state.ranking.pokemonRanked }
}

export default connect(mapStateToProps, { addPokeToRanking, changeReview })(Review);