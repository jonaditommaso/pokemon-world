import { Action } from '../actions'
import { ActionType } from '../types'

const INITIAL_STATE = {pokemonRanked: []};

export const rankingReducer = (state = INITIAL_STATE, action: Action): any => {
    switch (action.type) {
        case ActionType.ADD_POKEMON_RANKING:
            return {...state, pokemonRanked: [...state.pokemonRanked, action.payload]};

        case ActionType.REMOVE_POKEMON_RANKING:
            let newRanking = [...state.pokemonRanked]

            const index = state.pokemonRanked.findIndex((pokemonIndex: any) => pokemonIndex.pokemon === action.payload);
            if(index >= 0) {
                newRanking.splice(index, 1)
            }
            else {
                console.warn(`Can't remove (pokemon: ${action.payload}) as its not in ranking!`)
            }

            return { ...state, pokemonRanked: newRanking }

        case ActionType.CHANGE_REVIEW:
            let changeRanking = [...state.pokemonRanked]
            const indexToModify:number = state.pokemonRanked.findIndex((pokemonIndex: any) => pokemonIndex.pokemon === action.payload.pokemon);
            if(indexToModify >=0) {
                changeRanking.splice(indexToModify, 1, action.payload)
            }
            return { ...state, pokemonRanked: changeRanking }

        case ActionType.INITIAL_DB_RANKING:
            return {...state, pokemonRanked: action.payload}

        default:
            return state;
    }
};