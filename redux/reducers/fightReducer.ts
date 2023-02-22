import { Action } from '../actions'
import { ActionType } from '../types'

interface FighterState {
    pokemon: string
}

const INITIAL_STATE = {pokemon: ''};

export const fightReducer = (state = INITIAL_STATE, action: Action): FighterState => {
    switch (action.type) {
        case ActionType.I_CHOOSE_YOU:
            return {...state, pokemon: action.payload};

        default:
            return state;
    }
};