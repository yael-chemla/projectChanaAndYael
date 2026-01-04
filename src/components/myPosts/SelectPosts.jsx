import { useState } from "react";

function SelectPosts({ posts, onFilter }) {
  const [sortBy, setSortBy] = useState("id");

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSortBy(newSort);

    const sortedPosts = [...posts].sort((a, b) => {
      if (newSort === "title") {
        return a.title.localeCompare(b.title);
      }
      return a.id - b.id;
    });

    onFilter(sortedPosts); 
  };

  return (
    <label>
      מיין לפי:{" "}
      <select value={sortBy} onChange={handleSortChange}>
        <option value="id">ID</option>
        <option value="title">כותרת</option>
      </select>
    </label>
  );
}

export default SelectPosts;
