import { getByUser ,addItem,deleteItem} from "../API/generalApi";

const BASE_URL = "http://localhost:3000/todos";

export const getTodosByUser = async (userId) => {
  return getByUser(userId,"todos");
};

// הוספת TODO חדש
export const addTodo = async (todo) => {
  return addItem(todo,"todos");
};

// מחיקת TODO
export const deleteTodo = async (id) => {
  return deleteItem(id,"todos")
};

// עדכון תוכן TODO
export const updateTodoTitle = async (id, newTitle) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error updating todo title:", error);
  }
};

// עדכון מצב TODO 
export const toggleTodoCompleted = async (id, completed) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error toggling todo:", error);
  }
};
6