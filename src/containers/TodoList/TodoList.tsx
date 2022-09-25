import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Todo from "../../components/Todo/Todo";
import TodoDetail from "../../components/TodoDetail/TodoDetail";
import { selectTodo } from "../../store/slices/todo";
import "./TodoList.css";

interface IProps {
  title: string;
}

type TodoType = { id: number; title: string; content: string; done: boolean };

export default function TodoList(props: IProps) {
  const { title } = props;
  const [selectedTodo, setSelectedTodo] = useState<TodoType | null>(null);

  const todoState = useSelector(selectTodo);

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
              key={`${td.id}_todo`}
              title={td.title}
              done={td.done}
              clicked={() => clickTodoHandler(td)}
            />
          );
        })}
        {todoDetail}
        <NavLink to="/new-todo">New Todo</NavLink>
      </div>
    </div>
  );
}
