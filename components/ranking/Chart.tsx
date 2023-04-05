import React, { useState, useEffect } from 'react';

import { Bar } from 'react-chartjs-2';
import { RiErrorWarningLine } from 'react-icons/ri';
import { connect } from 'react-redux';

import styles from './ranking.module.css'
import { RootState } from '../../redux';

const Chart = ({ ranking }: any) => {

  const [oneStar, setOneStar] = useState(0);
  const [twoStars, setTwoStars] = useState(0);
  const [threeStars, setThreeStars] = useState(0);
  const [fourStars, setFourStars] = useState(0);
  const [fiveStars, setFiveStars] = useState(0);

  const [dataAvailable, setDataAvailable] = useState(false);
  const [chartsAdded, setChartsAdded] = useState([]);

  const data = {
    labels: ['1 star', '2 stars', '3 stars', '4 stars', '5 stars'],
    datasets: [
      {
        data: [oneStar, twoStars, threeStars, fourStars, fiveStars],
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
  };

  const pokemonRanked = data.datasets.map(stars => stars);

  useEffect(() => {
    const stars1 = ranking.filter((star: any) => star.ranking === 1);
    const stars2 = ranking.filter((star: any) => star.ranking === 2);
    const stars3 = ranking.filter((star: any) => star.ranking === 3);
    const stars4 = ranking.filter((star: any) => star.ranking === 4);
    const stars5 = ranking.filter((star: any) => star.ranking === 5);
    setOneStar(stars1.length);
    setTwoStars(stars2.length);
    setThreeStars(stars3.length);
    setFourStars(stars4.length);
    setFiveStars(stars5.length);

    const thereIsData = () => {
      pokemonRanked[0].data.forEach(item => {
        if(item !== 0) {
          setDataAvailable(true);
        }
      })
    }
    thereIsData();
  }, [ranking, pokemonRanked]);


  const options = {
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Categories with the best ranking',
      },
    },
    ticks: { precision: 0 }
  };


  return (
    <div className={styles.chartRanking}>
        { dataAvailable === false
          ? <div>No data available to display <RiErrorWarningLine color="red" /></div>
          : <div>
            <Bar data={data} options={options} />
          </div>
        }
    </div>
  )
};

const mapStateToProps = (state: RootState) => ({
  ranking: state.ranking.pokemonRanked
})


export default connect(mapStateToProps, null)(Chart);