import { addItem } from "./generalApi";
export const getUsers = async () => {
  try {
    const response = await fetch('http://localhost:3000/users');
    if (!response.ok) {
      throw new Error("Failed to delete item");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    alert('Error fetching users:', error);
    return [];
  }
};

export const createUser = async (user) => {
  return addItem(user,"users");
};

export const getUserByCredentials = async (username, password) => {
  try {
    const response = await fetch(`http://localhost:3000/users?username=${username}&website=${password}`);
     if (!response.ok) {
      throw new Error("Failed to delete item");
    }
    const data = await response.json();
    return data[0] || null; 
  } catch (err) {
    alert("Error fetching user:", err);
    return null;
  }
};
