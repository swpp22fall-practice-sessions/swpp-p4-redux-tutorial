import { render } from "@testing-library/react";
import { useState, useMemo } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Todo from "../../components/Todo/Todo";
import TodoDetail from "../../components/TodoDetail/TodoDetail";
import { selectTodo, todoActions } from "../../store/slices/todo";
import { TodoType } from "../../store/slices/todo";

import "./TodoList.css";

interface IProps {
    title: string;
}

const TodoList = (props: IProps) => {
    const { title } = props;
    const todoState = useSelector(selectTodo);

    const [selectedTodo, setSelectedTodo] = useState<TodoType | null>(null);
    const clickTodoHandler = (todo: TodoType) => {
         setSelectedTodo(selectedTodo === todo ? null : todo)
    };

    const todoDetail = useMemo(() => {
        return selectedTodo ? (
            <TodoDetail title={selectedTodo.title} content={selectedTodo.content} />
        ) : null;
    }, [selectedTodo]);

    const dispatch = useDispatch();

    return (
        <div className="TodoList">
            <div className="title">{title}</div>
            <div className="todos">
                {todoState.todos.map((td) => {
                    return (<Todo 
                        key={td.id} 
                        title={td.title} 
                        done={td.done} 
                        clickDetail={() => clickTodoHandler(td)} 
                        clickDone={() => dispatch(todoActions.toggleDone({ targetId: td.id }))} 
                        clickDelete={() => dispatch(todoActions.deleteTodo({ targetId: td.id }))}/>);
                })}

                {todoDetail}

                <NavLink to="/new-todo">New Todo</NavLink>

            </div>
        </div>);
}  

export default TodoList;