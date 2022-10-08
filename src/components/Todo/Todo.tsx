import "./Todo.css";

interface IProps {
    title: string;
    clickDetail?: React.MouseEventHandler<HTMLDivElement>
    clickDone?: () => void
    clickDelete?: () => void
    done: boolean;
}

const Todo = (props: IProps) => {
  return (
    <div className="Todo">
      <div className={`text ${props.done && "done"}`} onClick={props.clickDetail}>
        {props.title}
      </div>
      {props.done && <div className="done-mark">&#x2713;</div>}
        <button onClick={props.clickDone}>{(props.done) ? 'Undone' : 'Done'}</button>
        <button onClick={props.clickDelete}>Delete</button>
    </div>
  );
};
export default Todo;
