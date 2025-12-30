export const getPostsByUser = async (userId) => {
  try {
    const response = await fetch(`http://localhost:3000/posts?userId=${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Posts:', error);
    return [];
  }
};



