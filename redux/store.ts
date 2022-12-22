import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./reducers/loginReducer";
import { musicReducer } from "./reducers/musicReducer";
import { rankingReducer } from "./reducers/rankingReducer";
import { fightReducer } from "./reducers/fightReducer";
import { battleReducer } from "./reducers/battleReducer";

export const store = configureStore({
    reducer: {
        music: musicReducer,
        login: loginReducer,
        ranking: rankingReducer,
        fight: fightReducer,
        battle: battleReducer,
    }
})