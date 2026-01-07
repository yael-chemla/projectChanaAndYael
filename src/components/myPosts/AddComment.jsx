import { useState, useContext } from "react";
import { MyContext } from "../../context";
import { addComment } from "../../API/commentApi";

function AddComment({ postId, onAdd }) {
  const { currentUser } = useContext(MyContext);
  const [body, setBody] = useState("");

  const handleSubmit = async () => {
    if (!body.trim()) return;

    const newComment = {
      postId,
      email: currentUser.email,
      body
    };

    const savedComment = await addComment(newComment); 

    if (savedComment) {
      onAdd(savedComment); 
      setBody("");
    }
  };
  // const handleSubmit = async (e) => {
  //   e?.preventDefault(); // מונע רענון או כפילות אם בתוך form
  //   if (!body.trim()) return;

  //   const newComment = {
  //     postId,
  //     email: currentUser.email,
  //     body
  //   };

  //   const savedComment = await addComment(newComment);

  //   if (savedComment) {
  //     onAdd(savedComment);
  //     setBody("");
  //   }
  // };


  return (
    <div className="add-comment-form">
      <textarea
        placeholder="Add a comment..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button type="button" onClick={handleSubmit}>Add Comment</button>
    </div>
  );
}

export default AddComment;
