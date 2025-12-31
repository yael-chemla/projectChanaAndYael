import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { MyContext } from "./context";

function ProtectedRoute({ children }) {
  const { currentUser } = useContext(MyContext);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
