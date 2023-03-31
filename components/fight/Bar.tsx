import React, { useCallback, useEffect, useState } from 'react';

import { LinearProgress } from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles'

import { BarSettings } from '../../interfaces/BarSettings';
import { LifePoints } from '../../interfaces/Fighter';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 7,
    borderRadius: 10,
    width: '18rem',
    margin: 'auto',
    marginTop: 4,
  },
  colorPrimary: {
    backgroundColor: '#00ff70'
  },
  bar: {
    borderRadius: 0,
    backgroundColor: 'red'
  },
}))(LinearProgress);

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
});

export default function Bar ({
  hit,
  setHit,
  setGameOver,
  fighter,
  changeLife,
  damage,
  opponentsTurn,
}: BarSettings) {

  const classes = useStyles();

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
      changeDamage(damage)
    }

    if(hit && opponentsTurn === false && fighter === 'player') {
      changeDamage(damage * ((Math.random() / 5 )))
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
    <div className={classes.root}>
      <BorderLinearProgress variant="determinate" value={damageCount}/>
    </div>
  );
}