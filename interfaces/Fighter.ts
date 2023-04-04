export interface Fighter {
    setHit: any,
    punched: any,
    turn: any,
    opponentDamage: any,
    attack: number,
    hisTurn: boolean,
    finish: string,
    skills: string[],
    opponent: boolean | undefined,
}

export interface LifePoints {
    opponent: number;
    player: number;
}

export interface Moves {
    opponent: string[];
    player: string[];
}

export interface PokemonFighter {
    front_default: string,
    name: string,
    stats: any[],
    moves: any[],
}

export interface BattleStats {
    abandoned: number,
    battles: number,
    lost: number,
    points: number,
    rate: number,
    spotted: number,
    survivor: number,
    won: number,
}