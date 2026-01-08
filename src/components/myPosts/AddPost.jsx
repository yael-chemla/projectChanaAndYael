import { useContext } from "react";
import { MyContext } from "../../context/context";

function AddPost({ newTitle, setNewTitle, newBody, setNewBody, handleAddPost }) {
  const { currentUser } = useContext(MyContext);

  if (!currentUser) return null;

  return (
    <div className="posts-container">
      <div className="add-post">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Post title"
        />

        <textarea
          value={newBody}
          onChange={(e) => setNewBody(e.target.value)}
          placeholder="Post body"
        />

        <button onClick={handleAddPost}>Add Post</button>
      </div>
    </div>
  );
}

export default AddPost;
