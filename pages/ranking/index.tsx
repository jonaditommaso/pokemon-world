import { useEffect } from 'react';
import { connect } from 'react-redux';
import Chart from '../../components/ranking/Chart';
import RankingTable from '../../components/ranking/RankingTable';
import { fetchRanking } from '../../firebase/config';
import { useActions } from '../../hooks/useActions';
import useUser from '../../hooks/useUser';
import styles from './ranking.module.css'

const Ranking = ({ ranking }) => {
    const githubUser = useUser();
    const { fetchPokeRanking } = useActions();

    useEffect(() => {
        if(githubUser && ranking.length === 0) fetchRanking(githubUser.userId)
        .then(response => {
            if(response.length > 0) fetchPokeRanking(response)
        })
        .catch((error) => {
            console.log("Error getting pokemons: ", error);
        })
    }, [githubUser]);

    return (
        <div className={styles.ranking}>
            <RankingTable />
            <Chart />
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    ranking: state.ranking.pokemonRanked
});

export default connect(mapStateToProps, null)(Ranking);