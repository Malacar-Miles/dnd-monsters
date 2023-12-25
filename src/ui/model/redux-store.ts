import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./redux-slice-users";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
