import { getByUser, addItem, deleteItem, updateItem } from "./generalApi";
import { deleteComment,getCommentsByPost } from "./commentApi";

const BASE_URL = "http://localhost:3000";

export const getPosts = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
    const data = await response.json();
    return data;
  } catch (error) {
    alert("Error fetching posts:", error);
    return [];
  }
};

export const addPost = async (post) => {
  return addItem(post, "posts");
};

export const deletePost = async (postId) => {
  try {
    // 1️⃣ קבל את כל התגובות של הפוסט
    const comments = await getCommentsByPost(postId);

    // 2️⃣ מחק את כל התגובות בו זמנית
    await Promise.all(
      comments.map(comment => deleteComment(comment.id))
    );

    // 3️⃣ מחק את הפוסט עצמו
    return await deleteItem(postId, "posts");

  } catch (error) {
    alert("Error deleting post and its comments: " + error);
    return false;
  }
};


// עדכון תוכן 
export const updatePost = async (id, updatedFields) => {
  return updateItem(id, updatedFields, "posts")

};
