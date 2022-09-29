import { useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Todo from "../../components/Todo/Todo";
import TodoDetail from "../../components/TodoDetail/TodoDetail";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, selectTodo, todoActions, deleteTodo, toggleDone, } from "../../store/slices/todo";

import axios from 'axios';
import "./TodoList.css";
import { AppDispatch } from "../../store";

interface IProps {
  title: string;
}

type TodoType = { id: number; title: string; content: string; done: boolean };

export default function TodoList(props: IProps) {
  const { title } = props;
  const [selectedTodo, setSelectedTodo] = useState<TodoType | null>(null);
  const todoState = useSelector(selectTodo);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
 
  useEffect(() => {
    axios.get('/api/todo')
   .then(result => console.log(result));
  })

  useEffect(() => {
    axios.get('/api/todoerror')
   .then(result => console.log(result))
   .catch(err => console.log(err)); 
  })

  useEffect(() => {
    dispatch(fetchTodos())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

  const clickTodoHandler = (td: TodoType) => {
    navigate('/todos/' + td.id)
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
