import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../API/usersApi";
import "../css/register.css";

function Register() {
  const [form, setForm] = useState({
    username: "",
    website: ""
  });
  const [websiteVerify, setWebsiteVerify] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.website !== websiteVerify) {
      setError("הסיסמאות לא תואמות");
      return;
    }

    try {
      const users = await getUsers();

      const userExists = users.some(u => u.username === form.username);
      if (userExists) {
        setError("שם המשתמש כבר קיים");
        return;
      }

      const newUser = {
        username: form.username,
        website: form.website
      };

      navigate("/register-details", {
        state: {
          authUser: newUser
        }
      });


    } catch (err) {
      setError("שגיאה בשרת");
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="register-container">
      <h1>Register</h1>

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
          name="website"
          placeholder="Password"
          value={form.website}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          placeholder="Verify password"
          value={websiteVerify}
          onChange={(e) => setWebsiteVerify(e.target.value)}
          required
        />

        <button type="submit">Register</button>
        {error && <p className="error">{error}</p>}
      </form>

      <p>
        יש לך חשבון? <a onClick={goToLogin}>Login</a>
      </p>
    </div>
  );
}

export default Register;
