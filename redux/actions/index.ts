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

export type Action = PauseAction | PlayAction | SignIn | SignOut

// interface MusicAction {
//     type: ActionType.PAUSE_MUSIC
// }

// interface MusicAction {
//     type: ActionType.PAUSE_MUSIC
// }