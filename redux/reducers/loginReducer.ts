import { Action } from '../actions'
import { ActionType } from '../types'

interface LoginState {
    user: string | boolean,
}

const INITIAL_STATE = {user: false};

export const loginReducer = (state: LoginState = INITIAL_STATE, action: Action): LoginState => {

    switch (action.type) {
        case ActionType.SIGN_IN:
            return {...state, user: action.payload};

        case ActionType.SIGN_OUT:
            return {...state, user: false};

        default:
            return state;
    }
};