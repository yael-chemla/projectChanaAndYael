import { useContext, useEffect, useState } from "react";
import { MyContext } from "../context";
import { getAlbumsByUser } from "../API/albumsApi";
import { getPhotosByAlbum } from "../API/photosApi";

function Albums() {
  const { currentUser } = useContext(MyContext);
  const [albums, setAlbums] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

  useEffect(() => {
    if (!currentUser) return;

    getAlbumsByUser(currentUser.id).then(setAlbums);
  }, [currentUser]);

  const handleAlbumClick = async (albumId) => {
    setSelectedAlbumId(albumId);
    const albumPhotos = await getPhotosByAlbum(albumId);
    setPhotos(albumPhotos);
  };

  return (
    <div>
      <h2>{currentUser?.name}'s Albums</h2>
      <ul>
        {albums.map(album => (
          <li key={album.id} onClick={() => handleAlbumClick(album.id)} style={{ cursor: "pointer", fontWeight: "bold" }}>
            {album.title}
          </li>
        ))}
      </ul>

      {selectedAlbumId && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {photos.map(photo => (
            <img
              key={photo.id}
              src={photo.url}
              alt={photo.title}
              style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "8px" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Albums;

