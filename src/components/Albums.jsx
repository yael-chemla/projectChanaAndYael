import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { MyContext } from "../context";
import { getAlbumsByUser } from "../API/albumsApi";
import MyAlbum from "../components/albums/MyAlbum";
import GeneralSearch from "../components/GeneralSearch";
import AddAlbum from "./albums/AddAlbum";
import Photos from "./albums/photo/Photos";

function Albums() {
  const { currentUser } = useContext(MyContext);
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [newTitle, setNewTitle] = useState("");

  const [selectedAlbumId, setSelectedAlbumId] = useState(null); // ✅ אילו אלבום נבחר

  useEffect(() => {
    if (!currentUser) return;

    getAlbumsByUser(currentUser.id).then(data => {
      setAlbums(data);
      setFiltered(data);
    });
  }, [currentUser]);

  const handleAddAlbum = async () => {
    if (!newTitle.trim()) return;
    const newAlbum = { userId: currentUser.id, title: newTitle };
    // כאן את צריכה לקרוא ל-addAlbum מה-API שלך כמו שעשית
    // נניח שזה מחזיר את האלבום החדש
    const savedAlbum = await addAlbum(newAlbum);
    setAlbums(prev => [...prev, savedAlbum]);
    setFiltered(prev => [...prev, savedAlbum]);
    setNewTitle("");
  };

  // ✅ פונקציה לבחירת אלבום
  const handleSelectAlbum = (id) => {
    setSelectedAlbumId(id);
  };

  const handleBackToAlbums = () => {
    setSelectedAlbumId(null);
    navigate(`/home/users/${currentUser.id}/albums`);
  };

  return (
    <div>
      {!selectedAlbumId ? (
        <>
          <GeneralSearch items={albums} onFilter={setFiltered} />
          <AddAlbum
            newTitle={newTitle}
            setNewTitle={setNewTitle}
            handleAddAlbum={handleAddAlbum}
          />
          <ul>
            {filtered.map(album => (
              <li key={album.id} onClick={() => handleSelectAlbum(album.id)}>
                <MyAlbum album={album} />
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
        <br></br>
          <button onClick={handleBackToAlbums}>← Back to albums</button>
          <Photos albumId={selectedAlbumId} />
        </>
      )}
    </div>
  );
}

export default Albums;

