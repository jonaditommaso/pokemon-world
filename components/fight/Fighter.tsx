import React, { useState, useEffect, useRef } from 'react';

import clsx from 'clsx';
import get from 'lodash/get';
import Image from 'next/image';
import { connect } from 'react-redux';

import Bar from './Bar';
import styles from './fight.module.css';
import FightsData from './FightsData';
import FinalMessage from './FinalMessage';
import { OPONENT_DATA } from '../../constants';
import pokeapi from '../../helpers/pokeapi';
import { useActions } from '../../hooks/useActions';
import { LifePoints, Moves, PokemonFighter } from '../../interfaces/Fighter';
import { RootState } from '../../redux';
import { thereBattle } from '../../redux/action-creators';
import { battleData } from '../../redux/action-creators/index';
import { extractedData } from '../../utils/extractedData';


const Fighter = ({ fighter, pokemonData, battlesData, battleMode }: any) => {

    const { thereBattle, battleData } = useActions();

    const [skills, setSkills] = useState <string[]> ([]);
    const [ownSkills, setOwnSkills] = useState <string[]> ([]);
    const [opponentPunched, setOpponentPunched] = useState('');
    const [iWasPunched, setIWasPunched] = useState('')
    const [damagePointsForTheOpponent, setDamagePointsForTheOpponent] = useState(0);
    const [gameOver, setGameOver] = useState('d-none');
    const [opponentsTurn, setOpponentsTurn] = useState <undefined | boolean> (undefined); // this represent if it is the opponent turn 'cause user don't manage him
    const [thereIsHit, setThereIsHit] = useState(false); // this represent a hit for anyone
    const [youWin, setYouWin] = useState <undefined | boolean> (undefined);
    const [lifePoints, setLifePoints] = useState <LifePoints> ({
        opponent: 0,
        player: 0
    });

    const setting = useRef(false);

    useEffect(() => {
        let moves: Moves = {
            opponent: [],
            player: [],
        }

        type Player = 'opponent' | 'player';

        async function getSkills(pokemon: PokemonFighter, player: Player) {
            if(pokemon.moves[20]) {
                for (let i = 16; i < 20; i++) {
                    moves[player].push(pokemon.moves[i].move.name);
                }
                return moves;
            }
            else {
                for (let i = 0; i < 4; i++) {
                    moves[player].push(pokemon.moves[i].move.name);
                }
                return moves;
            }
        }

        if(pokemonData) {
            getSkills(pokemonData, 'opponent');
            setSkills(moves.opponent);
            thereBattle(pokemonData);
        }

        if(fighter) {
            getSkills(fighter.pokemon, 'player');
            setOwnSkills(moves.player);
        }

    }, [pokemonData, fighter, thereBattle]);


    useEffect(() => {
        if(opponentsTurn === true) {

            setTimeout(() => {
                if(lifePoints.opponent === 100) {
                    setIWasPunched('');
                }
                else {
                    setIWasPunched('fighter');
                }
            }, 5000);


            setTimeout(() => {
                setThereIsHit(true);
                setIWasPunched('');
                setOpponentsTurn(false);
            }, 5800);
        }
    }, [opponentsTurn, gameOver, lifePoints]);


    useEffect(() => {
        const setWinner = () => {
            if(lifePoints.opponent >= 100) {
                setYouWin(true);
            }
            if(lifePoints.player >= 100) {
                setYouWin(false);
            }
        };

      if(gameOver === 'fighter__win') {
        setWinner();
      }
    }, [gameOver, lifePoints]);

    useEffect(() => {
      const sendResultData = () => {
        setting.current = true;
        let spotted = [...battlesData.spotted];
        if (spotted && !spotted?.includes(pokemonData.name)) spotted.push(pokemonData.name);
        let result = {...battlesData}
        result.spotted = spotted;
        if(youWin) {
            result.won = result.won + 1
            result.points = result.points + 72
        } else {
            result.lost = result.lost + 1
            result.points = result.points + 23
        }
        result.battles = result.battles + 1

        battleData(result);
      }

      if (gameOver === 'fighter__win' && battleMode.mode !== 'training' && !setting.current && youWin !== undefined) sendResultData();

    }, [gameOver, battleData, youWin, battlesData, battleMode, pokemonData]);


    if(!fighter.pokemon) return null;

    return (
        <div>

            {/* OPPONENT */}
            <div className={styles.fighter__opponent}>
                <div className={styles.fightsData}>
                    <Bar
                        damage={damagePointsForTheOpponent}
                        setGameOver={setGameOver}
                        fighter='opponent'
                        changeLife={setLifePoints}
                        hit={thereIsHit}
                        setHit={setThereIsHit}
                        opponentsTurn={opponentsTurn}
                    />
                    <FightsData
                        skills={skills}
                        opponent={true}
                        setHit={setThereIsHit}
                    />
                </div>

                <div className={styles[opponentPunched]}>
                    <Image
                        src={pokemonData.front_default}
                        alt="opponent"
                        className={clsx(styles.fighter__img, styles.fighter__imgOpponent)}
                        style={{height: '180px'}}
                        width={180}
                        height={180}
                    />
                </div>
            </div>

            <FinalMessage
              gameOver={gameOver}
              winnerName={youWin ? fighter.pokemon.name : pokemonData.name}
              xpGained={youWin ? 72 : 23}
            />

            {/* MYSELF */}
            <div className={styles.fighter__myself}>
                <div className={styles[iWasPunched]}>
                    <Image
                        src={fighter?.pokemon.sprites?.other?.dream_world?.front_default}
                        alt="fighter"
                        className={clsx(styles.fighter__img, styles.fighter__imgMyself)}
                        width={180}
                        height={180}
                    />
                </div>

                <div style={{display: 'flex', alignItems: 'flex-end', marginBottom: '23px'}}>
                    <div className={styles.fightsData}>
                        <FightsData
                            skills={ownSkills}
                            opponentDamage={setDamagePointsForTheOpponent}
                            punched={setOpponentPunched}
                            finish={gameOver}
                            setHit={setThereIsHit}
                            attack={fighter?.pokemon?.stats[1]?.base_stat}
                            turn={setOpponentsTurn}
                            hisTurn={opponentsTurn}
                        />

                        <Bar
                            damage={get(pokemonData, 'stats[1].base_stat')}
                            opponentsTurn={opponentsTurn}
                            setGameOver={setGameOver}
                            fighter='player'
                            changeLife={setLifePoints}
                            hit={thereIsHit}
                            setHit={setThereIsHit}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
}

const mapStateToProps = (state: RootState) => {
    return {
        fighter: state.fight,
        battle: state.battle,
        battlesData: state.battlesData.battlesData,
        battleMode: state.battleMode,
    }
}

export default connect(mapStateToProps, { thereBattle, battleData })(Fighter);

export async function getStaticProps() {
    const OPPONENT = Math.round(Math.random()*100).toString();
    // podria multiplicar por 150 y setear opponent siempre y cuando el resultado no sea 132 (ditto tiene una sola habilidad)

    const { data } = await pokeapi.get(`/pokemon/${OPPONENT}`);

    const pokemonData = extractedData(data, OPONENT_DATA)

    return {
        props: {
            pokemonData
        }
    }
}