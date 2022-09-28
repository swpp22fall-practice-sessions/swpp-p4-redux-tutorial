import "./TodoDetail.css";
import {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { AppDispatch } from "../../store";

import { selectTodo, fetchTodo, todoActions } from "../../store/slices/todo";

const TodoDetail = () => {

  const {id} = useParams();
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
