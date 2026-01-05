import { getByUser ,addItem,deleteItem,updateItem} from "../API/generalApi";

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
  return updateItem(id,{ title: newTitle },"todos");
};

// עדכון מצב TODO 
export const toggleTodoCompleted = async (id, completed) => {
    return updateItem(id,{ completed},"todos");
};
6