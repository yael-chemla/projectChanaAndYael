import { useContext, useEffect, useState } from "react";
import { MyContext } from "../context";
import { getTodosByUser } from "../API/todosApi";

function Todos() {
  const { currentUser } = useContext(MyContext);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    getTodosByUser(currentUser.id).then(setTodos);
  }, [currentUser]);

  return (
    <div>
      <h2>{currentUser?.name}'s Todos</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title} {todo.completed ? "(Done)" : "(Pending)"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
