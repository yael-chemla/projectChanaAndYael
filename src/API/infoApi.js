
const BASE_URL = "http://localhost:3000";
const type="users";

export const getUserInfo = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/${type}?id=${userId}`);
    const data = await response.json();

    if (data && data.length > 0) {
      return data[0]; 
    }

    return null; 
  } catch (error) {
    alert("Error fetching user info:", error);
    return null;
  }
};


