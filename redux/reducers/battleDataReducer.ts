import { BattleDataStats } from '../../interfaces/Fighter';
import { Action } from '../actions'
import { ActionType } from '../types'

const INITIAL_STATE: BattleDataStats = {
    battlesData: {
        abandoned: 0,
        battles: 0,
        lost: 0,
        points: 0,
        rate: 0,
        spotted: [],
        survivor: 0,
        won: 0,
    }
};

export const battleDataReducer = (state = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case ActionType.BATTLE_DATA:
            return {...state, battlesData: action.payload};

        default:
            return state;
    }
};