import { useMemo, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Todo from "../../components/Todo/Todo";
import TodoDetail from "../../components/TodoDetail/TodoDetail";
import "./TodoList.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, selectTodo, todoActions, deleteTodo, toggleDone } from "../../store/slices/todo";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AppDispatch } from "../../store";

interface IProps {
  title: string;
}

type TodoType = { id: number; title: string; content: string; done: boolean };

export default function TodoList(props: IProps) {
  const { title } = props;

  const todoState = useSelector(selectTodo);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchTodos())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const navigate = useNavigate()
  const clickTodoHandler = (td: TodoType) => {
    navigate('/todos/' + td.id)
  };

  useEffect(() => { axios.get('/api/todo/')
      .then(result => console.log(result));
  })

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
        <NavLink to="/new-todo" >New Todo</NavLink>
      </div>
    </div>
  );
}
