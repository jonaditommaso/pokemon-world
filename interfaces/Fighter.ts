import { DamagePoints } from "./DamagePoints";

export interface Fighter {
    attack?: Attack,
    finishedBattle?: boolean,
    player: 'opponent' | 'me',
    setDamagePoints?: React.Dispatch<React.SetStateAction<DamagePoints>>,
    character: any,
    setPunchedClass?:any,
    lifePoints?: any
}

export interface LifePoints {
    opponent: number;
    me: number;
}

export interface Moves {
    opponent: string[];
    me: string[];
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

interface Attack {
    me: number,
    opponent: number
}