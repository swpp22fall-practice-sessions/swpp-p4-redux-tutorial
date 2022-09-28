import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux";
import { store } from "./store";
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todo";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
   <Provider store={store}><App /></Provider>
  </React.StrictMode>
  );

  export const store = configureStore({
    reducer: {
     todo: todoReducer,
     },
    });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;