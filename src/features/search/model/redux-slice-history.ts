import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "app/redux-store";
import { useDispatch } from "react-redux";

export type HistoryDataEntry = {
  searchQuery: string;
  timestamp: string;
  resultCount: number;
};

type AllUsersSearchHistory = {
  [userId: string]: HistoryDataEntry[];
};

type AddHistoryItemPayload = {
  userId: string;
  searchQuery: string;
  resultCount: number;
};

const initialState: AllUsersSearchHistory = {};

const getLastElement = (arr: Array<HistoryDataEntry>) =>
  arr.length > 0 ? arr[arr.length - 1] : null;

const historySlice = createSlice({
  name: "searchHistory",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<AddHistoryItemPayload>) => {
      const { userId, searchQuery, resultCount } = action.payload;
      if (!state[userId]) state[userId] = [];

      // Do not add history item if the previous searchQuery was the same
      const lastHistoryEntry = getLastElement(state[userId]);
      if (lastHistoryEntry?.searchQuery === searchQuery) return;

      const newHistoryDataEntry = {
        searchQuery,
        timestamp: new Date().toISOString(),
        resultCount,
      };
      state[userId].push(newHistoryDataEntry);
    },

    eraseAllData: () => initialState, // For debugging only
  },
});

const { addItem } = historySlice.actions;

export const selectSearchHistory = (state: RootState) => state.searchHistory;

export const useReduxSearchHistoryActions = () => {
  const dispatch = useDispatch();

  const addSearchHistoryItem = (
    userId: string,
    searchQuery: string,
    resultCount: number
  ) => {
    dispatch(addItem({ userId, searchQuery, resultCount }));
  };

  return { addSearchHistoryItem };
};

export const historyReducer = historySlice.reducer;
