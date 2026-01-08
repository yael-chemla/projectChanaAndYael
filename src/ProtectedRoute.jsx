import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { MyContext } from "./context/context";

function ProtectedRoute({ children }) {
  const { currentUser, loading } = useContext(MyContext);
  const location = useLocation();

  if (loading) return null;

  if (!currentUser) {
    alert("Please log in to access this page");
    return (
      <Navigate to="/login" replace state={{ from: location.pathname }} />
    );
  }

  return children;
}

export default ProtectedRoute;

