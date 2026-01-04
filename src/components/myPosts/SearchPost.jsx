import { useState } from "react";

function SearchPost({ posts, onFilter }) {
  const [query, setQuery] = useState("");


  const showAll = () => {
    onFilter(posts);
  };

  /* ===== חלק 2: חיפוש לפי ID / TITLE ===== */

  const searchById = () => {
    const q = query.trim();
    if (!q) return;

    const filtered = posts.filter(t => t.id.toString() === q);
    onFilter(filtered);
  };

  const searchByTitle = () => {
    const q = query.trim().toLowerCase();
    if (!q) return;

    const filtered = posts.filter(t =>
      t.title.toLowerCase().includes(q)
    );
    onFilter(filtered);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <div>
        <input
          type="text"
          placeholder="הכנס ערך לחיפוש"
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={searchById}>חפש לפי ID</button>
        <button onClick={searchByTitle} style={{ marginLeft: "5px" }}>
          חפש לפי כותרת
        </button>

      </div>
      <br></br>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={showAll} style={{ marginLeft: "5px" }}>
          הכל
        </button>
      </div>

      
    </div>
  );
}

export default SearchPost;
