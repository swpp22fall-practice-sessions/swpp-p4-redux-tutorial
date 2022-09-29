import "./TodoDetail.css";
import {useNavigate, useParams} from "react-router";
import {fetchTodo, selectTodo, todoActions, TodoType} from "../../store/slices/todo";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {AppDispatch} from "../../store";

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
