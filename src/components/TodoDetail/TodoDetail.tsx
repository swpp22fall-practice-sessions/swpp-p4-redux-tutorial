import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectTodo, todoActions } from "../../store/slices/todo";
import "./TodoDetail.css";

type Props = {
  title: string;
  content: string;
};

const TodoDetail = (props: Props) => {
  return (
    <div className="TodoDetail">
      <div className="row">
        <div className="left">Name:</div>
        <div className="right">{props.title}</div>
      </div>
      <div className="row">
        <div className="left">Content:</div>
        <div className="right">{props.content}</div>
      </div>
    </div>
  );
};
export default TodoDetail;
