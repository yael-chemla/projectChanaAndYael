import { useContext } from "react";
import { MyContext } from "../../context";

function AddTodo({ newTitle, setNewTitle, handleAddTodo }) {
    const { currentUser } = useContext(MyContext);

    return (
        <div className="todos-container">
            <div className="add-todo">
                <input
                    id="addTodo"
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="New todo title"
                />
                <button onClick={handleAddTodo}>Add Todo</button>
            </div>
        </div>
    );
}

export default AddTodo;
