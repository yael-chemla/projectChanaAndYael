import { useContext, useEffect, useState } from "react";
import { MyContext } from "../context/context";
import { getUserInfo } from "../API/infoApi";
import "../css/info.css";

function Info({ isVisible, onClose }) {
  const { currentUser } = useContext(MyContext);
  const [userInfo, setUserInfo] = useState(null); //המידע של המשתמש שנשלף מה DB
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUserInfo(null);
    if (currentUser && isVisible) {
      setLoading(true);
      getUserInfo(currentUser.id)
        .then((data) => setUserInfo(data))
        .finally(() => setLoading(false));

    }
  }, [currentUser?.id,, isVisible]);
// console.log("currentUser")

// console.log(currentUser)
// console.log("userInfo")

// console.log(userInfo)

  if (!isVisible) return null;

  return (
    <div className="info-overlay">
      <div className="info-panel">
        <button className="close-btn" onClick={onClose}>X</button>
        <br></br>
        <br></br>
        {loading ? (
          <p>Loading...</p>
        ) :
         userInfo ? (
          <div className="user-info">
            <p><b>ID:</b> {userInfo.id}</p>
            <p><b>Name:</b> {userInfo.name}</p>
            <p><b>Username:</b> {userInfo.username}</p>
            <p><b>Email:</b> {userInfo.email}</p>
            <p><b>Phone:</b> {userInfo.phone}</p>
            <p><b>Address:</b>  </p>
            <p><b>City:</b>{userInfo.address?.city}</p>
            <p><b>Street:</b>{userInfo.address?.street}</p>
            <p><b>Company:</b> {userInfo.company?.name}</p>
          </div>
        ) : (
          <p>No user info found.</p>
        )
        }
      </div>
    </div>
  );
}

export default Info;
