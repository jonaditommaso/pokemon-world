import { Action } from "../actions";
import { ActionType } from "../types";
import { Dispatch } from 'redux';

export const playMusic = () => {
    return (dispatch: Dispatch <Action>) => {
        dispatch({
            type: ActionType.PLAY_MUSIC
        })
    }
}

export const pauseMusic = () => {
    return (dispatch: Dispatch <Action>) => {
        dispatch({
            type: ActionType.PAUSE_MUSIC
        })
    }
}

export const signIn = (user: any) => {
    return (dispatch: Dispatch <Action>) => {
        dispatch({
            type: ActionType.SIGN_IN,
            payload: user
        })
    }
}

export const signOut = () => {
    return (dispatch: Dispatch <Action>) => {
        dispatch({
            type: ActionType.SIGN_OUT,
        })
    }
}