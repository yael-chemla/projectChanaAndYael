import { useState } from "react";

function GeneralSearch({ items, onFilter }) {
  const [query, setQuery] = useState("");

  const showAll = () => {
    onFilter(items);
  };

  const searchById = () => {
    const q = query.trim();
    if (!q) return;

    const filtered = items.filter(t => t.id.toString() === q);
    onFilter(filtered);
  };

  const searchByTitle = () => {
    const q = query.trim().toLowerCase();
    if (!q) return;

    const filtered = items.filter(t =>
      t.title.toLowerCase().includes(q)
    );
    onFilter(filtered);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <div>
        <input
          type="text"
          placeholder="enter a value for search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={searchById}>search by ID </button>
        <button onClick={searchByTitle} style={{ marginLeft: "5px" }}>
         search by title
        </button>

      </div>
        <button onClick={showAll} style={{ marginLeft: "5px" }}>
          all 
        </button>
      </div>
      
  );
}

export default GeneralSearch;
