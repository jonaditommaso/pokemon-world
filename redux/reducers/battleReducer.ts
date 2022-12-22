import { ActionType } from '../types'
import { Action } from '../actions'

const INITIAL_STATE = {pokemon: null};

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