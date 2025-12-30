export const getAlbumsByUser = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3000/albums?userId=${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching albums:', error);
    return [];
  }
};
