import { useMemo, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, selectTodo, deleteTodo, toggleDone } from "../../store/slices/todo";
import Todo from "../../components/Todo/Todo";
import TodoDetail from "../../components/TodoDetail/TodoDetail";
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
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTodos())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [todos, setTodos] = useState<TodoType[]>([
    { id: 1, title: "SWPP", content: "take swpp class", done: true },
    { id: 2, title: "Movie", content: "watch movie", done: false },
    { id: 3, title: "Dinner", content: "eat dinner", done: false },
  ]);
  useEffect(() => {
    axios.get('/api/todoerror')
      .then(result => console.log(result))
      .catch(err => console.log(err));
  })

  // const clickTodoHandler = (td: TodoType) => {
  //   if (selectedTodo === td) {
  //     setSelectedTodo(null);
  //   } else {
  //     setSelectedTodo(td);
  //   }
  // };
  const clickTodoHandler = (td: TodoType) => {
    navigate('/todos/' + td.id)
  };


  return (
    <div className="TodoList">
      <div className="title">{title}</div>
      <div className="todos">
        {todos.map((td) => {
          return (
            <Todo
              key={`${td.id}_todo`}
              title={td.title}
              done={td.done}
              clickDetail={() => clickTodoHandler(td)}
              clickDone={() => dispatch(toggleDone(td.id))}
              clickDelete={() => dispatch(deleteTodo(td.id))} />
          );
        })}
        <NavLink to="/new-todo" >New Todo</NavLink>
      </div>
    </div>
  );
}
