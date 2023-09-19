export interface Fighter {
    attack?: number,
    finish?: string,
    hisTurn?: boolean | undefined,
    player: 'opponent' | 'player',
    opponentDamage?: React.Dispatch<React.SetStateAction<number>>,
    punched?: React.Dispatch<React.SetStateAction<string>>,
    setHit: React.Dispatch<React.SetStateAction<boolean>>,
    turn?: React.Dispatch<React.SetStateAction<boolean | undefined>>,
    character: any,
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