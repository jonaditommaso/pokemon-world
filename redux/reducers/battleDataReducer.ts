import { Action } from '../actions'
import { ActionType } from '../types'

const INITIAL_STATE = {
    battles: 0,
    won: 0,
    lost: 0,
    rate: 0,
    abandoned: 0,
    points: 0,
    spotted: 0,
    survivor: 0
};

export const battleDataReducer = (state = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        // case ActionType.THERE_IS_BATTLE:
        //     return {...state, pokemon: true};

        // case ActionType.NO_BATTLE:
        //     return {...state, pokemon: false};

        default:
            return state;
    }
};