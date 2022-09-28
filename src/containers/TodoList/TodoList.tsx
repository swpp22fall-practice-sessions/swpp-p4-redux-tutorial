import { useEffect, useMemo, useState } from "react";
//import { NavLink } from "react-router-dom";
import Todo from "../../components/Todo/Todo";
import TodoDetail from "../../components/TodoDetail/TodoDetail";
import "./TodoList.css";

import { useDispatch, useSelector } from "react-redux";
//import { selectTodo, todoActions } from "../../store/slices/todo";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchTodos, selectTodo, todoActions, deleteTodo, toggleDone } from "../../store/slices/todo";

interface IProps {
  title: string;
}

type TodoType = { id: number; title: string; content: string; done: boolean };

export default function TodoList(props: IProps) {
  const { title } = props;
  const [selectedTodo, setSelectedTodo] = useState<TodoType | null>(null);

  const todoState = useSelector(selectTodo);
  //const dispatch = useDispatch();
  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchTodos())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
   
  useEffect(() => {
    axios.get('/api/todo')
   .then(result => console.log(result));
  })

  useEffect(() => {
    axios.get('/api/todoerror')
   .then(result => console.log(result))
   .catch(err => console.log(err));
   })

  const [todos, setTodos] = useState<TodoType[]>([
    { id: 1, title: "SWPP", content: "take swpp class", done: true },
    { id: 2, title: "Movie", content: "watch movie", done: false },
    { id: 3, title: "Dinner", content: "eat dinner", done: false },
  ]);

  //todo 게시물을 클릭하면 새로운 페이지로 이동하게함
  const clickTodoHandler = (td: TodoType) => {
    navigate('/todos/' + td.id)
  };

  // const clickTodoHandler = (td: TodoType) => {
  //   if (selectedTodo === td) {
  //     setSelectedTodo(null);
  //   } else {
  //     setSelectedTodo(td);
  //   }
  // };

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
