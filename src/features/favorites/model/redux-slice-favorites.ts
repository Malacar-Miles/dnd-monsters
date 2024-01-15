import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "app/redux-store";
import { useDispatch } from "react-redux";

type entityId = string;

type FavoritesStorage = {
  [entityType: string]: entityId[];
};

export type AllUsersFavorites = {
  [userId: string]: FavoritesStorage;
};

type FavoritesActionPayload = {
  userId: string;
  entityType: string;
  entityId: string;
};

const initialState: AllUsersFavorites = {};

export const isEntityInFavorites = (
  state: AllUsersFavorites,
  payload: FavoritesActionPayload
) => {
  const { userId, entityType, entityId } = payload;
  return Boolean(state?.[userId]?.[entityType]?.includes(entityId));
};

const addEntityToFavorites = (
  state: AllUsersFavorites,
  payload: FavoritesActionPayload
) => {
  const { userId, entityType, entityId } = payload;
  if (!state[userId]) state[userId] = {};
  if (!state[userId][entityType]) state[userId][entityType] = [];
  state[userId][entityType].push(entityId);
};

const removeEntityFromFavorites = (
  state: AllUsersFavorites,
  payload: FavoritesActionPayload
) => {
  const { userId, entityType, entityId } = payload;
  state[userId][entityType] = state[userId][entityType].filter(
    (item) => item !== entityId
  );
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<FavoritesActionPayload>) => {
      if (!isEntityInFavorites(state, action.payload))
        addEntityToFavorites(state, action.payload);
    },

    removeItem: (state, action: PayloadAction<FavoritesActionPayload>) => {
      if (isEntityInFavorites(state, action.payload))
        removeEntityFromFavorites(state, action.payload);
    },

    toggleItem: (state, action: PayloadAction<FavoritesActionPayload>) => {
      if (isEntityInFavorites(state, action.payload))
        removeEntityFromFavorites(state, action.payload);
      else addEntityToFavorites(state, action.payload);
    },

    eraseAllData: () => initialState, // For debugging only
  },
});

const { addItem, removeItem, toggleItem } = favoritesSlice.actions;

export const selectFavorites = (state: RootState) => state.favorites;

export const useReduxFavorites = () => {
  const dispatch = useDispatch();

  const addFavoritesItem = (
    userId: string,
    entityType: string,
    entityId: string
  ) => {
    dispatch(addItem({ userId, entityType, entityId }));
  };

  const removeFavoritesItem = (
    userId: string,
    entityType: string,
    entityId: string
  ) => {
    dispatch(removeItem({ userId, entityType, entityId }));
  };

  const toggleFavoritesItem = (
    userId: string,
    entityType: string,
    entityId: string
  ) => {
    dispatch(toggleItem({ userId, entityType, entityId }));
  };

  return { addFavoritesItem, removeFavoritesItem, toggleFavoritesItem };
};

export const favoritesReducer = favoritesSlice.reducer;
