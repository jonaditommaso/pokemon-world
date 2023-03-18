import React, { useState, useEffect } from 'react';

import { Table, TableBody, TableCell, tableCellClasses, TableHead, TableRow, styled } from '@mui/material';
import { RiErrorWarningLine } from 'react-icons/ri';
import { connect } from 'react-redux';

import { themePalette } from '../../config/theme.config';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import Review from '../../utils/Review';
import styles from './ranking.module.css'

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
                    {capitalizeFirstLetter(pokemon?.pokemon)}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    <Review review={pokemon?.ranking} readOnly />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
            }
            <i>{pokemonRanking.length} pokemons ranked</i>
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    ranking: state.ranking.pokemonRanked
});

export default connect(mapStateToProps, null)(RankingTable);