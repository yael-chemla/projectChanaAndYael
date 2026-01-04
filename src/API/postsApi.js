import  { getByUser ,addItem,deleteItem} from "../API/generalApi";
const BASE_URL = "http://localhost:3000/posts";

export const getPosts = async (userId) => {
   try {
    const response = await fetch(BASE_URL );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

// הוספת TODO חדש
export const addPost = async (post) => {
  return addItem(post,"posts");
};

// מחיקת TODO
export const deletePost = async (id) => {
  return deleteItem(id,"posts")
};

// עדכון תוכן TODO
export const updatePost = async (id, updatedFields) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields),
    });

    return await response.json();
  } catch (error) {
    console.error("Error updating post:", error);
  }
};
