import { useEffect, useState } from 'react';

import ReactEcharts from "echarts-for-react";
import { connect } from 'react-redux';


import { RankingStructure } from '../../../interfaces/RankingStructure';
import { RootState } from '../../../redux';
import { capitalize } from '../../../utils/capitalize';
import { countDuplicates } from '../../../utils/countDuplicates';
import FilterButton from '../../pokemon/FilterPokemonButton';
import styles from '../ranking.module.css';

type PropsPieChart = {
    ranking: RankingStructure[]
}

type PokemonDataLabels = {
    name: string,
    value: number
}

const DonutChart = ({ ranking }: PropsPieChart) => {
    const [pokemonTypes, setPokemonTypes] = useState <string[]> ([]);
    const [typeSelected, setTypeSelected] = useState('');
    const [pokemonDataLabels, setPokemonDataLabels] = useState <PokemonDataLabels[]> ([]);

    useEffect(() => {
        if(ranking.length > 0 && pokemonTypes.length === 0) {
          let types: string[] = []
          ranking.map(pokemon => {
            pokemon.type.map(type => types.push(type));
          })
          setPokemonTypes(Object.keys(countDuplicates(types)));
          setTypeSelected(Object.keys(countDuplicates(types))[0]);
        }
    }, [ranking, pokemonTypes.length]);

    useEffect(() => {
        const pokemonsSelected = ranking?.flatMap(pokemon => {
            return pokemon.type.includes(typeSelected) ? {value: 1, name: capitalize(pokemon.pokemon)} : []
        })
        setPokemonDataLabels(pokemonsSelected);
    }, [ranking, typeSelected]);

    const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center',
          textStyle: {
            fontFamily: 'pokemon'
          }
        },
        graphic: [
          {
            type: 'text',
            left: 'center',
            top: '48%',
            style: {
              text: capitalize(typeSelected),
              fill: 'black',
              fontSize: 20,
              fontWeight: 'bold',
              fontFamily: 'pokemon'
            }
          }
        ],
        series: [
          {
            name: 'Pokémon',
            type: 'pie',
            radius: ['40%', '70%'],
            label: {
              show: false,
              position: 'center',
            },
            data: pokemonDataLabels
          }
        ],
    };

    return (
        <div className={styles['container-donut']}>
            <hr style={{ width: '70%', margin: 'auto', marginTop: '10px' }} />
            <ReactEcharts option={option} />
            <FilterButton setTypeSelected={setTypeSelected} customTypes={pokemonTypes} options={{ typeSelected: typeSelected }} />
        </div>
    );
}

const mapStateToProps = (state: RootState) => ({
    ranking: state.ranking.pokemonRanked
  })

export default connect(mapStateToProps, null)(DonutChart);