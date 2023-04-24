import { Action } from '../actions'
import { ActionType } from '../types'

interface ModeState {
    mode: undefined | string
}

const INITIAL_STATE = {
    mode: undefined
};

export const battleModeReducer = (state: ModeState = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case ActionType.BATTLE_MODE:
            return {...state, mode: action.payload};

        case ActionType.NO_BATTLE_MODE:
            return {...state, mode: undefined};

        default:
            return state;
    }
};