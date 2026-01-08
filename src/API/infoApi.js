import {getByUser} from "../API/generalApi"; 

export const getUserInfo = async (userId) => {
  try {
    const users = await getByUser(userId, "users");

    // אם אין משתמש – נחזיר null
    if (!users || !users[0]) {
      return null;
    }

    // נחזיר את המשתמש הראשון
    return users[0];
  } catch (error) {
    alert("Error fetching user info:", error);
    return null;
  }
};

