import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { Fighter } from '../../interfaces/Fighter';
import styles from '../fight/fight.module.css';

function FightsData({ skills, opponent, opponentDamage, punched, finish, turn, hisTurn, hit, attack }: Fighter) {

    const [changeTurn, setChangeTurn] = React.useState(false);

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
        if (hisTurn === false) {
            turn(true);
        }
        return
    };

    const damagePoints = (i: number) => {
        switch (i) {
            case 0:
                hit(true);
                opponentDamage(attack * (0.05 * 2)); // sacar el x2 cuando ponga el hp
                punched('fighter');
                notMyTurn();
                setTimeout(() => {
                    punched('');
                }, 800);
                break;
            case 1:
                hit(true);
                opponentDamage(attack * (0.1 * 2));
                punched('fighter');
                notMyTurn();
                setTimeout(() => {
                    punched('');
                }, 800);
                break;
            case 2:
                hit(true);
                opponentDamage(attack * (0.12 * 2));
                punched('fighter');
                notMyTurn();
                setTimeout(() => {
                    punched('');
                }, 800);
                break;
            case 3:
                hit(true);
                opponentDamage(attack * (0.17 * 2));
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

    const disableButtons = () => {
        if(opponent || (finish === 'fighter__win') || changeTurn) {
            return true
        }
        return false
    }

    return (
        <div >
            <div className={styles.dataButtons}>
                {skills
                ? skills?.map((skill, i) => (
                    <div key={i} style={{margin: '3px'}}>
                        <Button
                            size="small"
                            variant='contained'
                            color={colorButton(i)}
                            style={{width: '9rem'}}
                            disabled={disableButtons()}
                            onClick={() => damagePoints(i)}
                        >
                            {skill?.move?.name?.toUpperCase()}
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
