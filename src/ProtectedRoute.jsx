// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { MyContext } from "./context";

// function ProtectedRoute({ children }) {
//   const { currentUser } = useContext(MyContext);

//   if (!currentUser) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }

// export default ProtectedRoute;
// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { MyContext } from "./context";

// function ProtectedRoute({ children }) {
//   const { currentUser } = useContext(MyContext);

//   if (!currentUser) {
//     // רק אם באמת אין משתמש
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }

// export default ProtectedRoute;
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { MyContext } from "./context";

function ProtectedRoute({ children }) {
  const { currentUser, loading } = useContext(MyContext);

  if (loading) {
    // מחכים לטעינת המשתמש מ-localStorage
    return null; // או <p>Loading...</p>
  }

  if (!currentUser) {
    // אם אחרי הטעינה אין משתמש – הפנייה ללוגין
    return <Navigate to="/login" replace />;
  }

  // יש משתמש, מרנדרים את התוכן
  return children;
}

export default ProtectedRoute;

