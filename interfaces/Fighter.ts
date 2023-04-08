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

interface BattleStats {
    abandoned: number,
    battles: number,
    lost: number,
    points: number,
    rate: number,
    spotted: string[],
    survivor: number,
    won: number,
}

export interface BattleDataStats {
    battlesData: BattleStats
}