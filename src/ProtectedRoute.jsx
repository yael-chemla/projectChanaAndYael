import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { MyContext } from "./context/context";

function ProtectedRoute({ children }) {
  const { currentUser, loading } = useContext(MyContext);

  if (loading) return null;

  if (!currentUser) {
    alert("Please log in to access this page");
    return (
      //replace: מוחק את הכתובת הנוכחית מההיסטוריה (כדי שלחיצה על "חזור" בדפדפן לא תחזיר אותו לדף החסום).
      <Navigate to="/login" replace  />
    );
  }

  return children;
}

export default ProtectedRoute;

