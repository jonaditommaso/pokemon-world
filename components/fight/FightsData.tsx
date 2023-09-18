import React, { useEffect } from 'react';

import { Button } from '@mui/material';

import { Fighter } from '../../interfaces/Fighter';
import styles from '../fight/fight.module.css';

type AttackCount = {
    [key: number]: number;
  };

function FightsData({ skills, opponent, opponentDamage, punched, finish, turn, hisTurn, setHit, attack }: Fighter) {

    const [changeTurn, setChangeTurn] = React.useState(false);
    const [attacksAvailable, setAttacksAvailable] = React.useState<AttackCount>({
        1: 10,
        2: 7,
        3: 5,
        4: 3
    });

    useEffect(() => {
        if(hisTurn) {
            setChangeTurn(true);
        }
        if(!hisTurn) {
            setChangeTurn(false);
        }
    }, [changeTurn, hisTurn]);

    const colorButton = (i: number) => {
        switch (i) {
            case 0:
                return 'success';
            case 1:
                return 'primary';
            case 2:
                return 'warning';
            case 3:
                return 'error';

            default:
                break;
        }
    }

    const notMyTurn = () => {
        if(!turn) return;
        if (!hisTurn) {
            turn(true);
        }
        return
    };

    const damagePoints = (i: number) => {
        if(!opponentDamage || !punched) return;
        switch (i) {
            case 0:
                setAttacksAvailable((prevState) => ({
                    ...prevState,
                    [i + 1]: prevState[i + 1] - 1
                  }));
                setHit(true);
                opponentDamage(attack! * (0.05 * 2)); // sacar el x2 cuando ponga el hp
                punched('fighter');
                notMyTurn();
                setTimeout(() => {
                    punched('');
                }, 800);
                break;
            case 1:
                setAttacksAvailable((prevState) => ({
                    ...prevState,
                    [i + 1]: prevState[i + 1] - 1
                  }));
                setHit(true);
                opponentDamage(attack! * (0.1 * 2));
                punched('fighter');
                notMyTurn();
                setTimeout(() => {
                    punched('');
                }, 800);
                break;
            case 2:
                setAttacksAvailable((prevState) => ({
                    ...prevState,
                    [i + 1]: prevState[i + 1] - 1
                  }));
                setHit(true);
                opponentDamage(attack! * (0.12 * 2));
                punched('fighter');
                notMyTurn();
                setTimeout(() => {
                    punched('');
                }, 800);
                break;
            case 3:
                setAttacksAvailable((prevState) => ({
                    ...prevState,
                    [i + 1]: prevState[i + 1] - 1
                  }));
                setHit(true);
                opponentDamage(attack! * (0.17 * 2));
                punched('fighter');
                notMyTurn();
                setTimeout(() => {
                    punched('');
                }, 800);
                break;

            default:
                break;
        }
    }

    const disableButtons = (index: number) => {
        if(opponent || (finish === 'fighter__win') || changeTurn || attacksAvailable[index] === 0) {
            return true
        }
        return false
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div className={styles.dataButtons}>
                {skills
                ? skills?.map((skill, i) => (
                    <div key={i} style={{margin: '3px'}}>
                        <Button
                            size="small"
                            variant='contained'
                            color={colorButton(i)}
                            style={{width: '10rem', justifyContent: !opponent ? 'space-between' : ''}}
                            disabled={disableButtons(i + 1)}
                            onClick={() => damagePoints(i)}
                        >
                            {skill.toUpperCase()}
                            {!opponent && <span>{attacksAvailable[i + 1]}</span>}
                        </Button>
                    </div>
                ))
                : <></>
                }
            </div>
        </div>
    );
}

export default FightsData;
