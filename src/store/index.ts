import todoReducer from "./slices/todo";

// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore(
  { reducer: {todo: todoReducer}}
); // TODO

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;