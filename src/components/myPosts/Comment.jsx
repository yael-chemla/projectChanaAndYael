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
                    <div className="comment-actions">
                        <button onClick={handleSave}>Save</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </>
            ) : (
                <>
                    <p>{comment.body}</p>
                    {isOwner && (
                        <div className="comment-actions">
                            <button className="edit-icon" onClick={() => setIsEditing(true)}></button>
                            <button className="delete-icon" onClick={() => onDelete(comment.id)}></button>
                        </div>
                    )}
                </>
            )}
        </div>

    );
}

export default Comment;
