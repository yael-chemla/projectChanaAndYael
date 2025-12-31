import { createContext, useState, useEffect } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

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
