import { deleteItem, updateItem, addItem } from "./generalApi"

const PHOTOS_URL = "http://localhost:3000/photos";
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
  return deleteItem(photoId, "photos");
};

export const updatePhotoUrl = async (photoId, newUrl) => {
  return updateItem(photoId, { url: newUrl }, "photos");
};
export async function addPhoto(photo) {
  return addItem(photo, "photos");
}

