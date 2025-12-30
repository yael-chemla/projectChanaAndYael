import { useContext, useEffect, useState } from "react";
import { MyContext } from "../context";
import { getTodosByUser } from "../API/todosApi";

function Todos() {
  const { currentUser } = useContext(MyContext);
  const [todos, setTodos] = useState([]);
  const [showTodos, setShowTodos] = useState(false); // האם להראות את הרשימה

  useEffect(() => {
    if (!currentUser) return;

    const fetchTodos = async () => {
      const userTodos = await getTodosByUser(currentUser.id);
      setTodos(userTodos);
    };

    fetchTodos();
  }, [currentUser]);

  const toggleTodos = () => {
    setShowTodos(!showTodos); // משנה את המצב בין מציג לנסתר
  };

  return (
    <div>
      <h2>{currentUser?.name}'s Todos</h2>
      <button onClick={toggleTodos}>
        {showTodos ? "Hide Todos" : "Show Todos"}
      </button>

      {showTodos && (
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              {todo.title} {todo.completed ? "(Done)" : "(Pending)"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Todos;
