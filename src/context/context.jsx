import { createContext, useState, useEffect } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  //מונע מהאפליקציה להתרנדר לפני שהיא יודעת אם יש משתמש מחובר ב-localStorage
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    setLoading(false); 
  }, []);

  return (
    <MyContext.Provider value={{ currentUser, setCurrentUser, loading }}>
      {!loading && children} 
    </MyContext.Provider>
  );
};
