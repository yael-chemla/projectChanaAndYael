import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { MyContext } from "../context";
import { getAlbumsByUser, addAlbum } from "../API/albumsApi";
import MyAlbum from "../components/albums/MyAlbum";
import GeneralSearch from "../components/GeneralSearch";
import AddAlbum from "./albums/AddAlbum";
import Photos from "./albums/photo/Photos";
import "../css/album.css";
import "../css/photos.css";
import AddPhoto from "../../src/components/albums/photo/AddPhoto";

function Albums() {
  const { currentUser } = useContext(MyContext);
  const navigate = useNavigate();
  const [albums, setAlbums] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);

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
    const savedAlbum = await addAlbum(newAlbum);
    setAlbums(prev => [...prev, savedAlbum]);
    setFiltered(prev => [...prev, savedAlbum]);
    setNewTitle("");
  };

  const handleSelectAlbum = (id) => {
    setSelectedAlbumId(id);
  };

  const handleBackToAlbums = () => {
    setSelectedAlbumId(null);
    navigate(`/home/users/${currentUser.id}/albums`);
  };
  

  return (
    <div className="albums-page">
      <main className="albums-content">
        {!selectedAlbumId ? (
          <>
            {/* ======= סרגל צד ======= */}
            <div className="albums-sidebar">
              <AddAlbum
                newTitle={newTitle}
                setNewTitle={setNewTitle}
                handleAddAlbum={handleAddAlbum}
              />
              <br />
              <GeneralSearch items={albums} onFilter={setFiltered} />
            </div>

            <ul className="albums-grid">
              {filtered.map(album => (
                <li key={album.id} onClick={() => handleSelectAlbum(album.id)}>
                  <MyAlbum album={album} />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>

            <button id="back-button" onClick={handleBackToAlbums}>← Back to albums</button>
            <Photos albumId={selectedAlbumId} />
         
          </>
        )
        }
      </main >
    </div >
  );
}

export default Albums;
