import { useState, useEffect, useContext } from "react";
import { MyContext } from "../../../context/context";
import Comment from "./Comment";
import AddComment from "./AddComment";
import { getCommentsByPost, addComment, updateComment, deleteComment } from "../../../API/commentApi";
import GeneralAdd from "../../GeneralAdd"
function MyComment({ postId }) {
  const { currentUser } = useContext(MyContext);
  const [comments, setComments] = useState([]);
  const [newCommentBody, setNewCommentBody] = useState("");

  useEffect(() => {
    getCommentsByPost(postId).then(data => {
      const uniqueComments = Array.from(new Map(data.map(c => [c.id, c])).values());
      setComments(uniqueComments);
    });
  }, [postId]);

  const handleCommentAdd = async () => {
    if (!newCommentBody.trim()) return;
    const newComment = { postId, email: currentUser.email, body: newCommentBody };
    const saved = await addComment(newComment);
    if (saved) {
      setComments([...comments, saved]);
      setNewCommentBody("");
    }
  };

  const handleCommentUpdate = async (id, updatedFields) => {
    const updated = await updateComment(id, updatedFields);
    if (updated) setComments(comments.map(c => c.id === id ? updated : c));
  };

  const handleCommentDelete = async (id) => {
    const success = await deleteComment(id);
    if (success) setComments(comments.filter(c => c.id !== id));
  };

  return (
    <div className="comments-list">
      {/* <AddComment 
        body={newCommentBody} 
        setBody={setNewCommentBody} 
        onAdd={handleCommentAdd} 
      /> */}
      <GeneralAdd
        value={newCommentBody}
        setValue={setNewCommentBody}
        onAdd={handleCommentAdd}
        placeholder="Add a comment..."
        buttonText="Add Comment"
        isTextArea={true} // כי תגובה היא בדרך כלל ארוכה
      />
      {comments.map(comment => (
        <Comment
          key={comment.id}
          comment={comment}
          onUpdate={handleCommentUpdate}
          onDelete={handleCommentDelete}
        />
      ))}
    </div>
  );
}

export default MyComment;