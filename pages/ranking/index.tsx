import { useEffect } from 'react';
import { connect } from 'react-redux';
import Chart from '../../components/ranking/Chart';
import RankingTable from '../../components/ranking/RankingTable';
import { fetchRanking } from '../../firebase/config';
import { useActions } from '../../hooks/useActions';
import useUser from '../../hooks/useUser';
import styles from './ranking.module.css'
import { useGetRanked } from '../../hooks/useGetRanked';

const Ranking = ({ ranking }) => {

    useGetRanked(ranking);

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