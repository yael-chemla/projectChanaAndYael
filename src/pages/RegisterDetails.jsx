import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createUser } from "../API/usersApi";
import "../css/registerdetails.css";


function RegisterDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const authUser = location.state?.authUser;


  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    street: "",
    suite: "",
    city: "",
    zipcode: ""
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authUser) {
      navigate("/register");
    }
  }, [authUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authUser) return;

    try {
      const fullUser = {
        ...authUser,
        ...userDetails,
        address: {
          street: userDetails.street,
          suite: userDetails.suite,
          city: userDetails.city,
          zipcode: userDetails.zipcode,
          geo: { lat: "", lng: "" }
        }
      };

      const createdUser = await createUser(fullUser); 

      localStorage.setItem("currentUser", JSON.stringify(createdUser));
      navigate(`/home/${createdUser.id}/users`);

    } catch (err) {
      setError(err.message);
    }
  };

  if (!authUser) return null;

  return (
    <>
      <h1>Register Details</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" value={userDetails.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={userDetails.email} onChange={handleChange} required />
        <input name="street" placeholder="Street" value={userDetails.street} onChange={handleChange} required />
        <input name="suite" placeholder="Suite" value={userDetails.suite} onChange={handleChange} required />
        <input name="city" placeholder="City" value={userDetails.city} onChange={handleChange} required />
        <input name="zipcode" placeholder="Zipcode" value={userDetails.zipcode} onChange={handleChange} required />
        <button type="submit">Complete Registration</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}

export default RegisterDetails;
