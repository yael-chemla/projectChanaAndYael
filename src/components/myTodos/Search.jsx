import { useState } from "react";

function Search({ todos, onFilter }) {
  const [query, setQuery] = useState("");

  /* ===== חלק 1: סינון לפי מצב ביצוע ===== */

  const showCompleted = () => {
    const filtered = todos.filter(t => t.completed === true);
    onFilter(filtered);
  };

  const showNotCompleted = () => {
    const filtered = todos.filter(t => t.completed === false);
    onFilter(filtered);
  };

  const showAll = () => {
    onFilter(todos);
  };

  /* ===== חלק 2: חיפוש לפי ID / TITLE ===== */

  const searchById = () => {
    const q = query.trim();
    if (!q) return;

    const filtered = todos.filter(t => t.id.toString() === q);
    onFilter(filtered);
  };

  const searchByTitle = () => {
    const q = query.trim().toLowerCase();
    if (!q) return;

    const filtered = todos.filter(t =>
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
        <button onClick={showCompleted}>בוצעו</button>
        <button onClick={showNotCompleted} style={{ marginLeft: "5px" }}>
          לא בוצעו
        </button>
        <button onClick={showAll} style={{ marginLeft: "5px" }}>
          הכל
        </button>
      </div>

      
    </div>
  );
}

export default Search;
