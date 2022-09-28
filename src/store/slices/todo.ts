import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import axios from "axios";
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
  todos: [],
  selectedTodo: null,
}; // continue

export const fetchTodos = createAsyncThunk("todo/fetchTodos", async () => {
  const response = await axios.get<TodoType[]>("/api/todo/");
  return response.data;
});

export const postTodo = createAsyncThunk(
  "todo/postTodo",
  async (td: Pick<TodoType, "title" | "content">, { dispatch }) => {
    //{dispatch} 가 추가됨, middleware에서도 action을 발생시킬 수 있다
    const response = await axios.post("/api/todo/", td);
    dispatch(todoActions.addTodo(response.data));
  }
);

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

export const fetchTodo = createAsyncThunk(
  "todo/fetchTodo",
  async (id: TodoType["id"], { dispatch }) => {
    const response = await axios.get(`/api/todo/${id}/`);
    return response.data ?? null;
    //return이 있으면 extraReducers에 추가
    //loading도 추가할 수 있다!
  }
);

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
    // Add reducers for additional action types
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      // Add user to the state array
      state.todos = action.payload;
    });
    builder.addCase(postTodo.rejected, (_state, action) => {
      console.error(action.error);
    });
    builder.addCase(fetchTodo.fulfilled, (state, action) => {
      state.selectedTodo = action.payload;
    });
  },
});
export const todoActions = todoSlice.actions;
export const selectTodo = (state: RootState) => state.todo;
export default todoSlice.reducer;
