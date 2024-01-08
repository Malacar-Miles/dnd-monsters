import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "entities/user";
import { historyReducer } from "features/search";
import { dndMonsterApi } from "entities/monster";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistedUsersReducer = persistReducer(
  { key: "users", storage },
  usersReducer
);
const persistedSearchHistoryReducer = persistReducer(
  { key: "history", storage },
  historyReducer
);

export const store = configureStore({
  reducer: {
    users: persistedUsersReducer,
    searchHistory: persistedSearchHistoryReducer,
    [dndMonsterApi.reducerPath]: dndMonsterApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dndMonsterApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
