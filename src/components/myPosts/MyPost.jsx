import { useState, useEffect, useContext } from "react";
import Comments from "./myComments/Comments";

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

          {showComments && <Comments postId={post.id} />}
        </div>
      )}
    </div>
  );
}

export default MyPost;
