import React, { useEffect, useState } from 'react';

import { LinearProgress } from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles'

import { BarSettings } from '../../interfaces/BarSettings';

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
  damage,
  wins,
  hisAccumulate,
  hit,
  setHit,
  hp,
  punchMe,
  me,
  he,
  myAccumulate,
  damageMe,
  winner
}: BarSettings) {

  const classes = useStyles();

  const [acumulador, setAcumulador] = useState(0);
  const [damageToMe, setDamageToMe] = useState(0);

  const notPassTheLine = (result: number) => {
    if(result >= 100) {
      return 100
    }
    return result
  }

  useEffect(() => {

    if(hit) {
      let barRise = [0];
      barRise.push(damage);

      const result = (barRise.reduce((plus, value) => value + plus, acumulador));

      setAcumulador(notPassTheLine(result));

      setHit(false);
    }

    if(hp) {
      if(acumulador >= 100 ) {
        setTimeout(() => {
          wins('fighter__win');
        }, 500);
        hisAccumulate(acumulador);
      }
    }
  }, [damage, hit, acumulador]);


  useEffect(() => {
    let barRise = [0];
    barRise.push(damageMe * ((Math.random() / 5 ) * 2.5));
    const result = (barRise.reduce((plus, value) => value + plus, damageToMe));

    const iWinOrNot = () => {
      if(winner){
      }
      else {
        setDamageToMe(notPassTheLine(result));
      }
    }

    if(me && punchMe) {
      setTimeout(() => {
        iWinOrNot()
      }, 5000);
    }

    if(me) {
      if(damageToMe >= 100 ) {
        setTimeout(() => {
          wins('fighter__win');
        }, 500);
        myAccumulate(damageToMe);
      }
    };
  }, [punchMe, winner]);


  return (
    <div className={classes.root}>
      <BorderLinearProgress variant="determinate" value={he ? acumulador : damageToMe}/>
    </div>
  );
}