import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({ reducer: (state = {}, action) => state }); // TODO

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
