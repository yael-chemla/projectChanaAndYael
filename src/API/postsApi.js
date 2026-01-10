import {  addItem, deleteItem, updateItem } from "./generalApi";
import { deleteComment,getCommentsByPost } from "./commentApi";

const BASE_URL = "http://localhost:3000";

export const getPosts = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/posts`);
     if (!response.ok) throw new Error("שגיאה  ");

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
    const comments = await getCommentsByPost(postId);

    //  מחק את כל התגובות בו זמנית
    await Promise.all(
      comments.map(comment => deleteComment(comment.id))
    );

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
