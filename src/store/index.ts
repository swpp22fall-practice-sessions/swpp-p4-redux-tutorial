
// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import {todoSlice} from "./slices/todo";

export const store = configureStore(
  { reducer: todoSlice.reducer}
); // TODO

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;