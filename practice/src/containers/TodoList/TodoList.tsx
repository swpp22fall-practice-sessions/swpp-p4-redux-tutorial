import { useDispatch, useSelector } from 'react-redux';
import { selectTodo, todoActions } from '../../store/slices/todo';
import { NavLink, useNavigate } from "react-router-dom";
import Todo from "../../components/Todo/Todo";
import "./TodoList.css";

interface IProps {
  title: string;
}

type TodoType = { id: number; title: string; content: string; done: boolean };

export default function TodoList(props: IProps) {
  const { title } = props;

  const todoState = useSelector(selectTodo);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const clickTodoHandler = (td: TodoType) => {
    navigate("/todos/" + td.id);
  }

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
