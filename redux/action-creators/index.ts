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



export const addPokeToRanking = (pokemon:any, type:any, ranking:any) => {
    return {
        type: ActionType.ADD_POKEMON_RANKING,
        payload: {pokemon, type, ranking}
    }
}

export const removePokemonRanking = (pokemon: any) => {
    return {
        type: ActionType.REMOVE_POKEMON_RANKING,
        payload: pokemon
    }
}

export const changeReview = (pokemon:any, type:any, ranking:any) => {
    return {
        type: ActionType.CHANGE_REVIEW,
        payload: {pokemon, type, ranking}
    }
}