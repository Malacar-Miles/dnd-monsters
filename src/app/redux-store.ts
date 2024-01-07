import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "entities/user";
import { historyReducer } from "features/search";
import { dndMonsterApi } from "entities/monster";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    searchHistory: historyReducer,
    [dndMonsterApi.reducerPath]: dndMonsterApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dndMonsterApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
