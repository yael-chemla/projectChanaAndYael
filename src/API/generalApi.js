const BASE_URL = "http://localhost:3000";

export const getByUser = async (userId,type) => {
  try {
    const response = await fetch(`${BASE_URL}/${type}?userId=${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    return [];
  }
};

// הוספת חדש
export const addItem = async (item, type) => {
  try {
    const response = await fetch(`${BASE_URL}/${type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    return await response.json();
  } catch (error) {
    console.error("Error adding item:", error);
    return null;
  }
};

// מחיקה 
export const deleteItem = async (id, type) => {
  try {
    const response = await fetch(`${BASE_URL}/${type}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete item");
    }

    return true;
  } catch (error) {
    console.error("Error deleting item:", error);
    return false;
  }
};
