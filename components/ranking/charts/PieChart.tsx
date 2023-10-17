import { useEffect, useState } from 'react';

import ReactEcharts from 'echarts-for-react';
import { connect } from 'react-redux';


import { RankingStructure } from '../../../interfaces/RankingStructure';
import { RootState } from '../../../redux';
import { capitalize } from '../../../utils/capitalize';
import { colorsByType } from '../../../utils/colorsByType';
import { countDuplicates } from '../../../utils/countDuplicates';

type PropsPieChart = {
  ranking: RankingStructure[]
}

type PokemonDataLabels = {
  name: string,
  value: number
}

const PieChart = ({ ranking }: PropsPieChart) => {

  const [pokemonDataLabels, setPokemonDataLabels] = useState  <PokemonDataLabels[]> ([])

  useEffect(() => {
    if(ranking.length > 0) {
      let types: string[] = []
      ranking.map(pokemon => {
        pokemon.type.map(type => types.push(type));
      })
      const pokemonTypes = countDuplicates(types);
      const result = Object.entries(pokemonTypes).map(([name, value]) => {
        const color = colorsByType[name as keyof typeof colorsByType];
        return (
          { name: capitalize(name), value, itemStyle: { color } }
        )
      });
      setPokemonDataLabels(result)
    }
  }, [ranking]);

  const option = {
    title: {
      subtext: 'Types ranked',
      left: 'center',
      subtextStyle: {
        fontSize: 20,
        fontFamily: 'pokemon',
        color: 'black'
      }
    },
    tooltip: {
      trigger: 'item'
    },
    label: {
      fontFamily: 'pokemon'
    },
    series: [
      {
        name: 'Pokémon type',
        type: 'pie',
        radius: '50%',
        data: pokemonDataLabels,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return (
    <div style={{ width: '400px' }}>
      <ReactEcharts option={option} />
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  ranking: state.ranking.pokemonRanked
})

export default connect(mapStateToProps, null)(PieChart);
