import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todo"
export const store = configureStore({
    reducer: {
        todo: todoReducer,
    },
});// TODO
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;