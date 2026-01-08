import { useContext } from "react";
import { MyContext } from "../../../context/context";

function AddPhoto({ newTitle, setNewTitle, newUrl, setNewUrl, handleAddPhoto }) {
  const { currentUser } = useContext(MyContext);

  if (!currentUser) return null;

  return (
    <div className="photos-container">
      <div className="add-photo">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Photo title"
        />

        <input
          type="text"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          placeholder="Image URL"
        />

        <button onClick={handleAddPhoto}>Add Photo</button>
      </div>
    </div>
  );
}

export default AddPhoto;