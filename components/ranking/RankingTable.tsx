import React, { useState, useEffect } from 'react';

import { Table, TableBody, TableCell, tableCellClasses, TableHead, TableRow, styled } from '@mui/material';
import get from 'lodash/get'
import { RiErrorWarningLine } from 'react-icons/ri';
import { connect } from 'react-redux';

import styles from './ranking.module.css'
import { themePalette } from '../../config/theme.config';
import { RootState } from '../../redux';
import { capitalize } from '../../utils/capitalize';
import Review from '../../utils/Review';

const RankingTable = ({ ranking }: any) => {

    const [pokemonRanking, setPokemonRanking] = useState([]);

    useEffect(() => {
        const getTeams = async() => {

            setPokemonRanking(ranking?.sort((a: any, b: any) => {
                return b.ranking - a.ranking
             }));
        }
        if(ranking) {
            getTeams();
        }
    }, [pokemonRanking, ranking]);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: themePalette.blue,
        color: theme.palette.common.white,
        fontSize: 17,
        padding: 10,
        border: `1px solid ${themePalette.blue}`
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 15,
        padding: 5,
        borderLeft: '1px solid #e6e6e6',
        borderRight: '1px solid #e6e6e6'
    },
    }));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f7f7f7',
  },
}));

    return (
        <div className={styles.rankingTable}>
            { ranking.length === 0
            ? <div>No pokemons ranked <RiErrorWarningLine color="red" /> </div>
            : <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                {['Pokemon', 'Ranking'].map((th, index) => (
                    <StyledTableCell key={`${th}-${index}`} component={'th'} align='center'>{th}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {pokemonRanking?.map((pokemon, index) => (
                <StyledTableRow key={index} hover>
                  <StyledTableCell align='center'>
                    {capitalize(get(pokemon, 'pokemon'))}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <Review review={get(pokemon, 'ranking')} readOnly />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
            }
            {pokemonRanking.length > 0 && <i>{pokemonRanking.length} pokemons ranked</i>}
        </div>
    );
}

const mapStateToProps = (state: RootState) => ({
    ranking: state.ranking.pokemonRanked
});

export default connect(mapStateToProps, null)(RankingTable);