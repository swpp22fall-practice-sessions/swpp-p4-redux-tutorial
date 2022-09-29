import Todo from "../../components/Todo/Todo";
import "./TodoList.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {fetchTodos, selectTodo, todoActions} from "../../store/slices/todo";
import {useEffect} from "react";
import axios from 'axios';
import {AppDispatch} from "../../store";

interface IProps {
  title: string;
}

type TodoType = { id: number; title: string; content: string; done: boolean };

export default function TodoList(props: IProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { title } = props;
  const todoState = useSelector(selectTodo);
  
  const navigate = useNavigate()

  const clickTodoHandler = (td: TodoType) => {
    navigate('/todos/' + td.id);
  };

  useEffect(() => {
    dispatch(fetchTodos())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);


  useEffect(() => { axios.get('/api/todo/')
    .then(result => console.log(result))
    .catch(e => console.log(e));
  });

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
              clickDone={() => dispatch(todoActions.toggleDone({targetId: td.id}))}
              clickDelete={() => dispatch(todoActions.deleteTodo({targetId: td.id}))}
            />
          );
        })}
        <NavLink to="/new-todo" >New Todo</NavLink>
      </div>
    </div>
  );
}
