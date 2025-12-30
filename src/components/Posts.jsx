import { useContext, useEffect, useState } from "react";
import { MyContext } from "../context";
import { getPostsByUser } from "../API/postsApi";

function Posts() {
  const { currentUser } = useContext(MyContext);
  const [Posts, setPosts] = useState([]);


  useEffect(() => {
    if (!currentUser) return;

    getPostsByUser(currentUser.id).then(setPosts);
  }, [currentUser]);

  return (
    <div>
      <h2>{currentUser?.name}'s Posts</h2>
      <ul>
        {Posts.map(post => (
          <li key={post.id}>
            {post.title} {post.body}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
