import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./redux-store";
import type { User, UserDataStorage } from "./data";
import { blankUser } from "./data";
import { useDispatch } from "react-redux";

type UsersState = {
  allUsers: UserDataStorage;
  currentUserId: string | null;
};

const initialState: UsersState = {
  allUsers: {},
  currentUserId: null,
};

type UserCredentials = {
  name: string;
  password: string;
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    create: (state, action: PayloadAction<UserCredentials>) => {
      const newUserCredentials = action.payload;
      const userId = newUserCredentials.name.toLowerCase();
      if (state.allUsers[userId])
        // Placeholder implementation
        throw new Error(
          `Attempting to create user "${userId}" that already exists.`
        );
      const newUser: User = { ...blankUser, ...newUserCredentials };
      state.allUsers[userId] = newUser;
    },

    signIn: (state, action: PayloadAction<UserCredentials>) => {
      const { name, password } = action.payload;
      const userId = name.toLowerCase();
      if (!state.allUsers[userId])
        // Placeholder implementation
        throw new Error(
          `Attempting to log in as a user "${userId}" that doesn't exist.`
        );
      if (state.allUsers[userId].password !== password)
        // Placeholder implementation
        throw new Error(
          `Incorrect password. Expected "${state.allUsers[userId].password}", got "${password}"`
        );
      state.currentUserId = userId;
    },

    signOut: (state) => {
      state.currentUserId = null;
    },

    eraseAllData: () => initialState, // For debugging only
  },
});

export const { create, signIn, signOut, eraseAllData } = usersSlice.actions;

export const selectUserData = (state: RootState) => state.users;

export const useReduxUserActions = () => {
  const dispatch = useDispatch();

  const createUser = (name: string, password: string) => {
    dispatch(create({ name, password }));
  };

  const signInUser = (name: string, password: string) => {
    dispatch(signIn({ name, password }));
  };

  const signOutUser = () => {
    dispatch(signOut());
  };

  return { createUser, signInUser, signOutUser };
};

export default usersSlice.reducer;
