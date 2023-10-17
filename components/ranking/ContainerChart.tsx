import { connect } from 'react-redux';

import BarChart from './charts/BarChart';
import DonutChart from './charts/DonutChart';
import PieChart from './charts/PieChart';
import styles from './ranking.module.css'
import { RankingStructure } from '../../interfaces/RankingStructure';
import { RootState } from '../../redux';

interface PropsContainerChart {
  chartsSelected: string[],
  ranking: RankingStructure[]
}

interface ChartType {
  [key: string]: JSX.Element;
}

const ContainerChart = ({ chartsSelected = [], ranking }: PropsContainerChart) => {

  const charts: ChartType = {
    donut: <DonutChart />,
    pie: <PieChart />
  }

  return (
    <div className={styles['container-chart']}>
      <BarChart />
      {chartsSelected.length > 0 && chartsSelected?.map(chart => (
        <div key={chart}>
          {charts[chart]}
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  ranking: state.ranking.pokemonRanked
});


export default connect(mapStateToProps, null)(ContainerChart);