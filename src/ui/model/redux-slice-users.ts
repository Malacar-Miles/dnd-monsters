import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./redux-store";
import type { User, UserDataStorage } from "./data";
import { blankUser } from "./data";

type UsersState = {
  allUsers: UserDataStorage;
  currentUser: string | null;
};

const initialState: UsersState = {
  allUsers: {},
  currentUser: null,
};

type NewUserCredentials = {
  name: string;
  password: string;
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    create: (state, action: PayloadAction<NewUserCredentials>) => {
      const newUserCredentials = action.payload;
      const userId = newUserCredentials.name.toLowerCase();
      if (state.allUsers[userId])
        throw new Error(
          `Attempting to create user "${userId}" that already exists.`
        );
      const newUser: User = { ...blankUser, ...newUserCredentials };
      state.allUsers[userId] = newUser;
    },

    signIn: (state, action: PayloadAction<string>) => {
      const userName = action.payload;
      const userId = userName.toLowerCase();
      if (!state.allUsers[userId]) throw new Error(
        `Attempting to log in as a user "${userId}" that doesn't exist.`
      );
      state.currentUser = userId;
    },

    signOut: (state) => {
      state.currentUser = null;
    },

    eraseAllData: () => initialState,
  },
});

export const { create, signIn, signOut, eraseAllData } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
