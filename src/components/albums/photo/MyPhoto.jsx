import { useState } from "react";
import "../../../css/photos.css"


function MyPhoto({ photo, handleDeletePhoto, handleUpdatePhotoUrl }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newUrl, setNewUrl] = useState(photo.url);

  function onConfirmEdit() {
    handleUpdatePhotoUrl(photo.id, newUrl);
    setIsEditing(false);
  }

  return (
    <div className="photo-card">
      <div className="photo-id">ID: {photo.id}</div>

      {/* תמונה */}
      <img
        src={photo.url}
        alt={photo.title}
        className="photo-img"
      />

      {/* עריכת URL */}
      {isEditing ? (
        <div className="edit-photo">
          <input
            type="text"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
          />
          <button onClick={onConfirmEdit}>Update</button>
        </div>
      ) : (
        <div className="photo-title">{photo.title}</div>
      )}

      {/* כפתורים */}
      <div className="photo-actions">
        {!isEditing && (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <button onClick={() => handleDeletePhoto(photo.id)}>Delete</button>
      </div>
    </div>
  );
}

export default MyPhoto;
