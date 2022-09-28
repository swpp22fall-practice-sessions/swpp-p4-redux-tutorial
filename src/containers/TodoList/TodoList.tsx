import { useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Todo from "../../components/Todo/Todo";
import TodoDetail from "../../components/TodoDetail/TodoDetail";
import "./TodoList.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, deleteTodo, toggleDone,selectTodo, todoActions } from "../../store/slices/todo";
import { AppDispatch } from "../../store";


interface IProps {
  title: string;
}

type TodoType = { id: number; title: string; content: string; done: boolean };

export default function TodoList(props: IProps) {
  const { title } = props;
  const [selectedTodo, setSelectedTodo] = useState<TodoType | null>(null);

  useEffect(() => {
    axios.get('/api/todo/').then(result => console.log(result))
  }) // with '/api/todo' 404 not found occurred.
  const todoState = useSelector(selectTodo);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTodos())
  }, []);
  const navigate = useNavigate();
  const clickTodoHandler = (td: TodoType) => {
    navigate('/todos/' + td.id)
  };

  const todoDetail = useMemo(() => {
    return selectedTodo ? (
      <TodoDetail />
    ) : null;
  }, [selectedTodo]);

  return (
    <div className="TodoList">
      <div className="title">{title}</div>
      <div className="todos">
        {todoState.todos.map((td) => {
          return (
            <Todo
              key={`${td.id}_todo`}
              title={td.title}
              done={td.done}
              clickDetail={() => clickTodoHandler(td)}
              clickDone={()=> dispatch(toggleDone(td.id))}
              clickDelete={()=> dispatch(deleteTodo(td.id))}
            />
          );
        })}
        {todoDetail}
        <NavLink to="/new-todo" >New Todo</NavLink>
      </div>
    </div>
  );
}
