import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { todoActions } from "../../../store/slices/todo";
import { AppDispatch } from "../../../store";
import { postTodo } from "../../../store/slices/todo";


// import { useNavigate } from "react-router-dom";
import "./NewTodo.css";

export default function NewTodo() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  // const navigate = useNavigate()
  // const postTodoHandler = () => {
  //   const data = { title: title, content: content };
  //   alert("Submitted\n" + data.title + "\n" + data.content);
  //   setSubmitted(true);
  //   navigate('/todos')
  // };
  const dispatch = useDispatch()


  const postTodoHandler = async () => {
    const data = { title: title, content: content };
    const result = await dispatch(postTodo(data));
    if (result.payload) {
    setSubmitted(true);
    } else {
    alert("Error on post Todo");
    }
  };
   

  if (submitted) {
    return <Navigate to="/todos" />;
  } else {
    return (
      <div className="NewTodo">
        <h1>Add a Todo</h1>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <label>Content</label>
        <textarea
          rows={4}
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <button onClick={() => postTodoHandler()}>Submit</button>
      </div>
    );
  }
}
