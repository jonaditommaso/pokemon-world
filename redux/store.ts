import { configureStore } from "@reduxjs/toolkit";

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
    }
});

export type RootState = ReturnType<typeof store.getState>;