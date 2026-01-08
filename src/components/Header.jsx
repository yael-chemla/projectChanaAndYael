import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context/context";
import "../css/header.css";
import Info from "../components/Info"

function Header() {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useContext(MyContext);
    const [showInfo, setShowInfo] = useState(false); // state לפתיחת ה-info

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
                <button onClick={() => setShowInfo(true)}>Info</button> {/* כאן פתיחת modal */}
                <button onClick={() => goTo(`/home/users/${currentUser.id}/posts`)}>Posts</button>
            </div>
            <Info
                isVisible={showInfo}
                onClose={() => setShowInfo(false)}
            />
        </header>
    );
}

export default Header;

