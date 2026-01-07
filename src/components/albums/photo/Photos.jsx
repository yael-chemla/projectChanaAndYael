import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPhotosByAlbum, deletePhoto, updatePhotoUrl, addPhoto } from "../../../API/photosApi";
import MyPhoto from "./MyPhoto";
import "../../../css/photos.css"
import AddPhoto from "../photo/AddPhoto";


function Photos() {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
   const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");

  useEffect(() => {
    getPhotosByAlbum(albumId).then(setPhotos);
  }, [albumId]);

  const handleDeletePhoto = async (id) => {
    await deletePhoto(id);
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  const handleUpdatePhotoUrl = async (id, newUrl) => {
    const updated = await updatePhotoUrl(id, newUrl);
    setPhotos(prev => prev.map(p => (p.id === id ? updated : p)));
  };
  const handleAddPhoto = async () => {
    if (!newTitle.trim() || !newUrl.trim()) return;

    const photo = {
      albumId,
      title: newTitle,
      url: newUrl
    };

    const savedPhoto = await addPhoto(photo);
    setPhotos(prev => [...prev, savedPhoto]);
    setNewTitle("");
    setNewUrl("");
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
         <div className="photos-sidebar">
              <AddPhoto
                newTitle={newTitle}
                setNewTitle={setNewTitle}
                newUrl={newUrl}
                setNewUrl={setNewUrl}
                handleAddPhoto={handleAddPhoto}
              />
              <br />
            </div>
    </div>
  );
}

export default Photos;
