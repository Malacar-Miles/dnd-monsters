import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "entities/user";
import { dndMonsterApi } from "entities/monster";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    [dndMonsterApi.reducerPath]: dndMonsterApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dndMonsterApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
