// import { createContext, useState, useEffect } from "react";

// export const MyContext = createContext();

// export const MyProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const savedUser = localStorage.getItem("currentUser");
//     if (savedUser) setCurrentUser(JSON.parse(savedUser));
//   }, []);

//   return (
//     <MyContext.Provider value={{ currentUser, setCurrentUser }}>
//       {children}
//     </MyContext.Provider>
//   );
// };
import { createContext, useState, useEffect } from "react";

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // כדי למנוע Redirect לפני טעינה

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    setLoading(false); // סיימנו לטעון
  }, []);

  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  return (
    <MyContext.Provider value={{ currentUser, setCurrentUser, logout }}>
      {!loading && children} {/* מחכים לטעינת המשתמש */}
    </MyContext.Provider>
  );
};
