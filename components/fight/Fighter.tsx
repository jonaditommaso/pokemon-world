import React, { useState, useEffect, useRef, useMemo } from 'react';

import { Button } from '@mui/material';
import clsx from 'clsx';
import get from 'lodash/get';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import TypewriterComponent from 'typewriter-effect';

import Bar from './Bar';
import styles from './fight.module.css';
import FightsData from './FightsData';
import FinalMessage from './FinalMessage';
import { getSkills } from './getSkills';
import { OPONENT_DATA } from '../../constants';
import pokeapi from '../../helpers/pokeapi';
import { useActions } from '../../hooks/useActions';
import { DamagePoints } from '../../interfaces/DamagePoints';
import { LifePoints } from '../../interfaces/Fighter';
import { RootState } from '../../redux';
import { musicBattlePause, noBattle, noBattleMode, thereBattle } from '../../redux/action-creators';
import { battleData } from '../../redux/action-creators/index';
import { abandonBattleMessage } from '../../utils/abandonBattleMessage';
import { extractedData } from '../../utils/extractedData';


const Fighter = ({ fighter, opponentData, battlesData, battleMode }: any) => {

    const { thereBattle, battleData, noBattleMode } = useActions();

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

    const [opponentPrompt, setOpponentPrompt] = useState <string>(`Wild ${opponentData.name.toUpperCase()} appeared!`);
    const [myPrompt, setMyPrompt] = useState <string>(`Go ${fighter.pokemon.name.toUpperCase()}!`)

    const router = useRouter();
    const setting = useRef(false);

    const pokemonMoves = getSkills(opponentData, 'opponent')
    const pokemonType = opponentData?.types[0]?.type?.name || "";
    const pokedexDescription = `${opponentData.name.toUpperCase()} is a ${pokemonType} type pokemon and his favorite move is ${pokemonMoves[0].toUpperCase()}`

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

    const handleRun = () => {
        abandonBattleMessage(() => {
            noBattle(false);
            router.push('/search');
            noBattleMode()
            musicBattlePause();
        });
    }

    const handlePokedex = () => {
        setOpponentPrompt(pokedexDescription)
        const listen = () => {
            const utterance = new SpeechSynthesisUtterance(pokedexDescription);
            utterance.lang = "en-US";
            speechSynthesis.speak(utterance);
          };
          listen();
    }

    if(!fighter.pokemon || !opponentData) return null;

    return (
        <div>

            {/* OPPONENT */}
            <div className={styles.fighter__opponent} style={{ gap: '10px' }}>
                <div className={styles.fightsData} style={{ width: '500px', padding: 10, fontFamily: 'monospace', fontWeight: 'bold', fontSize: '1.3rem' }}>
                    <TypewriterComponent
                        key={opponentPrompt}
                        onInit={tw => {
                            tw.typeString(opponentPrompt)
                            .start()
                        }}

                        options={{
                            delay: 50,
                            cursor: ''
                        }}
                    />
                </div>
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

                <div style={{display: 'flex', alignItems: 'flex-end', marginBottom: '23px', gap: '10px'}}>
                    <div className={styles.fightsData}>
                        <FightsData
                            setDamagePoints={setDamagePoints}
                            setPunchedClass={setPunchedClass}
                            finishedBattle={lifePoints.opponent >= 100 || lifePoints.me >= 100}
                            attack={attack}
                            character={fighter.pokemon}
                            opponentName={opponentData.name}
                            player='me'
                            lifePoints={lifePoints}
                            setMyPrompt={setMyPrompt}
                            opponentMoves={pokemonMoves}
                            setOpponentPrompt={setOpponentPrompt}
                        />

                        <Bar
                            setLifePoints={setLifePoints}
                            damagePoints={damagePoints}
                            player='me'
                            setGameOver={setGameOver}
                        />
                    </div>
                    <div className={styles.fightsData} style={{ width: '400px' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center', marginTop: '10px' }}>
                            <Button variant='outlined' onClick={handlePokedex}>POKEDEX</Button>
                            {/* <Button>BAG</Button> */}
                            {/* <Button variant='outlined' >POKEMON</Button> */}
                            <Button variant='outlined' onClick={handleRun}>RUN</Button>
                        </div>
                        <hr style={{ width: '70%', margin: 'auto', background: '#212121' }} />
                        <div style={{ paddingLeft: '10px', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '1.3rem' }}>
                            <TypewriterComponent
                                key={myPrompt}
                                onInit={tw => {
                                    tw.typeString(myPrompt)
                                    .start()
                                }}

                                options={{
                                    delay: 50,
                                    cursor: ''
                                }}
                            />
                        </div>
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

export default connect(mapStateToProps, { thereBattle, battleData, noBattleMode })(Fighter);

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