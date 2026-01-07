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
// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { MyContext } from "./context";

// function ProtectedRoute({ children }) {
//   const { currentUser, loading } = useContext(MyContext);

//   if (loading) {
//     // מחכים לטעינת המשתמש מ-localStorage
//     return null; // או <p>Loading...</p>
//   }

//   if (!currentUser) {
//     // אם אחרי הטעינה אין משתמש – הפנייה ללוגין
//     return <Navigate to="/login" replace />;
//   }

//   // יש משתמש, מרנדרים את התוכן
//   return children;
// }

// export default ProtectedRoute;


//sari
// import { useContext, useEffect, useRef } from "react";
// import { Navigate, useLocation, useNavigate } from "react-router-dom";
// import { MyContext } from "./context";

// function ProtectedRoute({ children }) {
//   const { currentUser, loading } = useContext(MyContext);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const alertShown = useRef(false);

//   useEffect(() => {
//     if (!loading && !currentUser && !alertShown.current) {
//       alertShown.current = true;
//       alert("נא להתחבר כדי לגשת לדף זה");
//       navigate("/login", {
//         replace: true,
//         state: { from: location.pathname }
//       });
//     }
//   }, [loading, currentUser, navigate, location.pathname]);

//   if (loading) return null;

//   if (!currentUser) return null;

//   return children;
// }

// export default ProtectedRoute;

import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { MyContext } from "./context";

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

