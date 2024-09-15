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
import { LifePoints } from '../../interfaces/Fighter';
import { RootState } from '../../redux';
import { thereBattle } from '../../redux/action-creators';
import { battleData } from '../../redux/action-creators/index';
import { extractedData } from '../../utils/extractedData';


const Fighter = ({ fighter, opponentData, battlesData, battleMode }: any) => {

    const { thereBattle, battleData } = useActions();

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
        if(opponentData) thereBattle(opponentData);
    }, [opponentData]);


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
        if (spotted && !spotted?.includes(opponentData.name)) spotted.push(opponentData.name);
        let result = {...battlesData}
        result.spotted = spotted;
        if(youWin) {
            result.won += 1;
            result.points += 72;
        } else {
            result.lost += 1;
            result.points += 23
        }
        result.battles = result.battles + 1

        battleData(result);
      }

      if (gameOver === 'fighter__win' && battleMode.mode !== 'training' && !setting.current && youWin !== undefined) {
        sendResultData();
      }

    }, [gameOver, battleData, youWin, battlesData, battleMode, opponentData]);


    if(!fighter.pokemon || !opponentData) return null;

    return (
        <div>

            {/* OPPONENT */}
            <div className={styles.fighter__opponent}>
                <div className={styles.fightsData}>
                    <Bar
                        changeLife={setLifePoints}
                        damage={damagePointsForTheOpponent}
                        fighter='opponent'
                        hit={thereIsHit}
                        opponentsTurn={opponentsTurn}
                        setGameOver={setGameOver}
                        setHit={setThereIsHit}
                    />
                    <FightsData
                        player={'opponent'}
                        setHit={setThereIsHit}
                        character={opponentData}
                    />
                </div>

                <div className={styles[opponentPunched]}>
                    <Image
                        src={opponentData.front_default}
                        alt="opponent"
                        className={clsx(styles.fighter__img, styles.fighter__imgOpponent)}
                        style={{height: '180px'}}
                        width={180}
                        height={180}
                        priority
                    />
                    <div className={styles['pokemon-area']}></div>
                </div>
            </div>

            <FinalMessage
              gameOver={gameOver}
              winnerName={youWin ? fighter.pokemon.name : opponentData.name}
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
                        priority
                    />
                    <div className={styles['pokemon-area']}></div>
                </div>

                <div style={{display: 'flex', alignItems: 'flex-end', marginBottom: '23px'}}>
                    <div className={styles.fightsData}>
                        <FightsData
                            opponentDamage={setDamagePointsForTheOpponent}
                            punched={setOpponentPunched}
                            finish={gameOver}
                            setHit={setThereIsHit}
                            attack={fighter?.pokemon?.stats[1]?.base_stat}
                            turn={setOpponentsTurn}
                            hisTurn={opponentsTurn}
                            character={fighter.pokemon}
                            player='player'
                        />

                        <Bar
                            changeLife={setLifePoints}
                            damage={get(opponentData, 'stats[1].base_stat')}
                            fighter='player'
                            hit={thereIsHit}
                            opponentsTurn={opponentsTurn}
                            setGameOver={setGameOver}
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

    const opponentData = extractedData(data, OPONENT_DATA);

    return {
        props: {
            opponentData
        }
    }
}