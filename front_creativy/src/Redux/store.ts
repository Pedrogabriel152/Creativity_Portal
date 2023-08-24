import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import userSlice from "./User/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;