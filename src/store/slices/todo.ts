import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
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
    getTodo: (state, action: PayloadAction<{ targetId: number }>) => {
      const target = state.todos.find(
        (td) => td.id === action.payload.targetId
      );
      state.selectedTodo = target ?? null;
    },
    toggleDone: (state, action: PayloadAction<{ targetId: number }>) => {
      const todo = state.todos.find(
        (value) => value.id === action.payload.targetId
      );
      if (todo) {
        todo.done = !todo.done;
      }
    },
    deleteTodo: (state, action: PayloadAction<{ targetId: number }>) => {
      const deleted = state.todos.filter((todo) => {
        return todo.id !== action.payload.targetId;
      });
      state.todos = deleted;
    },
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
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
    });
  },
});

export const todoActions = todoSlice.actions;
export const selectTodo = (state: RootState) => state.todo;

export const fetchTodos = createAsyncThunk("todo/fetchTodos", async () => {
  const response = await axios.get<TodoType[]>("/api/todo/");
  return response.data;
});

export default todoSlice.reducer;
