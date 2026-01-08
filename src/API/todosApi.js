import { getByUser ,addItem,deleteItem,updateItem} from "../API/generalApi";

const BASE_URL = "http://localhost:3000/todos";

export const getTodosByUser = async (userId) => {
  return getByUser(userId,"todos");
};

export const addTodo = async (todo) => {
  return addItem(todo,"todos");
};

export const deleteTodo = async (id) => {
  return deleteItem(id,"todos")
};

export const updateTodoTitle = async (id, newTitle) => {
  return updateItem(id,{ title: newTitle },"todos");
};

export const toggleTodoCompleted = async (id, completed) => {
    return updateItem(id,{ completed},"todos");
};
6