export const getPhotosByAlbum = async (albumId) => {
  try {
    const res = await fetch(
      `http://localhost:3000/photos?albumId=${albumId}`
    );
    return await res.json();
  } catch {
    return [];
  }
};
