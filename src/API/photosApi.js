import { deleteItem, updateItem, addItem } from "./generalApi"

const PHOTOS_URL = "http://localhost:3000/photos";

export const getPhotosByAlbum = async (albumId, start = 0, limit = 6) => {
  try {
    const response = await fetch(
      `${PHOTOS_URL}?albumId=${albumId}&_start=${start}&_limit=${limit}`
    );
    if (!response.ok) throw new Error("שגיאה  ");

    const data = await response.json();
    return data;
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

