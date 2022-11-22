import { ActionType } from "../types";

interface PauseAction {
    type: ActionType.PAUSE_MUSIC,
    // payload: boolean
}

interface PlayAction {
    type: ActionType.PLAY_MUSIC,
    // payload: boolean
}

interface SignIn {
    type: ActionType.SIGN_IN,
    payload: any
}

interface SignOut {
    type: ActionType.SIGN_OUT,
}

interface AddToRanking {
    type: ActionType.ADD_POKEMON_RANKING,
    payload: any
}

interface RemoveToRanking {
    type: ActionType.REMOVE_POKEMON_RANKING,
    payload: any
}

interface ChangeReview {
    type: ActionType.CHANGE_REVIEW,
    payload: any
}

export type Action = PauseAction | PlayAction | SignIn | SignOut | AddToRanking | RemoveToRanking | ChangeReview

// interface MusicAction {
//     type: ActionType.PAUSE_MUSIC
// }

// interface MusicAction {
//     type: ActionType.PAUSE_MUSIC
// }