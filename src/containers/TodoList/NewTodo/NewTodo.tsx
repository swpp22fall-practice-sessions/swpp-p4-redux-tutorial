import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { todoActions, postTodo } from "../../../store/slices/todo";
import { AppDispatch } from "../../../store";

import "./NewTodo.css";

const NewTodo = () => {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [submitted, setSubmitted] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();

    const postTodoHandler = async () => {
        const data = { title: title, content: content };

        const result = await dispatch(postTodo(data));

        if (result.payload) {
            alert("Submitted\n" + data.title + "\n" + data.content);
            setSubmitted(true);
        } else {
            alert("Error: " + "postTodoHandler");
        }
    };

    return submitted ? <Navigate to="/todos" /> : (
        <div className="NewTodo">
            <h1>Add a Todo</h1>

            <label>Title</label>
            <input type="text" value={title} 
            onChange={(event) => setTitle(event.target.value)}/>

            <label>Content</label>
            <textarea rows={4} value={content} 
            onChange={(event) => setContent(event.target.value)}/>

            <button onClick={postTodoHandler}>
                Submit
            </button>
        </div>
    );
}

export default NewTodo;
