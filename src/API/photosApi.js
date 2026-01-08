import { deleteItem, updateItem, addItem } from "./generalApi"

const PHOTOS_URL = "http://localhost:3000/photos";

export const getPhotosByAlbum = async (albumId, start = 0, limit = 6) => {
  try {
    const res = await fetch(
      `${PHOTOS_URL}?albumId=${albumId}&_start=${start}&_limit=${limit}`
    );
    return await res.json();
  } catch (err) {
    alert("Error fetching photos");
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

