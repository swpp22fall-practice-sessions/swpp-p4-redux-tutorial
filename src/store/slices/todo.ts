import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

export interface TodoType {
  id: number;
  title: string;
  content: string;
  done: boolean;
}

export interface TodoState {
  todos: TodoType[];
  selectedTodo: TodoType | null;
}

const initialState: TodoState = {
  todos: [
    { id: 1, title: "SWPP", content: "take swpp class", done: true },
    { id: 2, title: "Movie", content: "watch movie", done: false },
    { id: 3, title: "Dinner", content: "eat dinner", done: false },
  ],
  selectedTodo: null,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    getAll: (state, action: PayloadAction<{ todos: TodoType[] }>) => {},
    getTodo: (state, action: PayloadAction<{ targetId: number }>) => {},
    toggleDone: (state, action: PayloadAction<{ targetId: number }>) => {},
    deleteTodo: (state, action: PayloadAction<{ targetId: number }>) => {},
    addTodo: (
      state,
      action: PayloadAction<{ title: string; content: string }>
    ) => {
      const newTodo = {
        id: state.todos[state.todos.length - 1].id + 1, // temporary
        title: action.payload.title,
        content: action.payload.content,
        done: false,
      };
      state.todos.push(newTodo);
    },
  },
});

export const todoActions = todoSlice.actions;
export const selectTodo = (state: RootState) => state.todo;

export default todoSlice.reducer;
