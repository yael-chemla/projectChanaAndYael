import { useContext, useEffect, useState } from "react";
import { MyContext } from "../context";
import { getPosts, deletePost, addPost, updatePost } from "../API/postsApi";
import MyPost from "./myPosts/MyPost";
import "../css/post.css";
import AddPost from "./myPosts/AddPost";
import SearchPost from "./myPosts/SearchPost"

function Posts() {
  const { currentUser } = useContext(MyContext);
  const [posts, setPosts] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [filteredTodos, setFilteredPosts] = useState([]);


  useEffect(() => {
    if (!currentUser) return;
    getPosts().then(data => {
      setPosts(data);
      setFilteredPosts(data);
    });
  }, [currentUser]);

  const handleDelete = async (id) => {
    await deletePost(id);

    const newPosts = posts.filter(t => t.id !== id);
    setPosts(newPosts);
    setFilteredPosts(newPosts);
  };

  const handleUpdate = async (id, updatedFields) => {
    const updatedPost = await updatePost(id, updatedFields);

    const newPosts = posts.map(p =>
      p.id === id ? updatedPost : p
    );

    setPosts(newPosts);
    setFilteredPosts(newPosts);
  };

  const handleAddPost = async () => {
    const newPost = await addPost({
      title: newTitle,
      body: newBody,
      userId: currentUser.id
    });

    setPosts([newPost, ...posts]);
    setFilteredPosts([newPost, ...posts]);

    setNewTitle("");
    setNewBody("");
  };

  return (
    <div className="posts-page">
      <div className="sidebar">
        <AddPost
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          newBody={newBody}
          setNewBody={setNewBody}
          handleAddPost={handleAddPost}
        />
        <SearchPost posts={posts} onFilter={setFilteredPosts} />
      </div>


      <div className="posts-content">
        {filteredTodos.map(post => (
          <MyPost
            key={post.id}
            post={post}
            isSelected={post.id === selectedPostId}
            onSelect={() => setSelectedPostId(post.id)}
            canEdit={Number(post.userId) === Number(currentUser.id)}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        ))}
      </div>

    </div>
  );
}

export default Posts;
