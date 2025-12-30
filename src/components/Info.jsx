import { useContext } from "react";
import { MyContext } from "../context";
import "../css/info.css";

function Info() {
  const { currentUser } = useContext(MyContext);
  if (!currentUser) return null;

  return (
    <div>
      <h2>User Information</h2>
      <p><strong>Name:</strong> {currentUser.name}</p>
      <p><strong>Username:</strong> {currentUser.username}</p>
      <p><strong>Email:</strong> {currentUser.email}</p>
      <p><strong>Website:</strong> {currentUser.website}</p>

      {currentUser.address && (
        <>
          <h3>Address:</h3>
          <p><strong>Street:</strong> {currentUser.address.street}</p>
          <p><strong>Suite:</strong> {currentUser.address.suite}</p>
          <p><strong>City:</strong> {currentUser.address.city}</p>
          <p><strong>Zipcode:</strong> {currentUser.address.zipcode}</p>

          {currentUser.address.geo && (
            <>
              <h4>Geo:</h4>
              <p><strong>Lat:</strong> {currentUser.address.geo.lat}</p>
              <p><strong>Lng:</strong> {currentUser.address.geo.lng}</p>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Info;
