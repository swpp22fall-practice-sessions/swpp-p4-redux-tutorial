import { useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Todo from "../../components/Todo/Todo";
import TodoDetail from "../../components/TodoDetail/TodoDetail";
import "./TodoList.css";
import { useDispatch, useSelector } from "react-redux";
import { selectTodo, todoActions, fetchTodos, deleteTodo, toggleDone } from "../../store/slices/todo";
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

	useEffect(() => {
		dispatch(fetchTodos());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);

	const navigate = useNavigate()

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
