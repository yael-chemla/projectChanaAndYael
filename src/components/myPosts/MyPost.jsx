import { useState, useEffect, useContext } from "react";
import { MyContext } from "../../context";
import Comment from "../myPosts/Comment";
import AddComment from "../myPosts/AddComment";
import { getCommentsByPost, addComment, updateComment, deleteComment } from "../../API/commentApi";

function MyPost({ post, isSelected, onSelect, canEdit, handleDelete, handleUpdate }) {
  const { currentUser } = useContext(MyContext);
  const [showFullPost, setShowFullPost] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newBody, setNewBody] = useState(post.body);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (showComments) {
      getCommentsByPost(post.id).then(setComments);
    }
  }, [showComments]);

  const handleCommentAdd = async (comment) => {
    const saved = await addComment(comment);
    if (saved) setComments([...comments, saved]);
  };

  const handleCommentUpdate = async (id, updatedFields) => {
    const updated = await updateComment(id, updatedFields);
    if (updated) setComments(comments.map(c => c.id === id ? updated : c));
  };

  const handleCommentDelete = async (id) => {
    const success = await deleteComment(id);
    if (success) setComments(comments.filter(c => c.id !== id));
  };

  const handleSave = () => {
    handleUpdate(post.id, { body: newBody });
    setIsEditing(false);
  };

  return (
    <div className={`post-card ${showFullPost ? "expanded" : ""}`}>
      <div className="post-header">
        <div className="post-title">
          <strong>ID:</strong> {post.id}
          <br></br>
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

          {/* כפתור תגובות */}
          <button onClick={() => setShowComments(!showComments)}>
            {showComments ? "Hide Comments" : "Show Comments"}
          </button>

          {showComments && (
              <div className="comments-list">
                <AddComment postId={post.id} onAdd={handleCommentAdd} />
                {comments.map(comment => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    onUpdate={handleCommentUpdate}
                    onDelete={handleCommentDelete}
                  />
                ))}
              </div> 
          )}
        </div>
      )}
    </div>
  );
}

export default MyPost;
