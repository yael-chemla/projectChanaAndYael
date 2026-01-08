import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPhotosByAlbum, deletePhoto, updatePhotoUrl, addPhoto } from "../../../API/photosApi";
import MyPhoto from "./MyPhoto";
import "../../../css/photos.css"
import AddPhoto from "../photo/AddPhoto";

const LIMIT = 6;

function Photos() {
  const { albumId } = useParams();

  const [photos, setPhotos] = useState([]);
  const [start, setStart] = useState(0);       // מאיפה להביא
  const [hasMore, setHasMore] = useState(true); // יש עוד תמונות?
  const [loading, setLoading] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");

  useEffect(() => {
    if (!albumId) return;
    setPhotos([]);
    setStart(0);
    setHasMore(true);
    loadMorePhotos(0);
  }, [albumId]);

  const loadMorePhotos = async (currentStart = start) => {
    if (loading || !hasMore) return;

    setLoading(true);

    const newPhotos = await getPhotosByAlbum(albumId, currentStart, LIMIT);

    setPhotos(prev => [...prev, ...newPhotos]);
    setStart(prev => prev + newPhotos.length);

    if (newPhotos.length === 0 || newPhotos.length < LIMIT) {
      setHasMore(false);
    }

    setLoading(false);
  };



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
      {hasMore && (
        <button onClick={() => loadMorePhotos()} disabled={loading}>
          {loading ? "Loading..." : "Load more"}
        </button>
      )}

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
