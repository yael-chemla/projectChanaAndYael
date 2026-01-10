import { useState, useEffect, useContext } from "react";
import { MyContext } from "../../../context/context";
import MyComment from "./MyComment";
import { getCommentsByPost, addComment, updateComment, deleteComment } from "../../../API/commentApi";
import GeneralAdd from "../../GeneralAdd"

function Comments({ postId }) {
  const { currentUser } = useContext(MyContext);
  const [comments, setComments] = useState([]);//כל התגובות
  const [newCommentBody, setNewCommentBody] = useState("");//גוף תגובה עבור תגובה חדשה

  useEffect(() => {
    // מביא את כל התגובות של הפוסט
    getCommentsByPost(postId).then(data => {
      // שומר את התגובות כמו שהן
      setComments(data);
    });
  }, [postId]); // רץ כשה־postId משתנה
  //הוספת תגובה
  const handleCommentAdd = async () => {
    if (!newCommentBody.trim()) return;
    const newComment = {
      postId,
      email: currentUser.email,
      body: newCommentBody
    };
    const saved = await addComment(newComment);
    if (saved) {
      setComments([...comments, saved]);
      setNewCommentBody("");
    }
  };
//עדכון תגובה
  const handleCommentUpdate = async (id, updatedFields) => {
    const updated = await updateComment(id, updatedFields);
    if (updated) setComments(comments.map(c => c.id === id ? updated : c));
  };
//מחיקת תגובה
  const handleCommentDelete = async (id) => {
    const success = await deleteComment(id);
    if (success) setComments(comments.filter(c => c.id !== id));
  };

  return (
    <div className="comments-list">
      <GeneralAdd
        value={newCommentBody}
        setValue={setNewCommentBody}
        onAdd={handleCommentAdd}
        placeholder="Add a comment..."
        buttonText="Add Comment"
        isTextArea={true}
      />
      {comments.map(comment => (
        <MyComment
          key={comment.id}
          comment={comment}
          onUpdate={handleCommentUpdate}
          onDelete={handleCommentDelete}
          commentEmail={comment.email}
        />
      ))}
    </div>
  );
}

export default Comments;