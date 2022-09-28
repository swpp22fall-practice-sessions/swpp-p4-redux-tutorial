import "./TodoDetail.css";
  
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchTodo, selectTodo, todoActions } from "../../store/slices/todo";
import { NavLink, useNavigate } from "react-router-dom";
import { TodoType } from "../../store/slices/todo";
import { AppDispatch } from "../../store";

type Props = {
  title: string;
  content: string;
};

const TodoDetail = (props: Props) => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchTodo(Number(id)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [id]);
  const todoState = useSelector(selectTodo);
  useEffect(() => {
    dispatch(todoActions.getTodo({ targetId: Number(id) }));
  }, [dispatch, id]);
  const navigate = useNavigate()
  const clickTodoHandler = (td: TodoType) => {
    navigate('/todos/' + td.id)
  };
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
