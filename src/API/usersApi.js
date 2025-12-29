// // src/api.js

// // GET - מביא את כל המשתמשים
// export const getUsers = async () => {
//   try {
//     const response = await fetch('http://localhost:3001/users');
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     return [];
//   }
// };

// // POST - יוצר משתמש חדש
// export const createUser = async (user) => {
//   try {
//     const response = await fetch('http://localhost:3001/users', {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(user)
//     });

//     if (!response.ok) throw new Error("שגיאה ביצירת המשתמש");

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// GET - מביא את כל המשתמשים
export const getUsers = async () => {
  try {
    const response = await fetch('http://localhost:3001/users');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

// POST - יוצר משתמש חדש
export const createUser = async (user) => {
  try {
    const response = await fetch('http://localhost:3001/users', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });

    if (!response.ok) throw new Error("שגיאה ביצירת המשתמש");
    console.log("רישום משתמש עבר בהצלחה")

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
