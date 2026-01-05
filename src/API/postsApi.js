import  { getByUser ,addItem,deleteItem, updateItem} from "../API/generalApi";
const BASE_URL = "http://localhost:3000";

export const getPosts = async (userId) => {
   try {
    const response = await fetch(`${BASE_URL}/posts` );
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

// עדכון תוכן 
export const updatePost = async (id, updatedFields) => {
  return updateItem(id,updatedFields,"posts")
  
};
