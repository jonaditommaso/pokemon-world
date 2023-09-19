import React, { useEffect } from 'react';

import { Button } from '@mui/material';

import { Fighter, Moves, PokemonFighter } from '../../interfaces/Fighter';
import styles from '../fight/fight.module.css';

type AttackCount = {
    [key: number]: number;
};

function FightsData({ player, opponentDamage, punched, finish, turn, hisTurn, setHit, attack, character }: Fighter) {

    const [changeTurn, setChangeTurn] = React.useState(false);
    const [attacksAvailable, setAttacksAvailable] = React.useState<AttackCount>({
        1: 10,
        2: 7,
        3: 5,
        4: 3
    });

    const getSkills = (character: PokemonFighter) => {
        let moves: Moves = {
            opponent: [],
            player: [],
        }

        const numberOfMoves = character.moves.length;
        const movesRange = numberOfMoves >= 20 ? character.moves.slice(16, 20) : character.moves.slice(0, 4);

        movesRange.forEach((move) => {
            moves[player].push(move.move.name);
        });

        return moves[player];
    }

    const skills = getSkills(character);

    useEffect(() => {
        if(hisTurn) {
            setChangeTurn(true);
        }
        if(!hisTurn) {
            setChangeTurn(false);
        }
    }, [changeTurn, hisTurn]);

    const colorButton = (i: number) => {
        const colorMap: { [key: number]: 'success' | 'primary' | 'warning' | 'error' } = {
            0: 'success',
            1: 'primary',
            2: 'warning',
            3: 'error',
        };
        return colorMap[i];
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

        const damageMultiplier = [0.05, 0.1, 0.12, 0.17][i];

        setAttacksAvailable((prevState) => ({
            ...prevState,
            [i + 1]: prevState[i + 1] - 1,
        }));
        setHit(true);
        opponentDamage(attack! * (damageMultiplier * 2)); // sacar el x2 cuando ponga el hp
        punched('fighter');
        notMyTurn();
        setTimeout(() => {
            punched('');
        }, 800);
    }

    const disableButtons = (index: number) => {
        if(player === 'opponent' || finish === 'fighter__win' || changeTurn || attacksAvailable[index] === 0) {
            return true
        }
        return false
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div className={styles.dataButtons}>
                {skills?.map((skill, i) => (
                    <div key={i} style={{margin: '3px'}}>
                        <Button
                            size="small"
                            variant='contained'
                            color={colorButton(i)}
                            style={{width: '10rem', justifyContent: player === 'player' ? 'space-between' : ''}}
                            disabled={disableButtons(i + 1)}
                            onClick={() => damagePoints(i)}
                        >
                            {skill.toUpperCase()}
                            {player === 'player' && <span>{attacksAvailable[i + 1]}</span>}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FightsData;
