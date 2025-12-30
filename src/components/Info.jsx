import { useContext } from "react";
import { MyContext } from "../context";
 import "../css/info.css";

function Info() {
  const { currentUser } = useContext(MyContext);
  if (!currentUser) return null;

  const { address } = currentUser;

  return (
    <div>
      <h2>User Information</h2>
      <p><strong>Username:</strong> {currentUser.username}</p>
      <p><strong>Email:</strong> {currentUser.email}</p>
      <p><strong>Website:</strong> {currentUser.website}</p>

      <h3>Address:</h3>
      <p><strong>Street:</strong> {address.street}</p>
      <p><strong>Suite:</strong> {address.suite}</p>
      <p><strong>City:</strong> {address.city}</p>
      <p><strong>Zipcode:</strong> {address.zipcode}</p>

      <h4>Geo:</h4>
      <p><strong>Lat:</strong> {address.geo.lat}</p>
      <p><strong>Lng:</strong> {address.geo.lng}</p>
    </div>
  );
}

export default Info;

