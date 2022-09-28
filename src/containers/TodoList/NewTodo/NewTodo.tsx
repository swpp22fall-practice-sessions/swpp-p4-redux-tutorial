import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../../store";
import { postTodo } from "../../../store/slices/todo";
import "./NewTodo.css";

export default function NewTodo() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const postTodoHandler = () => {
    const data = { title: title, content: content };
    dispatch(postTodo(data));
    navigate("/todos");
  };

  return (
    <div className="NewTodo">
      <h1>Add a Todo</h1>
      <label>Title</label>
      <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
      <label>Content</label>
      <textarea rows={4} value={content} onChange={(event) => setContent(event.target.value)} />
      <button onClick={() => postTodoHandler()}>Submit</button>
    </div>
  );
}
