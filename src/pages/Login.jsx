import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserByCredentials } from "../API/usersApi";
import { MyContext } from "../context/context";
import "../css/login.css";

function Login() {
  
  const { currentUser, setCurrentUser } = useContext(MyContext);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate(`/home/users/${currentUser.id}`);
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await getUserByCredentials(form.username, form.password);

      if (!user) {
        setError("שם משתמש או סיסמה שגויים");
        return;
      }

      const DetailsUser = {
        id: user.id,
        name: user.name,
        email: user.email
      };

      localStorage.setItem("currentUser", JSON.stringify(DetailsUser));
      setCurrentUser(DetailsUser);

      navigate(`/home/users/${DetailsUser.id}`);
    } catch (err) {
      setError("שגיאה בהתחברות לשרת");
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>

      <p>
       you have no accuont? <a onClick={goToRegister}>Register</a>
      </p>
    </div>
  );
}

export default Login;
