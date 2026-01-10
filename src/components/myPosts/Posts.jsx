import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../context/context";
import { getPosts, deletePost, addPost, updatePost } from "../../API/postsApi";
import MyPost from "./MyPost";
import "../../css/post.css";
import AddPost from "./AddPost";
import GeneralSearch from "../GeneralSearch";


function Posts() {
  const { currentUser } = useContext(MyContext);
  const [posts, setPosts] = useState([]);//מערך של כל הפוסטים
  const [newTitle, setNewTitle] = useState("");//כותרת הפוסט
  const [newBody, setNewBody] = useState("");//גוף הפוסט
  const [selectedPostId, setSelectedPostId] = useState(null);//הצגת הפוסט
  const [filteredPosts, setFilteredPosts] = useState([]);//הפוסטים שמוצגים על המסך

  useEffect(() => {
    if (!currentUser) return;
    getPosts().then(data => {
      setPosts(data);
      setFilteredPosts(data);
    });
  }, [currentUser]);
  //מחיקת פוסט
  const handleDeletePost = async (id) => {
    await deletePost(id);
    const newPosts = posts.filter(t => t.id !== id);
    setPosts(newPosts);
    setFilteredPosts(newPosts);
  };
  //עדכון פוסט
  const handleUpdatePost = async (id, updatedFields) => {
    const updatedPost = await updatePost(id, updatedFields);

    const newPosts = posts.map(p =>
      p.id === id ? updatedPost : p
    );

    setPosts(newPosts);
    setFilteredPosts(newPosts);
  };
  //הוספת פוסט
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
        <GeneralSearch items={posts} onFilter={setFilteredPosts} />
      </div>

      <div className="posts-content">
        {filteredPosts.map(post => (
          <MyPost
            key={post.id}
            post={post}
            isSelected={post.id === selectedPostId}
            onSelect={() => setSelectedPostId(post.id)}
            canEdit={Number(post.userId) === Number(currentUser.id)}
            handleDelete={handleDeletePost}
            handleUpdate={handleUpdatePost}
          />
        ))}
      </div>

    </div>
  );
}

export default Posts;
