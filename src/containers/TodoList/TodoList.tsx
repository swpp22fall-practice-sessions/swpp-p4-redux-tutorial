import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Todo from "../../components/Todo/Todo";
import TodoDetail from "../../components/TodoDetail/TodoDetail";
import { AppDispatch } from "../../store";
import { deleteTodo, fetchTodos, selectTodo, todoActions, toggleDone } from "../../store/slices/todo";
import "./TodoList.css";

interface IProps {
  title: string;
}

type TodoType = { id: number; title: string; content: string; done: boolean };

export default function TodoList(props: IProps) {
  const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
      dispatch(fetchTodos())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  const todoState = useSelector(selectTodo);
  const { title } = props;
  const [selectedTodo, setSelectedTodo] = useState<TodoType | null>(null);

  const clickTodoHandler = (td: TodoType) => {
    if (selectedTodo === td) {
      setSelectedTodo(null);
    } else {
      setSelectedTodo(td);
    }
  };

  const todoDetail = useMemo(() => {
    return selectedTodo ? (
      <TodoDetail title={selectedTodo.title} content={selectedTodo.content} />
    ) : null;
  }, [selectedTodo]);

  return (
    <div className="TodoList">
      <div className="title">{title}</div>
      <div className="todos">
        {todoState.todos.map((td) => {
          return (
            <Todo
              title={td.title}
              done={td.done}
              clickDetail={() => clickTodoHandler(td)}
              clickDone={() => dispatch(toggleDone(td.id))}
              clickDelete={() => dispatch(deleteTodo(td.id))}
          />
          );
        })}
        {todoDetail}
        <NavLink to="/new-todo" >New Todo</NavLink>
      </div>
    </div>
  );
}
