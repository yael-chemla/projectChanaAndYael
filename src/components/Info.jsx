import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context";
import "../css/info.css";

function Info() {
  const { currentUser } = useContext(MyContext);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const toggleModal = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);

    // if (newIsOpen) {
    //   navigate(`/home/users/${currentUser.id}/info`);
    // } else {
    //   navigate(`/home/users/${currentUser.id}`);
    // }
  };
  if (!currentUser) return null;

  const { address } = currentUser;

  return (
    <>
      <button className="info-button" onClick={toggleModal}>
        Info
      </button>

      {isOpen && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
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

            <button onClick={toggleModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Info;
