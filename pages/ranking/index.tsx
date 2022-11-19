import Chart from '../../components/ranking/Chart';
import RankingTable from '../../components/ranking/RankingTable';
import styles from './ranking.module.css'

const Ranking = () => {
    return (
        <div className={styles.ranking}>
            <RankingTable />
            <Chart />
        </div>
    );
}

export default Ranking;