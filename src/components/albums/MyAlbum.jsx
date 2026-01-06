import { Link } from 'react-router-dom';

function MyAlbum({ album }) {
  return (
    <li className="album-item">
      <div className="album-id">#{album.id}</div>

      <Link to={`${album.id}`} className="album-link">
        <span className="album-title">{album.title}</span>
      </Link>
    </li>
  );
}

export default MyAlbum;

