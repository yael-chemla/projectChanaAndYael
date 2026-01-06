// function Photos(){
// const { albumId } = useParams();
// <h2>Album {albumId} - Photos</h2>

// }
// export default Photos;
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {getPhotosByAlbum,deletePhoto,updatePhotoUrl,} from "../../../API/photosApi";
import MyPhoto from "./MyPhoto";

function Photos() {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    getPhotosByAlbum(albumId).then(setPhotos);
  }, [albumId]);

  const handleDeletePhoto = async (id) => {
    await deletePhoto(id);
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  const handleUpdatePhotoUrl = async (id, newUrl) => {
    const updated = await updatePhotoUrl(id, newUrl);
    setPhotos(prev =>
      prev.map(p => (p.id === id ? updated : p))
    );
  };

  return (
    <div className="photos-page">


      <h2>Photos of album {albumId}</h2>

      <div className="photos-grid">
        {photos.map(photo => (
          <MyPhoto
            key={photo.id}
            photo={photo}
            handleDeletePhoto={handleDeletePhoto}
            handleUpdatePhotoUrl={handleUpdatePhotoUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default Photos;
