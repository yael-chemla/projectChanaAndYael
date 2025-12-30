import { createContext, useState, useEffect } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // בזמן טעינת האפליקציה, נבדוק אם יש משתמש ב-localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
  }, []);

  return (
    <MyContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </MyContext.Provider>
  );
};
