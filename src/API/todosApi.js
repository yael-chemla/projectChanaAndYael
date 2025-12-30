// API/todosApi.js
export const getTodosByUser = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3000/todos?userId=${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    return [];
  }
};
