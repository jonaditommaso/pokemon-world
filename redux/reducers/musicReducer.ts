import { ActionType } from '../types'
import { Action } from '../actions'
import { MusicState } from '../../interfaces/Music';


const INITIAL_STATE = {volume: false, other: false};

export const musicReducer = (state: MusicState = INITIAL_STATE, action: Action): MusicState => {

    switch (action.type) {
        case ActionType.PLAY_MUSIC:
            return {...state, volume: true};

        case ActionType.PAUSE_MUSIC:
            return {...state, volume: false};

        case ActionType.PLAY_MUSIC_BATTLE:
            return {...state, other: true };

        case ActionType.PAUSE_MUSIC_BATTLE:
            return {...state, other: false };

        default:
            return state;
    }
};