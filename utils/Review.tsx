import { useEffect } from 'react';
import { connect } from 'react-redux';
// import { addPokeToRanking, changeReview } from '../redux/actions';
import '../styles/review.css';
import Star from './svg/Star'

const Review = ({ review, pokemon, addPokeToRanking, getReview, ranking, checkRank, changeReview, readOnly }: any) => {

    useEffect(() => {
    }, [ranking])

    const typePokemon = pokemon && pokemon.types.map(((type: any) => type.type.name));

    const giveDataPokemonClicked = (review: any) => {
        if(!readOnly) {
            if(pokemon && !checkRank.includes(pokemon.name)) {
                addPokeToRanking(pokemon.name, typePokemon, review + 1);
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
            {Array(5).fill().map((_, i) => (
                <div key={i} className="review" onClick={() => giveDataPokemonClicked(i)} id={!readOnly ? 'change' : ''}>
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

export default connect(mapStateToProps, )(Review); //{ addPokeToRanking, changeReview }