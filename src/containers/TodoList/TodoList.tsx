import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Todo from "../../components/Todo/Todo";
import { deleteTodo, fetchTodos, selectTodo, todoActions, toggleDone } from "../../store/slices/todo";
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
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const clickTodoHandler = (td: TodoType) => {
    navigate('/todos/' + td.id);
  };

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
