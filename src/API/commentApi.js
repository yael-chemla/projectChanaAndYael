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
  try {
    const response = await fetch(`${BASE_URL}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    });
    return await response.json();
  } catch (error) {
    console.error("Error adding comment:", error);
    return null;
  }
};

export const updateComment = async (id, updatedFields) => {
  try {
    const response = await fetch(`${BASE_URL}/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields),
    });
    return await response.json();
  } catch (error) {
    console.error("Error updating comment:", error);
    return null;
  }
};

export const deleteComment = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/comments/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete comment");
    return true;
  } catch (error) {
    console.error("Error deleting comment:", error);
    return false;
  }
};
