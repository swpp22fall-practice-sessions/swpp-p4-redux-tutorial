import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import todoReducer from './slices/todo'

export const store = configureStore({
  reducer : {
    todo : todoReducer,
  },
  middleware: getDefaultMiddleware(),
  // do not forget this
  devTools: process.env.NODE_ENV !== 'production',
}); // TODO

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;