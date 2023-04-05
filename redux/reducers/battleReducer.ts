import { Action } from '../actions'
import { ActionType } from '../types'

const INITIAL_STATE = {pokemon: false};

export const battleReducer = (state = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case ActionType.THERE_IS_BATTLE:
            return {...state, pokemon: true};

        case ActionType.NO_BATTLE:
            return {...state, pokemon: false};

        default:
            return state;
    }
};