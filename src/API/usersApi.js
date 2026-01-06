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

// src/API/usersApi.js
export const getUserByCredentials = async (username, password) => {
  try {
    const res = await fetch(`http://localhost:3000/users?username=${username}&website=${password}`);
    const data = await res.json();
    return data[0] || null; // אם נמצא – מחזיר את המשתמש, אם לא – null
  } catch (err) {
    console.error("Error fetching user:", err);
    return null;
  }
};
