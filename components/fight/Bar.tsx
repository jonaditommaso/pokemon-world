import React, { useCallback, useEffect, useState } from 'react';

import { LinearProgress } from '@mui/material';

// import { barStyles } from './barStyles';
import { BarSettings } from '../../interfaces/BarSettings';
import { LifePoints } from '../../interfaces/Fighter';

export default function Bar ({
  hit,
  setHit,
  setGameOver,
  fighter,
  changeLife,
  damage,
  opponentsTurn,
}: BarSettings) {

  const [damageCount, setDamageCount] = useState(0);

  const notPassTheLine = (result: number) => {
    if(result >= 100) {
      return 100
    }
    return result
  }

  const changeDamage = useCallback((damagePoints: number) => {

    let barRise = [0];
    barRise.push(damagePoints);
    const result = barRise.reduce((plus, value) => value + plus, damageCount);
    setDamageCount(notPassTheLine(result));
    setHit(false);
  }, [opponentsTurn]);

  useEffect(() => {
    if(hit && opponentsTurn && fighter === 'opponent') {
      changeDamage(damage * 1.5)
    }

    if(hit && opponentsTurn === false && fighter === 'player') {
      changeDamage(damage * ((Math.random() / 3 )))
    }

  }, [hit])

  useEffect(() => {

    if(damageCount >= 100 ) {
      setTimeout(() => {
        setGameOver('fighter__win');
      }, 500);

      changeLife((prevLifePoints: LifePoints) => ({
        ...prevLifePoints,
        [fighter]: damageCount
      }));
    }
  }, [damage, hit, damageCount, fighter, opponentsTurn]);


  return (
    <div>
      <LinearProgress variant="determinate" value={damageCount}/>
    </div>
  );
}