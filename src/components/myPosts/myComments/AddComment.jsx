// import { useState, useContext } from "react";
// import { MyContext } from "../../context/context";

// function AddComment({ postId, onAdd }) {
//   const { currentUser } = useContext(MyContext);
//   const [body, setBody] = useState("");

//   const handleAddComment = async () => {
//     if (!body.trim()) return;

//     const newComment = {
//       postId,
//       email: currentUser.email,
//       body
//     };

//     const savedComment = await onAdd(newComment);

//     if (savedComment) {
//       onAdd(savedComment);
//       setBody("");
//     }
//   };
//   return (
//     <div className="add-comment-form">
//       <textarea
//         placeholder="Add a comment..."
//         value={body}
//         onChange={(e) => setBody(e.target.value)}
//       />
//       <button type="button" onClick={handleAddComment}>Add Comment</button>
//     </div>
//   );
// }

// export default AddComment;
function AddComment({ body, setBody, onAdd }) {
  return (
    <div className="add-comment-form">
      <textarea
        placeholder="Add a comment..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button type="button" onClick={onAdd}>
        Add Comment
      </button>
    </div>
  );
}

export default AddComment;
