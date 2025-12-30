import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context";
import "../css/header.css";

function Header() {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useContext(MyContext);

    if (!currentUser) return null;

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        setCurrentUser(null);
        navigate("/login");
    };

    const goTo = (path) => navigate(path);

    return (
        <header className="app-header">
            <div className="user-info-logout">
                <span>hello, <strong>{currentUser.name}</strong></span>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>

            <div className="menu">
                <button onClick={() => goTo(`/home/users/${currentUser.id}/todos`)}>Todos</button>
                <button onClick={() => goTo(`/home/users/${currentUser.id}/albums`)}>Albums</button>
                <button onClick={() => goTo(`/home/users/${currentUser.id}/info`)}>Info</button>
                <button onClick={() => goTo(`/home/users/${currentUser.id}/posts`)}>Posts</button>
            </div>
        </header>
    );
}

export default Header;

