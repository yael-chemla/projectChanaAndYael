import { useState, useContext } from "react";
import { MyContext } from "../../context";
import { addComment } from "../../API/commentApi"; // הקפדה להשתמש ב-API

function AddComment({ postId, onAdd }) {
  const { currentUser } = useContext(MyContext);
  const [body, setBody] = useState("");

  const handleSubmit = async () => {
    if (!body.trim()) return;

    // שולחים לשרת רק מה שהשרת צריך
    const newComment = {
      postId,
      email: currentUser.email,
      body
    };

    const savedComment = await addComment(newComment); // שולחים לשרת ומקבלים את האובייקט עם id

    if (savedComment) {
      onAdd(savedComment); // מכניסים ל-state את התגובה המלאה שהשרת החזיר
      setBody("");
    }
  };

  return (
    <div className="add-comment-form">
      <textarea
        placeholder="Add a comment..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button onClick={handleSubmit}>Add Comment</button>
    </div>
  );
}

export default AddComment;
