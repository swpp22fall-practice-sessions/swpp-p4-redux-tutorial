// src/store/slices/todo.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import axios from "axios";

export interface TodoType { id: number; title: string; content: string; done: boolean; }
export interface TodoState { todos: TodoType[]; selectedTodo: TodoType | null; }
const initialState: TodoState = {
 todos: [
   { id: 1, title: "SWPP", content: "take swpp class", done: true },
   { id: 2, title: "Movie", content: "watch movie", done: false },
   { id: 3, title: "Dinner", content: "eat dinner", done: false },
 ], selectedTodo: null,
}; // continue

export const fetchTodos = createAsyncThunk(
    "todo/fetchTodos",
    async () => {
        const response = await axios.get<TodoType[]>("/api/todo/");
        return response.data;
   }
)
export const fetchTodo = createAsyncThunk( "todo/fetchTodo",
 async (id: TodoType["id"], { dispatch }) => {
   const response = await axios.get(`/api/todo/${id}/`);
   return response.data ?? null;
 }
);
export const postTodo = createAsyncThunk(
    "todo/postTodo",
    async (td: Pick<TodoType, "title" | "content">, { dispatch }) => {
        const response = await axios.post("/api/todo/", td);
        dispatch(todoActions.addTodo(response.data));
    }
)
export const deleteTodo = createAsyncThunk(
    "todo/deleteTodo",
    async (id: TodoType["id"], { dispatch }) => {
      await axios.delete(`/api/todo/${id}/`);
      dispatch(todoActions.deleteTodo({ targetId: id }));
    }
);
export const toggleDone = createAsyncThunk(
    "todo/toggleDone",
    async (id: TodoType["id"], { dispatch }) => {
      await axios.put(`/api/todo/${id}/`);
      dispatch(todoActions.toggleDone({ targetId: id }));
    }
);

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
      getAll: (state, action: PayloadAction<{ todos: TodoType[] }>) => {},
      getTodo: (state, action: PayloadAction<{ targetId: number }>) => {
        const target = state.todos.find((td) => td.id === action.payload.targetId);
        state.selectedTodo = target ?? null;
      },
      toggleDone: (state, action: PayloadAction<{ targetId: number }>) => {
        const todo = state.todos.find(
            (value) => value.id === action.payload.targetId
        );
        if (todo){
            todo.done = !todo.done;
        }
      },
      deleteTodo: (state, action: PayloadAction<{ targetId: number }>) => {
        const deleted = state.todos.filter((todo) => {
            return todo.id !== action.payload.targetId;
        });
        state.todos = deleted;
      },
      addTodo: (state, action: PayloadAction<{ title: string; content: string }>) => {
        const newTodo = {
            id: state.todos[state.todos.length-1].id + 1,
            title: action.payload.title,
            content: action.payload.content,
            done: false
        };
        state.todos.push(newTodo);
      },
   }, 
   extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload
    });
    builder.addCase(postTodo.rejected, (_state, action) => {
        console.error(action.error);
    });
    builder.addCase(fetchTodo.fulfilled,
        (state, action) => {
        state.selectedTodo = action.payload;
      });
  }
});
export const todoActions = todoSlice.actions;
export const selectTodo = (state: RootState) => state.todo;
export default todoSlice.reducer;