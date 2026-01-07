// import {getByUser} from "../API/generalApi"; 
// // src/API/infoApi.js
// export async function getUserInfo(userId) {
//   try {
//     const response = await fetch(`http://localhost:3000/users/${userId}`);
//     if (!response.ok) {
//       throw new Error("Failed to fetch user info");
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     alert(error);
//     return null;
//   }
//   //  return getByUser(userId,'users')
// }
// src/API/infoApi.js
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

