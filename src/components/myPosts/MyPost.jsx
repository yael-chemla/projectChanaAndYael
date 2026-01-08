import { useState, useEffect, useContext } from "react";
import { MyContext } from "../../context/context";
import Comment from "./myComments/Comment";
import AddComment from "./myComments/AddComment";
import { getCommentsByPost, addComment, updateComment, deleteComment } from "../../API/commentApi";
import MyComment from "./myComments/MyComment";

// function MyPost({ post, isSelected, onSelect, canEdit, handleDelete, handleUpdate }) {
//   const { currentUser } = useContext(MyContext);
//   // States לפוסט עצמו
//   const [showFullPost, setShowFullPost] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [newBody, setNewBody] = useState(post.body);
//   // States לתגובות
//   const [comments, setComments] = useState([]);
//   const [showComments, setShowComments] = useState(false);
//   const [newCommentBody, setNewCommentBody] = useState(""); // ה-State של הטקסט בתגובה החדשה


//   useEffect(() => {
//     if (showFullPost) {
//       getCommentsByPost(post.id).then(data => {
//         const uniqueComments = Array.from(new Map(data.map(c => [c.id, c])).values());
//         setComments(uniqueComments);
//       });
//     }
//   }, [post.id, showFullPost]);

//   const handleCommentAdd = async () => {
//     if (!newCommentBody.trim()) return;

//     const newComment = {
//       postId: post.id,
//       email: currentUser.email,
//       body: newCommentBody
//     };

//     const saved = await addComment(newComment);
//     if (saved) {
//       setComments([...comments, saved]);
//       setNewCommentBody(""); // איפוס השדה
//     }
//   };
//   const handleCommentUpdate = async (id, updatedFields) => {
//     const updated = await updateComment(id, updatedFields);
//     if (updated)
//       setComments(comments.map(c => c.id === id ? updated : c));
//   };

//   const handleCommentDelete = async (id) => {
//     const success = await deleteComment(id);
//     if (success)
//       setComments(comments.filter(c => c.id !== id));
//   };

//   const handleSave = () => {
//     handleUpdate(post.id, { body: newBody });
//     setIsEditing(false);
//   };

//   return (
//     <div className={`post-card ${showFullPost ? "expanded" : ""}`}>
//       <div className="post-header">
//         <div className="post-title">
//           <strong>ID:</strong> {post.id}
//           <br></br>
//           <strong>Title:</strong> {post.title}
//         </div>

//         <button onClick={() => setShowFullPost(!showFullPost)}>
//           {showFullPost ? "Hide Post" : "Select"}
//         </button>
//       </div>

//       {showFullPost && (
//         <div className="post-body">
//           {isEditing ? (
//             <>
//               <textarea value={newBody} onChange={(e) => setNewBody(e.target.value)} />
//               <button onClick={handleSave}>Save</button>
//               <button onClick={() => setIsEditing(false)}>Cancel</button>
//             </>
//           ) : (
//             <>
//               <p>{post.body}</p>
//               {canEdit && (
//                 <>
//                   <button onClick={() => setIsEditing(true)}>Edit</button>
//                   <button onClick={() => handleDelete(post.id)}>Delete</button>
//                 </>
//               )}
//             </>
//           )}

//           <button onClick={() => setShowComments(!showComments)}>
//             {showComments ? "Hide Comments" : "Show Comments"}
//           </button>

//           {showComments && (
//             <div className="comments-list">
//               <AddComment 
//                 body={newCommentBody} 
//                 setBody={setNewCommentBody} 
//                 onAdd={handleCommentAdd} 
//               />
//               {comments.map(comment => (
//                 <Comment
//                   key={comment.id}
//                   comment={comment}
//                   onUpdate={handleCommentUpdate}
//                   onDelete={handleCommentDelete}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default MyPost;


function MyPost({ post, canEdit, handleDelete, handleUpdate }) {
  const [showFullPost, setShowFullPost] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newBody, setNewBody] = useState(post.body);
  const [showComments, setShowComments] = useState(false);

  const handleSave = () => {
    handleUpdate(post.id, { body: newBody });
    setIsEditing(false);
  };

  return (
    <div className={`post-card ${showFullPost ? "expanded" : ""}`}>
      <div className="post-header">
        <div className="post-title">
          <strong>ID:</strong> {post.id} <br />
          <strong>Title:</strong> {post.title}
        </div>
        <button onClick={() => setShowFullPost(!showFullPost)}>
          {showFullPost ? "Hide Post" : "Select"}
        </button>
      </div>

      {showFullPost && (
        <div className="post-body">
          {isEditing ? (
            <>
              <textarea value={newBody} onChange={(e) => setNewBody(e.target.value)} />
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          ) : (
            <>
              <p>{post.body}</p>
              {canEdit && (
                <>
                  <button onClick={() => setIsEditing(true)}>Edit</button>
                  <button onClick={() => handleDelete(post.id)}>Delete</button>
                </>
              )}
            </>
          )}

          <button onClick={() => setShowComments(!showComments)}>
            {showComments ? "Hide Comments" : "Show Comments"}
          </button>

          {/* קריאה לקומפוננטה החדשה שמרכזת את כל התגובות */}
          {showComments && <MyComment postId={post.id} />}
        </div>
      )}
    </div>
  );
}

export default MyPost;
