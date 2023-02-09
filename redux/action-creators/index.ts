import { Action } from "../actions";
import { ActionType } from "../types";
import { Dispatch } from 'redux';
import { RankingStructure } from "../../interfaces/RankingStructure";

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

export const signIn = (user: string) => {
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

export const fetchPokeRanking = (document: RankingStructure[]) => {
    return {
        type: ActionType.INITIAL_DB_RANKING,
        payload: document
    }
}

export const addPokeToRanking = (pokemon:string, type:string[], ranking:number) => {
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

export const chooseYou = (pokemon: any) => {
    return {
        type: ActionType.I_CHOOSE_YOU,
        payload: pokemon
    }
}

export const thereBattle = (pokemon: boolean)=> {
    return {
        type: ActionType.THERE_IS_BATTLE,
        payload: pokemon
    }
};

export const noBattle = (pokemon: boolean)=> {
    return {
        type: ActionType.NO_BATTLE,
        payload: pokemon
    }
};

export const musicBattle = () => {
    return {
        type: ActionType.PLAY_MUSIC_BATTLE
    }
}

export const musicBattlePause = () => {
    return {
        type: ActionType.PAUSE_MUSIC_BATTLE
    }
}