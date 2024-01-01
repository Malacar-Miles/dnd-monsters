import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./redux-store";
import type { User, UserDataStorage } from "./data";
import { blankUser } from "./data";
import { useDispatch } from "react-redux";

type OperationResult = {
  status: "success" | "failure" | "not-attempted";
  message: string;
};

const defaultOperationResult: OperationResult = {
  status: "not-attempted",
  message: "",
};

type UsersState = {
  allUsers: UserDataStorage;
  currentUserId: string | null;
  operationResult: OperationResult;
};

const initialState: UsersState = {
  allUsers: {},
  currentUserId: null,
  operationResult: defaultOperationResult,
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
      if (state.allUsers[userId]) {
        state.operationResult = {
          status: "failure",
          message: `Attempting to create user "${userId}" that already exists.`,
        };
        return;
      }
      const newUser: User = { ...blankUser, ...newUserCredentials };
      state.allUsers[userId] = newUser;
      state.currentUserId = userId;
      state.operationResult = {
        status: "success",
        message: "Successfully signed up and logged in",
      };
    },

    signIn: (state, action: PayloadAction<UserCredentials>) => {
      const { name, password } = action.payload;
      const userId = name.trim().toLowerCase();
      if (!state.allUsers[userId]) {
        state.operationResult = {
          status: "failure",
          message: `User "${name.trim()}" doesn't exist.`,
        };
        return;
      }
      if (state.allUsers[userId].password !== password) {
        state.operationResult = {
          status: "failure",
          message: `Incorrect password for user "${userId}"`,
        };
        return;
      }
      state.currentUserId = userId;
      state.operationResult = {
        status: "success",
        message: "Successfully logged in",
      };
    },

    signOut: (state) => {
      state.currentUserId = null;
    },

    resetOperationResult: (state) => {
      state.operationResult = defaultOperationResult;
    },

    eraseAllData: () => initialState, // For debugging only
  },
});

const { create, signIn, signOut, resetOperationResult } = usersSlice.actions;

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

  const resetUserOperationResult = () => {
    dispatch(resetOperationResult());
  };

  return { createUser, signInUser, signOutUser, resetUserOperationResult };
};

export default usersSlice.reducer;
