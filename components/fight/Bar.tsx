import React, { useCallback, useEffect, useState } from 'react';

import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

import { barStyles } from './barStyles';
import { BarSettings } from '../../interfaces/BarSettings';
import { LifePoints } from '../../interfaces/Fighter';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => (barStyles));

const notPassTheLine = (result: number) => result >= 100 ? 100 : result

export default function Bar ({
  setGameOver,
  player,
  setLifePoints,
  damagePoints,
}: BarSettings) {

  const [damageCount, setDamageCount] = useState(0);

  const changeDamage = useCallback((damage: number) => {
    setDamageCount((prevDamageCount) => {
      let barRise = [0];
      barRise.push(damage);
      const result = barRise.reduce((plus, value) => value + plus, prevDamageCount);
      return notPassTheLine(result);
    });
  }, []);

   useEffect(() => {
    if(player === 'opponent') {
      changeDamage(damagePoints.opponent * 1.5)
    }

    if(player === 'me') {
      changeDamage(damagePoints.me * (Math.random() / 3 ))
    }

  }, [damagePoints, player])

  useEffect(() => {

    if(damageCount >= 100 ) {
      setTimeout(() => {
        setGameOver('fighter__win');
      }, 500);
    }

    setLifePoints((prevLifePoints: LifePoints) => ({
      ...prevLifePoints,
      [player]: damageCount
    }));
  }, [damagePoints, damageCount, player, ]);


  return (
    <div>
      <BorderLinearProgress variant="determinate" value={damageCount} />
    </div>
  );
}