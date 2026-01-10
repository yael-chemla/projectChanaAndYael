import { useState } from "react";
import "../../../css/photos.css"

function MyPhoto({ photo, handleDeletePhoto, handleUpdatePhotoUrl }) {
  const [isEditing, setIsEditing] = useState(false);//האם לחצו על עריכת תמונה
  const [newUrl, setNewUrl] = useState(photo.url);//ה URL החדש
//עדכון 
  function onConfirmEdit() {
    handleUpdatePhotoUrl(photo.id, newUrl);
    setIsEditing(false);
  }

  return (
    <div className="photo-card">
      <div className="photo-id">ID: {photo.id}</div>

      <img
        src={photo.url}
        alt={photo.title}
        className="photo-img"
      />

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

      <div className="photo-actions">
        {!isEditing && (
          <button onClick={() => setIsEditing(true)}>Edit url</button>
        )}
        <button onClick={() => handleDeletePhoto(photo.id)}>Delete</button>
      </div>
    </div>
  );
}

export default MyPhoto;
