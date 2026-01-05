import { addItem,deleteItem,updateItem} from "../API/generalApi";
const BASE_URL = "http://localhost:3000";

export const getCommentsByPost = async (postId) => {
  try {
    const response = await fetch(`${BASE_URL}/comments?postId=${postId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

export const addComment = async (comment) => {
  return addItem(comment,"comments");
};

export const updateComment = async (id, updatedFields) => {
  return updateItem(id,updatedFields,"comments")
};

export const deleteComment = async (id) => {
  return deleteItem(id,"comments");
};
