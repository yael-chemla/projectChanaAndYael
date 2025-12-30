import { useContext } from "react";
import { MyContext } from "../context";
import { useNavigate } from "react-router-dom";
import Info from "./Info";
import Todos from "./Todos";
import Albums from "./Albums";



function Header() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(MyContext);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null); // נעדכן את ה-context
    navigate("/login");
  };

  return (
    <header className="app-header">
      <div className="user-info">
        <span className="user-name">{currentUser.name}</span>
      </div>

      <div className="left">
        <Todos/>
      </div>

      <div className="right">
        <button onClick={handleLogout}>Logout</button>
        <Info />
        <Albums/>
      </div>

    </header>
  );
}

export default Header;
