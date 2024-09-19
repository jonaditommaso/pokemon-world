import React, { useMemo } from 'react';

import { Button } from '@mui/material';

import { defineSkillColorButton } from './defineColorButton';
import { getSkills } from './getSkills';
import { Fighter } from '../../interfaces/Fighter';
import styles from '../fight/fight.module.css';

type AttackCount = {
    [key: number]: number;
};

function FightsData({ setPunchedClass, lifePoints, player, setDamagePoints, finishedBattle, attack, character }: Fighter) {

    const [buttonsDisabled, setButtonsDisabled] = React.useState<boolean>(false);
    const [attacksAvailable, setAttacksAvailable] = React.useState<AttackCount>({
        1: 10,
        2: 5,
        3: 3,
        4: 1
    });

    const skills = useMemo(() => getSkills(character, player), [character, player]);

    const calculateDamagePoints = (i: number) => {
        setButtonsDisabled(true);

        const damageMultiplier = [0.05, 0.1, 0.12, 0.17][i];

        setAttacksAvailable((prevState) => ({ // rest attack number
            ...prevState,
            [i + 1]: prevState[i + 1] - 1,
        }));

        setDamagePoints!(prevDamagePoints => ({
            ...prevDamagePoints,
            me: 0,
            opponent: attack!.me * (damageMultiplier * 2) // sacar el x2 cuando ponga el hp // pass points of damage to Bar
        }))

        setPunchedClass('opponent'); // set new class to opponent shaking

        setTimeout(() => { // after 800 ms, set new class to restore opponent state
            setPunchedClass('');
        }, 800);

        setTimeout(() => { // opponent punch to me
            if(lifePoints.opponent === 100) {
                setPunchedClass('');
            }
            else {
                setPunchedClass('me');
            }
        }, 4000);

        setTimeout(() => { // restore me
            setPunchedClass('');
            setButtonsDisabled(false);
            setDamagePoints!(prevDamagePoints => ({
                ...prevDamagePoints,
                me: attack!.opponent,
                opponent: 0
            }));
        }, 4800);
    }

    const disableButtons = (index: number) => (
        player === 'opponent'
        || finishedBattle
        || attacksAvailable[index] === 0
        || buttonsDisabled
    )

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div className={styles.dataButtons}>
                {skills?.map((skill, i) => (
                    <div key={i} style={{margin: '3px'}}>
                        <Button
                            size="small"
                            variant='contained'
                            color={defineSkillColorButton(i)}
                            style={{width: '10rem', justifyContent: player === 'me' ? 'space-between' : ''}}
                            disabled={disableButtons(i + 1)}
                            onClick={() => calculateDamagePoints(i)}
                        >
                            {skill.toUpperCase()}
                            {player === 'me' && <span>{attacksAvailable[i + 1]}</span>}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FightsData;
