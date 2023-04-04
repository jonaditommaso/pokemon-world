import { BattleStats } from "../../interfaces/Fighter";
import { RankingStructure } from "../../interfaces/RankingStructure";
import { ActionType } from "../types";

interface PauseAction {
    type: ActionType.PAUSE_MUSIC,
    // payload: boolean
}

interface PlayAction {
    type: ActionType.PLAY_MUSIC,
    // payload: boolean
}

interface PlayBattleAction {
    type: ActionType.PLAY_MUSIC_BATTLE,
}

interface PauseBattleAction {
    type: ActionType.PAUSE_MUSIC_BATTLE,
}

interface SignIn {
    type: ActionType.SIGN_IN,
    payload: string
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

interface SetInitialRanking {
    type: ActionType.INITIAL_DB_RANKING,
    payload: RankingStructure[]
}

interface Fighter {
    type: ActionType.I_CHOOSE_YOU,
    payload: any
}

interface BattleAction {
    type: ActionType.THERE_IS_BATTLE,
    payload: boolean
}

interface NoBattleAction {
    type: ActionType.NO_BATTLE,
    payload: boolean
}

interface BattleData {
    type: ActionType.BATTLE_DATA,
    payload: BattleStats,
}

interface BattleMode {
    type: ActionType.BATTLE_MODE,
    payload: string,
}

interface NoBattleMode {
    type: ActionType.NO_BATTLE_MODE,
}

export type Action =
    PauseAction
    | PlayAction
    | SignIn
    | SignOut
    | AddToRanking
    | RemoveToRanking
    | ChangeReview
    | SetInitialRanking
    | Fighter
    | PlayBattleAction
    | PauseBattleAction
    | BattleAction
    | NoBattleAction
    | BattleMode
    | NoBattleMode
    | BattleData