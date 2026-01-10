import { Link } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../../context/context";

function MyAlbum({ album }) {
  const { currentUser } = useContext(MyContext);

  return (
    <div className="album-card">
      <div className="album-id">#{album.id}</div>

      <Link
        to={`/home/users/${currentUser.id}/albums/${album.id}/photos`} className="album-link">
        <div className="album-title">{album.title}</div>
      </Link>
    </div>
  );
}

export default MyAlbum;
