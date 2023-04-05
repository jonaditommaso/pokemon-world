import { configureStore } from "@reduxjs/toolkit";

import { battleDataReducer } from "./reducers/battleDataReducer";
import { battleModeReducer } from "./reducers/battleModeReducer";
import { battleReducer } from "./reducers/battleReducer";
import { fightReducer } from "./reducers/fightReducer";
import { loginReducer } from "./reducers/loginReducer";
import { musicReducer } from "./reducers/musicReducer";
import { rankingReducer } from "./reducers/rankingReducer";

export const store = configureStore({
    reducer: {
        music: musicReducer,
        login: loginReducer,
        ranking: rankingReducer,
        fight: fightReducer,
        battle: battleReducer,
        battlesData: battleDataReducer,
        battleMode: battleModeReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;