import { useEffect, useState } from 'react';
import { getPosts } from "../API/postsApi";
function Posts() {
  const [posts, setPosts] = useState([]);

  // שימוש ב-`useEffect` כדי לשלוף את הנתונים כשהרכיב נטען
  useEffect(() => {
    getPosts().then(data => setPosts(data));
  }, []);

  return (
    <div>
      <h2>Posts from API</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
