import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "entities/user";
import { historyReducer } from "features/search";
import { favoritesReducer } from "features/favorites";
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
const persistedFavoritesReducer = persistReducer(
  { key: "favorites", storage },
  favoritesReducer
);

export const store = configureStore({
  reducer: {
    users: persistedUsersReducer,
    searchHistory: persistedSearchHistoryReducer,
    favorites: persistedFavoritesReducer,
    [dndMonsterApi.reducerPath]: dndMonsterApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
        // ignoredActionPaths: ["meta.arg", "payload.timestamp"],
        // ignoredPaths: ["items.dates"],
      },
    }).concat(dndMonsterApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
