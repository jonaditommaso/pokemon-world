import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
// import Review from '../../utils/Review';
// import '../../styles/rankingTable.css';
import { connect } from 'react-redux';
import { RiErrorWarningLine } from 'react-icons/ri';
import Review from '../../utils/Review';

const RankingTable = ({ ranking }: any) => {

    const [pokemonRanking, setPokemonRanking] = useState('');

    useEffect(() => {
        const getTeams = async() => {

            setPokemonRanking(ranking?.sort((a: any, b: any) => {
                return b.ranking - a.ranking
             }));
        }
        if(ranking) {
            getTeams();
        }
    }, [pokemonRanking]);

    return (
        <div className="rankingTable">
            { ranking.length === 0
            ? <div>No pokemons ranked <RiErrorWarningLine color="red" /> </div>
            : <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Pokemon</th>
                        <th>Ranking</th>
                    </tr>
                </thead>
                {pokemonRanking ?
                     <tbody >
                    {pokemonRanking?.map((poke, i): any => (
                        <tr key={i}>
                            <td>{poke?.pokemon?.charAt(0).toUpperCase() + poke?.pokemon?.slice(1)}</td>
                            <td><Review review={poke?.ranking} readOnly /></td>
                        </tr>
                    ))}
                    </tbody>
                    : null
                }
            </Table>
            }
        </div>
    );
}

const mapStateToProps = (state: any) => ({
    ranking: state.ranking.pokemonRanked
});

export default connect(mapStateToProps, null)(RankingTable);