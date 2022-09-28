import "./TodoDetail.css";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchTodo, TodoType } from "../../store/slices/todo";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectTodo, todoActions } from "../../store/slices/todo";
import { AppDispatch } from "../../store";

type Props = {
    title?: string;
    content?: string;
};

const TodoDetail = (props: Props) => {
    const navigate = useNavigate();
    const clickTodoHandler = (td: TodoType) => {
        navigate("/todos/" + td.id);
    };
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const todoState = useSelector(selectTodo);
    useEffect(() => {
        dispatch(fetchTodo(Number(id)));
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
