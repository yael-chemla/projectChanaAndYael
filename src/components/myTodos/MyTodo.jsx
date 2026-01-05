// function MyTodo({todo,handleToggleCompleted,handleUpdateTitle,handleDelete})
// {
//     return(
//         <div key={todo.id} className="todo-card">
//             <div className="todo-id">ID: {todo.id}</div>
//             <div className="todo-title">{todo.title}</div>
//             <div>
//               <label>
//                 <input
//                   type="checkbox"
//                   checked={todo.completed}
//                   onChange={() => handleToggleCompleted(todo)}
//                 />
//                 Done
//               </label>
//             </div>
//             <div className="todo-actions">
//               <button onClick={() => handleUpdateTitle(todo)}>Edit</button>
//               <button onClick={() => handleDelete(todo.id)}>Delete</button>
//             </div>
//           </div>
//     )
// }
// export default MyTodo;
import { useState } from "react";

function MyTodo({
  todo,
  handleToggleCompleted,
  handleUpdateTitle,
  handleDelete
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  function onConfirmEdit() {
    handleUpdateTitle(todo.id, newTitle);
    setIsEditing(false);
  }

  return (
    <div className="todo-card">
      <div className="todo-id">ID: {todo.id}</div>

      {/* כותרת / עריכה */}
      {isEditing ? (
        <div className="edit-title">
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <button onClick={onConfirmEdit}>updateTitle</button>
        </div>
      ) : (
        <div className="todo-title">{todo.title}</div>
      )}

      {/* סימון בוצע */}
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleToggleCompleted(todo.id)}
        />
        Done
      </label>

      {/* כפתורים */}
      <div className="todo-actions">
        {!isEditing && (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <button onClick={() => handleDelete(todo.id)}>Delete</button>
      </div>
    </div>
  );
}

export default MyTodo;
