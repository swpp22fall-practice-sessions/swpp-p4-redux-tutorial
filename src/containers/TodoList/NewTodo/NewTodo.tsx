import { useState } from "react";
import { Navigate } from "react-router-dom";
import "./NewTodo.css";

const NewTodo = () => {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [submitted, setSubmitted] = useState<boolean>(false);

    const postTodoHandler = () => {
        const data = { title: title, content: content };

        alert("Submitted\n" + data.title + "\n" + data.content);
        setSubmitted(true);
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
