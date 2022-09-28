import { useEffect, useMemo, useState } from "react";
import Todo from "../../components/Todo/Todo";
import TodoDetail from "../../components/TodoDetail/TodoDetail";
import "./TodoList.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, fetchTodos, selectTodo, todoActions, toggleDone } from "../../store/slices/todo";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppDispatch } from "../../store";

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
    const todoState = useSelector(selectTodo);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const clickTodoHandler = (td: TodoType) => {
        navigate("/todos/" + td.id);
    };

    // const clickTodoHandler = (td: TodoType) => {
    //     if (selectedTodo === td) {
    //         setSelectedTodo(null);
    //     } else {
    //         setSelectedTodo(td);
    //     }
    // };

    const todoDetail = useMemo(() => {
        return selectedTodo ? (
            <TodoDetail
                title={selectedTodo.title}
                content={selectedTodo.content}
            />
        ) : null;
    }, [selectedTodo]);

    useEffect(() => {
        dispatch(fetchTodos());
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
                            clickDone={() => dispatch(toggleDone(td.id))}
                            clickDelete={() => dispatch(deleteTodo(td.id))}
                        />
                    );
                })}
                {todoDetail}
                <NavLink to="/new-todo">New Todo</NavLink>
            </div>
        </div>
    );
}
