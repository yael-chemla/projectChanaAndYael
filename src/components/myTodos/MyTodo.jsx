function MyTodo({todo,handleToggleCompleted,handleUpdateTitle,handleDelete})
{
    return(
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
    )
}
export default MyTodo;