// src/API/infoApi.js
export async function getUserInfo(userId) {
  try {
    const response = await fetch(`http://localhost:3000/users/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user info");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
