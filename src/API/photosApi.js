
export const getPhotosByAlbum = async (albumId) => {
  try {
    const res = await fetch(
      `http://localhost:3000/photos?albumId=${albumId}`
    );
    return await res.json();
  } catch (err) {
    alert("Error fetching photos:", err);
    return [];
  }
};

export const deletePhoto = async (photoId) => {
  await fetch(`http://localhost:3000/photos/${photoId}`, {
    method: "DELETE",
  });
};

export const updatePhotoUrl = async (photoId, newUrl) => {
  const res = await fetch(`http://localhost:3000/photos/${photoId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: newUrl }),
  });

  return await res.json();
};
