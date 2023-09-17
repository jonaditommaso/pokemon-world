import { useEffect, useState } from 'react';

import { ChartOptions } from 'chart.js';
import { Pie } from 'react-chartjs-2'; //Bar, Doughnut,
import { connect } from 'react-redux';

import Chart from './Chart';
import { RankingStructure } from '../../interfaces/RankingStructure';
import { RootState } from '../../redux';
import { capitalize } from '../../utils/capitalize';
import { countDuplicates } from '../../utils/countDuplicates';

interface PropsContainerChart {
  chartsSelected: string[],
  ranking: RankingStructure[]
}

interface ChartType {
  [key: string]: JSX.Element;
}

const ContainerChart = ({ chartsSelected = [], ranking }: PropsContainerChart) => {

  const [pokemonTypes, setPokemonTypes] = useState({})

  useEffect(() => {
    if(ranking.length > 0) {
      let types: string[] = []
      ranking.map(pokemon => {
        pokemon.type.map(type => types.push(type));
      })
      setPokemonTypes(countDuplicates(types))
    }
  }, [ranking]);


  const data = {
    labels: Object.keys(pokemonTypes).map(label => capitalize(label)),
    datasets: [
      {
        data: Object.values(pokemonTypes),
        backgroundColor: [
          'rgba(255, 99, 132, .5)',
          'rgba(54, 162, 235, .5)',
          'rgba(255, 206, 86, .5)',
          'rgba(75, 192, 192, .5)',
          'rgba(153, 102, 255, .5)',
          'rgba(255, 159, 64, .5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: 'Chart.js Pie Chart'
        }
      }
    },
  };

  const insideDonutText = {
    id: 'insideText',
    beforeDatasetsDraw(chart: any) {
        const { ctx } = chart;
        ctx.save();
        ctx.font = 'normal 30px sans-serif';
        ctx.textAlign = 'center';
      ctx.fillText('Types', chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y)
    }
  };

    const pieOptions: ChartOptions =  {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        title: {
          display: true,
          text: 'Types ranked'
        }
      }
    }

  const charts: ChartType = {
    // donut: <Doughnut data={data} plugins={[insideDonutText]} />,
    pie: <Pie data={data} options={pieOptions}/>
  }

  return (
    <div style={{maxWidth: '1000px', display: 'flex', justifyContent: ranking.length === 0 ? 'center' : ''}}>
      <Chart />
        {chartsSelected.length > 0 && chartsSelected?.map(chart => (
            <div key={chart} style={{ maxWidth: '400px' }}>
                {charts[chart]}
            </div>
        ))}
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  ranking: state.ranking.pokemonRanked
})


export default connect(mapStateToProps, null)(ContainerChart);