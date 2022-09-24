import { render } from "@testing-library/react";
import { useState, useMemo, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Todo from "../../components/Todo/Todo";
import TodoDetail from "../../components/TodoDetail/TodoDetail";
import { fetchTodos, selectTodo, deleteTodo, toggleDone, todoActions } from "../../store/slices/todo";
import { TodoType } from "../../store/slices/todo";
import { AppDispatch } from "../../store";

import "./TodoList.css";

interface IProps {
    title: string;
}

const TodoList = (props: IProps) => {
    const { title } = props;
    const todoState = useSelector(selectTodo);

    const [selectedTodo, setSelectedTodo] = useState<TodoType | null>(null);

    const navigate = useNavigate();

    const clickTodoHandler = (todo: TodoType) => {
        setSelectedTodo(selectedTodo === todo ? null : todo);
        navigate(`/todos/${todo.id}`);
    };

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchTodos())
    }, [])

    return (
        <div className="TodoList">
            <div className="title">{title}</div>
            <div className="todos">
                {todoState.todos.map((td: TodoType) => {
                    return (<Todo 
                        key={td.id} 
                        title={td.title} 
                        done={td.done} 
                        clickDetail={() => clickTodoHandler(td)} 
                        clickDone={() => dispatch(toggleDone(td.id))} 
                        clickDelete={() => dispatch(deleteTodo(td.id))}/>);
                })}
                <NavLink to="/new-todo">New Todo</NavLink>

            </div>
        </div>);
}  

export default TodoList;