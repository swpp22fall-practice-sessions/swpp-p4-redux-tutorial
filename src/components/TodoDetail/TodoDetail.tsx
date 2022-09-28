import "./TodoDetail.css";
import { NavLink, useNavigate } from "react-router-dom";
import { TodoType } from "../../store/slices/todo";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectTodo, todoActions } from "../../store/slices/todo";

type Props = {
  title: string;
  content: string;
};

const navigate = useNavigate()

const clickTodoHandler = (td: TodoType) => {
 navigate('/todos/' + td.id)
 };

 const { id } = useParams();
 const dispatch = useDispatch();
 const todoState = useSelector(selectTodo);

 useEffect(() => {
  dispatch(todoActions.getTodo({ targetId: Number(id) }));
  }, [dispatch, id]);

const TodoDetail = (props: Props) => {
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
