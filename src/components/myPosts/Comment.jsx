import { useState, useContext } from "react";
import { MyContext } from "../../context";

function Comment({ comment, onUpdate, onDelete }) {
  const { currentUser } = useContext(MyContext); // שולף את המשתמש הנוכחי מהקונטקסט
  const [isEditing, setIsEditing] = useState(false);
  const [newBody, setNewBody] = useState(comment.body);

  const handleSave = () => {
    onUpdate(comment.id, { body: newBody });
    setIsEditing(false);
  };

  // השוואת מייל כדי לדעת אם המשתמש הנוכחי הוא זה שכתב את התגובה
  const isOwner = comment.email === currentUser.email;

  return (
    <div className="comment">
      {isEditing ? (
        <>
          <textarea
            value={newBody}
            onChange={(e) => setNewBody(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <p>{comment.body}</p>
          {isOwner && (
            <>
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={() => onDelete(comment.id)}>Delete</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Comment;
