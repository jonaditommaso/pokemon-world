import React from 'react';

import ReactEcharts from 'echarts-for-react';
import { connect } from 'react-redux';

import { RootState } from '../../../redux';
import { colorsByType } from '../../../utils/colorsByType';
import styles from '../ranking.module.css';

const BarChart = ({ ranking }: any) => {

  interface DataObject {
    value: number,
    itemStyle: {
      color: string,
    }
  }

  const dataObjects: Record<number, DataObject> = {};

  ranking.forEach((pokemon: any, index: number) => {
    const ranking = pokemon.ranking;
    const color = Object.values(colorsByType)[index];

    if (!dataObjects[ranking]) {
      dataObjects[ranking] = { value: 0, itemStyle: { color } };
    }

    dataObjects[ranking].value += 1;
  });

  const option = {
    title: {
      text: 'Number of ranked per rating',
      textStyle: {
        fontFamily: 'pokemon',
        color: 'black'
      },
      right: 'center'
    },
    yAxis: {
      type: 'category',
      data: ['1 star', '2 stars', '3 stars', '4 stars', '5 stars']
    },
    xAxis: {
      type: 'value',
      interval: 1,
      nameTextStyle: {
        fontFamily: 'pokemon'
      }
    },
    series: [
      {
        data: Object.values(dataObjects),
        type: 'bar'
      }
    ]
  };


  return (
    <div className={styles.chartRanking}>
      <div style={{ width: '450px' }}>
        <ReactEcharts option={option} />
      </div>
    </div>
  )
};

const mapStateToProps = (state: RootState) => ({
  ranking: state.ranking.pokemonRanked
})


export default connect(mapStateToProps, null)(BarChart);