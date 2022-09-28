
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { AppDispatch } from "../../store";
import { selectTodo, fetchTodo } from "../../store/slices/todo";
import "./TodoDetail.css";

const TodoDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const todoState = useSelector(selectTodo);

  useEffect(() => {
    dispatch(fetchTodo(Number(id)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="TodoDetail">
      <div className="row">
        <div className="left">Name:</div>
        <div className="right">{todoState.selectedTodo?.title}</div>
      </div>
      <div className="row">
        <div className="left">Content:</div>
        <div className="right">{todoState.selectedTodo?.content}</div>
      </div>
    </div>
  );
};
export default TodoDetail;
/*
import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import Todo from "../../components/Todo/Todo";
import TodoDetail from "../../components/TodoDetail/TodoDetail";
import "./TodoList.css";
import { useDispatch, useSelector } from "react-redux";
import { selectTodo, todoActions } from "../../store/slices/todo";

interface IProps {
  title: string;
}

type TodoType = { id: number; title: string; content: string; done: boolean };

export default function TodoList(props: IProps) {
  const { title } = props;
  const [selectedTodo, setSelectedTodo] = useState<TodoType | null>(null);

  const [todos, setTodos] = useState<TodoType[]>([
    { id: 1, title: "SWPP", content: "take swpp class", done: true },
    { id: 2, title: "Movie", content: "watch movie", done: false },
    { id: 3, title: "Dinner", content: "eat dinner", done: false },
  ]);

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

  const todoState = useSelector(selectTodo);
  const dispatch = useDispatch();


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
        <NavLink to="/new-todo" >New Todo</NavLink>
      </div>
    </div>
  );
}
*/