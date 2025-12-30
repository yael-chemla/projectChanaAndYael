const BASE_URL = "http://localhost:3000/todos";

export const getTodosByUser = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}?userId=${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
};

// הוספת TODO חדש
export const addTodo = async (todo) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });
    return await response.json();
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};

// מחיקת TODO
export const deleteTodo = async (id) => {
  try {
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
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

// עדכון מצב TODO (completed)
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
