import { addItem } from "./generalApi";
export const getUsers = async () => {
  try {
    const response = await fetch('http://localhost:3000/users');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

export const createUser = async (user) => {
  return addItem(user,"users");
};
