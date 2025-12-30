import { useContext, useEffect, useState } from "react";
import { MyContext } from "../context";
import {
  getTodosByUser,
  addTodo,
  deleteTodo,
  updateTodoTitle,
  toggleTodoCompleted
} from "../API/todosApi";
import "../css/todos.css";

function Todos() {
  const { currentUser } = useContext(MyContext);
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    if (!currentUser) return;
    getTodosByUser(currentUser.id).then(setTodos);
  }, [currentUser]);

  const handleToggleCompleted = async (todo) => {
    const updated = await toggleTodoCompleted(todo.id, !todo.completed);
    setTodos(todos.map(t => t.id === todo.id ? updated : t));
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter(t => t.id !== id));
  };

  const handleUpdateTitle = async (todo) => {
    const newText = prompt("Enter new title:", todo.title);
    if (newText) {
      const updated = await updateTodoTitle(todo.id, newText);
      setTodos(todos.map(t => t.id === todo.id ? updated : t));
    }
  };

  const handleAddTodo = async () => {
    if (!newTitle) return;
    const newTodo = {
      title: newTitle,
      userId: currentUser.id,
      completed: false
    };
    const added = await addTodo(newTodo);
    setTodos([...todos, added]);
    setNewTitle("");
  };

  return (
    <div className="todos-container">
      <h2>{currentUser?.name}'s Todos</h2>

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

      <div className="todos-grid">
        {todos.map(todo => (
          <div key={todo.id} className="todo-card">
            <div className="todo-id">ID: {todo.id}</div>
            <div className="todo-title">{todo.title}</div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleCompleted(todo)}
                />
                Done
              </label>
            </div>
            <div className="todo-actions">
              <button onClick={() => handleUpdateTitle(todo)}>Edit</button>
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todos;
