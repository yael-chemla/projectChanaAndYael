import { useContext, useEffect, useState } from "react";
import { MyContext } from "../context";
import { getAlbumsByUser } from "../API/albumsApi";
import { getPhotosByAlbum } from "../API/photosApi";

function Albums() {
    const { currentUser } = useContext(MyContext);

    const [albums, setAlbums] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [showAlbums, setShowAlbums] = useState(false);
    const [selectedAlbumId, setSelectedAlbumId] = useState(null);

    useEffect(() => {
        if (!currentUser) return;

        const fetchAlbums = async () => {
            const data = await getAlbumsByUser(currentUser.id);
            setAlbums(data);
        };

        fetchAlbums();
    }, [currentUser]);

    const handleAlbumClick = async (albumId) => {
        setSelectedAlbumId(albumId);
        const albumPhotos = await getPhotosByAlbum(albumId);
        setPhotos(albumPhotos);
    };

    return (
        <div>
            <button
                onClick={() => {
                    setShowAlbums(prev => {
                        const newValue = !prev;

                        if (!newValue) {
                            setSelectedAlbumId(null);
                            setPhotos([]);
                        }

                        return newValue;
                    });
                }}
            >
                ALBUMS
            </button>


            {showAlbums && (
                <ul>
                    {albums.map(album => (
                        <li
                            key={album.id}
                            onClick={() => handleAlbumClick(album.id)}
                            style={{ cursor: "pointer", fontWeight: "bold" }}
                        >
                            {album.title}
                        </li>
                    ))}
                </ul>
            )}

            {selectedAlbumId && (
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "10px"
                    }}
                >
                    {photos.map(photo => (
                        <img
                            key={photo.id}
                            src={photo.url}          // משתמשים בתמונה האמיתית
                            alt={photo.title}
                            style={{
                                width: "150px",
                                height: "150px",
                                objectFit: "cover",
                                borderRadius: "8px"
                            }}
                        />
                    ))}
                </div>
            )}

        </div>
    );
}

export default Albums;
