import { useState, useContext } from "react";
import { MyContext } from "../../../context/context";

function Comment({ comment, onUpdate, onDelete, commentEmail
}) {
    const { currentUser } = useContext(MyContext);
    const [newBody, setNewBody] = useState(comment.body);
    const [isEditing, setIsEditing] = useState(false);
    const [body, setBody] = useState("");
    const isOwner = comment.email === currentUser.email;

    const handleSave = () => {
        onUpdate(comment.id, { body: newBody });
        setIsEditing(false);
    };

    const handleAddComment = async () => {
        if (!body.trim()) return;

        const newComment = {
            postId,
            email: currentUser.email,
            body
        };

        const savedComment = await onAdd(newComment);

        if (savedComment) {
            onAdd(savedComment);
            setBody("");
        }
    };

    return (
        <div className="comment">
            <h6>{commentEmail}</h6>
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
