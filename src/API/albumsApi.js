export const getAlbumsByUser = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3000/albums?userId=${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    alert('Error fetching albums:', error);
    return [];
  }
};

export const addAlbum = async (album) => {
  try {
    const response = await fetch("http://localhost:3000/albums", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(album),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    alert("Error adding album:", error);
    return null;
  }
};