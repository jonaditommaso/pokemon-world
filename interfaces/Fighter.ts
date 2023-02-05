interface Moves {
    move: {
        name: string
    }
}

export interface Fighter {
    hit: any,
    punched: any,
    turn: any,
    opponentDamage: any,
    attack: number,
    hisTurn: boolean,
    finish: string,
    skills: Moves[],
    opponent: boolean | undefined
}