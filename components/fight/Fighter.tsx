import React, { useState, useEffect, useRef, useMemo } from 'react';

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
import { DamagePoints } from '../../interfaces/DamagePoints';
import { LifePoints } from '../../interfaces/Fighter';
import { RootState } from '../../redux';
import { thereBattle } from '../../redux/action-creators';
import { battleData } from '../../redux/action-creators/index';
import { extractedData } from '../../utils/extractedData';


const Fighter = ({ fighter, opponentData, battlesData, battleMode }: any) => {

    const { thereBattle, battleData } = useActions();

    const [punchedClass, setPunchedClass] = useState('');
    const [gameOver, setGameOver] = useState('d-none');
    const [damagePoints, setDamagePoints] = useState<DamagePoints>({
        opponent: 0,
        me: 0
    })
    const [lifePoints, setLifePoints] = useState <LifePoints> ({
        opponent: 0,
        me: 0
    });

    const setting = useRef(false);

    useEffect(() => {
        if(opponentData) thereBattle(opponentData);
    }, [opponentData]);

    useEffect(() => {
      const sendResultData = () => {
        setting.current = true;
        let spotted = [...battlesData.spotted];
        if (spotted && !spotted?.includes(opponentData.name)) spotted.push(opponentData.name);
        let result = {...battlesData}
        result.spotted = spotted;
        if(lifePoints.opponent >= 100) {
            result.won += 1;
            result.points += 72;
        } else {
            result.lost += 1;
            result.points += 23
        }
        result.battles = result.battles + 1

        battleData(result);
      }

      if (gameOver === 'fighter__win' && battleMode.mode !== 'training' && !setting.current && lifePoints.opponent >= 100 !== undefined) {
        sendResultData();
      }

    }, [gameOver, battleData, battlesData, battleMode, opponentData, lifePoints]);


    const attack = useMemo(() => (
        {
            me: fighter?.pokemon?.stats[1]?.base_stat,
            opponent: get(opponentData, 'stats[1].base_stat')
        }
    ), [fighter, opponentData]);

    if(!fighter.pokemon || !opponentData) return null;

    return (
        <div>

            {/* OPPONENT */}
            <div className={styles.fighter__opponent}>
                <div className={styles.fightsData}>
                    <Bar
                        setLifePoints={setLifePoints}
                        damagePoints={damagePoints}
                        player='opponent'
                        setGameOver={setGameOver}
                    />
                    <FightsData
                        player='opponent'
                        character={opponentData}
                    />
                </div>

                <div>
                    <Image
                        src={opponentData.front_default}
                        alt="opponent"
                        className={clsx(styles.fighter__img, styles.fighter__imgOpponent, punchedClass === 'opponent' ? styles['punched-effect'] : '')}
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
              winnerName={lifePoints.opponent >= 100 ? fighter.pokemon.name : opponentData.name}
              xpGained={lifePoints.opponent >= 100 ? 72 : 23}
            />

            {/* MYSELF */}
            <div className={styles.fighter__myself}>
                <div>
                    <Image
                        src={fighter?.pokemon.sprites?.other?.dream_world?.front_default}
                        alt="fighter"
                        className={clsx(styles.fighter__img, styles.fighter__imgMyself, punchedClass === 'me' ? styles['punched-effect'] : '' )}
                        width={180}
                        height={180}
                        priority
                    />
                    <div className={styles['pokemon-area']}></div>
                </div>

                <div style={{display: 'flex', alignItems: 'flex-end', marginBottom: '23px'}}>
                    <div className={styles.fightsData}>
                        <FightsData
                            setDamagePoints={setDamagePoints}
                            setPunchedClass={setPunchedClass}
                            finishedBattle={lifePoints.opponent >= 100 || lifePoints.me >= 100}
                            attack={attack}
                            character={fighter.pokemon}
                            player='me'
                            lifePoints={lifePoints}
                        />

                        <Bar
                            setLifePoints={setLifePoints}
                            damagePoints={damagePoints}
                            player='me'
                            setGameOver={setGameOver}
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