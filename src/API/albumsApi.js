import {addItem, getByUser} from "./generalApi"
export const getAlbumsByUser = async (userId) => {
  return getByUser( userId, "albums");
};

export const addAlbum = async (album) => {
  return addItem(album, "albums");
};